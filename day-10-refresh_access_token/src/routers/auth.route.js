import express from "express";
import userModel from "./../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken, verifyRefreshToken } from "../utils/auth.js";
import authentication from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserExists = await userModel.findOne({ email });

  if (isUserExists) {
    return res.status(400).json({
      message: "user already exists",
      errors: [
        {
          path: email,
          message: "user already exists",
        },
      ],
    });
  }

  const user = await userModel.create({
    name,
    email,
    passwordHash: await bcrypt.hash(password, 12),
  });

  const { accessToken, refreshToken } = generateToken({ userId: user._id });

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("refreshToken", refreshToken, { httpOnly: true });

  return res.status(201).json({
    message: "user is created successfully",
    data: {
      user: {
        name: user.name,
        email: user.email,
      },
    },
    accessToken,
  });
});

router.get("/me", authentication, async (req, res) => {
  return res.status(200).json({
    message: "user fetched successfully",
    data: {
      user: {
        name: req.user.name,
        email: req.user.email,
      },
    },
  });
});

router.post("/refresh", async (req, res) => {
  
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Unauthorized, refresh token not found",
    });
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);

    const user = await userModel.findById(decoded.id);

    if (refreshToken !== user.refreshToken) {
      user.refreshToken = null;
      await user.save();

      return res.status(401).json({
        message: "Unauthorized, refresh token mismatch",
      });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateToken({
      userId: user._id,
    });

    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie("refreshToken", newRefreshToken, { httpOnly: true });

    res.status(201).json({
      message: "Tokens refreshed successfully",
      accessToken,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized, Invalid or expired refresh token",
    });
  }
});

export default router;
