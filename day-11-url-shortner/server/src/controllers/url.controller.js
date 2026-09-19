import urlModel from "../models/url.model.js";
import generateCode from "./../utils/generateCode.utils.js";

export const createShortUrlController = async (req, res) => {
  const { url } = req.body;

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

  const shortCode = generateCode();

  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  const newUrl = await urlModel.create({
    originalUrl: url,
    shortCode,
    expiresAt,
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
  
  const url = await urlModel.find();

  return (
    res.status(200).
    json({
      message: "URLs fetched successfully",
      data: {
        url,
      },
    })
  );
};
