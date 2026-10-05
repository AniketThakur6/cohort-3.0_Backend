import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken, verifyRefreshToken } from "./../utils/auth.utils.js";
import crypto from "crypto";

export const regsiterController = async (req, res) => {
  const { email, name, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({ email });

  if (isUserAlreadyExist) {
    return res.status(409).json({
      message: "Registration failed",
      errors: [
        {
          path: "email",
          message: "User exisit with this Email",
        },
      ],
    });
  }

  const user = await userModel.create({
    email,
    name,
    passwordHash: await bcrypt.hash(password, 12),
  });

  res.status(201).json({
    message: "Registration successfull",
    data: {
      user: {
        userId: user._id,
        email: user.email,
        name: user.name,
      },
    },
  });
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  const isUserExist = await userModel.findOne({ email });

  if (!isUserExist) {
    return res.status(401).json({
      message: "Invalid Email or Password",
    });
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    isUserExist.passwordHash,
  );

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Inavlid Email or Password",
    });
  }

  const { accessToken, refreshToken } = generateToken(isUserExist._id);

  const user = await userModel.findByIdAndUpdate(
    isUserExist._id,
    {
      refreshTokenHash: crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex"),
    },
    { returnDocument: "after" },
  );

  res.cookie("refreshToken", refreshToken, { httpOnly: true });

  res.status(200).json({
    message: "login successful",
    data: {
      user: {
        userId: user._id,
        email: user.email,
        name: user.name,
      },
      accessToken,
    },
  });
};

export const refreshTokenController = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Unauthorised",
      errors: [
        {
          path: "refreshToken",
          message: "Refresh token is not present",
        },
      ],
    });
  }

  let decoded;

  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
      errors: [
        {
          path: "refreshToken",
          message: "Invalid or expired access token",
        },
      ],
    });
  }

  const user = await userModel.findById(decoded.userId);

  const tokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  if (tokenHash !== user.refreshTokenHash) {
    await userModel.updateOne({ _id: user._id }, { refreshTokenHash: null });

    return res.status(401).json({
      message: "Unauthorised",
      errors: [
        {
          path: "refreshToken",
          message: "Refresh token is Invalid",
        },
      ],
    });
  }

  const { accessToken, refreshToken: newRefreshToken } = generateToken(
    user._id,
  );

  await userModel.updateOne(
    { _id: user._id },
    {
      refreshTokenHash: crypto
        .createHash("sha256")
        .update(newRefreshToken)
        .digest("hex"),
    },
  );

  res.cookie("refreshToken", newRefreshToken, { httpOnly: true });

  res.status(200).json({
    message: "token rotated successsfully",
    data: {
      accessToken,
    },
  });
};

export const getMe = async (req, res) => {
  const user = await userModel.findById(req.userId, { email: 1, name: 1 });

  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  return res.status(200).json({
    message: "successfully fetched user",
    data: {
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
      },
    },
  });
};

export const logoutController = async (req, res) => {
  const user = await userModel.findById(req.userId);

  if (!user) {
    res.clearCookie("refreshToken", { httpOnly: true });

    return res.status(404).json({
      message: "User not found",
    });
  }

  await userModel.updateOne(
    { _id: user._id },
    {
      refreshTokenHash: null,
    },
  );

  res.clearCookie("refreshToken", { httpOnly: true });
  return res.status(200).json({
    message: "user logged out successfully",
  });
};
