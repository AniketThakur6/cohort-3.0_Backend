import urlModel from "../models/url.model.js";
import generateCode from "./../utils/generateCode.utils.js";
import crypto from "crypto";

export const createShortUrlController = async (req, res) => {
  const { url } = req.body;

  let { anonymousUserId } = req.cookies;

  console.log(anonymousUserId);

  if (!url) {
    return res.status(400).json({
      error: "Please enter a URL",
    });
  }

  if (
    url.startsWith("http://") === false &&
    url.startsWith("https://") === false
  ) {
    return res.status(400).json({
      error: "Please enter a valid URL starting with http:// or https://",
    });
  }

  if (url.length > 2048) {
    return res.status(400).json({ error: "url is too long." });
  }

  // when user is new to our website
  if (!anonymousUserId) {
    anonymousUserId = crypto.randomUUID();
  }

  const preUrl = await urlModel.findOne({ originalUrl: url });

  const user = await urlModel.findOne({ anonymousUserId });

  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  // when user exist and give url which already have shortcode
  if (user && preUrl) {
    // if url and id belong to same user
    const isAlreadyhaveGivenUrl = await urlModel.findOne({
      anonymousUserId: user?.anonymousUserId,
      originalUrl: preUrl?.originalUrl,
    });

    // if url and id belong to different user so create new document with under exist user and iwth old shortcode
    if (!isAlreadyhaveGivenUrl) {
      const newUser = await urlModel.create({
        originalUrl: preUrl.originalUrl,
        shortCode: preUrl.shortCode,
        anonymousUserId: user.anonymousUserId,
        expiresAt,
      });
    }

    res.cookie("anonymousUserId", user.anonymousUserId, {
      httpOnly: true,
      sameSite: "lax",
    });

    return res.status(201).json({
      message: "URL shortend successfully",
      data: {
        originalUrl: preUrl.originalUrl,
        shortCode: preUrl.shortCode,
      },
    });
  }

  // when user not exist and give url which already have shortcode
  if (preUrl && !user) {
    const newUser = await urlModel.create({
      originalUrl: preUrl.originalUrl,
      shortCode: preUrl.shortCode,
      anonymousUserId,
      expiresAt,
    });

    res.cookie("anonymousUserId", newUser.anonymousUserId, {
      httpOnly: true,
      sameSite: "lax",
    });

    return res.status(201).json({
      message: "URL shortend successfully",
      data: {
        originalUrl: preUrl.originalUrl,
        shortCode: preUrl.shortCode,
      },
    });
  }

  let shortCode = generateCode();
  let isShortCodeAlreadyExist = await urlModel.findOne({ shortCode });

  // checking for shortcode already exists
  while (isShortCodeAlreadyExist) {
    shortCode = generateCode();
    isShortCodeAlreadyExist = await urlModel.findOne({ shortCode });
  }

  const newUrl = await urlModel.create({
    originalUrl: url,
    shortCode,
    anonymousUserId,
    expiresAt,
  });

  // when user not exist and give url dont have shortcode
  res.cookie("anonymousUserId", newUrl.anonymousUserId, {
    httpOnly: true,
    sameSite: "lax",
  });

  res.status(201).json({
    message: "URL shortend successfully",
    data: {
      originalUrl: newUrl.originalUrl,
      shortCode: newUrl.shortCode,
    },
  });
};

export const getAllShortUrl = async (req, res) => {
  
  const { anonymousUserId } = req.cookies;
  
  const url = await urlModel.find(
    {},
    { originalUrl: 1, shortCode: 1, clicks: 1 },
  );

  return res.status(200).json({
    message: "URLs fetched successfully",
    data: {
      url,
    },
  });
};

export const urlRedirectController = async (req, res) => {
  const { code } = req.params;

  const url = await urlModel.findOne({ shortCode: code });

  if (!url) {
    return res.status(404).json({
      error: "url not found",
    });
  }

  res.redirect(302, url.originalUrl);

  await urlModel.findByIdAndUpdate(url._id, {
    $inc: { clicks: 1 },
  });
};

export const deleteUrlcontroller = async (req, res) => {
  const { id } = req.params;

  const url = await urlModel.findById(id);

  if (!url) {
    return res.status(404).json({ error: "url not found" });
  }

  await urlModel.findByIdAndDelete(url._id);

  return res.status(200).json({
    message: "URL delete successfully",
  });
};
