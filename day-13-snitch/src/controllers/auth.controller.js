import { generateToken, verifyRefreshToken } from "../utils/auth.utils.js";
import userModel from "./../models/user.model.js";
import bcrypt from "bcryptjs";

export const registerUserController = async (req, res) => {
  const { email, name, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "User Already exists with this email address",
      errors: [
        {
          field: email,
          message: "User Already exists with this email address",
        },
      ],
    });
  }

  const user = await userModel.create({
    email,
    name,
    passwordHash: await bcrypt.hash(password, 12),
  });

  const { accessToken, refreshToken } = generateToken({
    userId: user._id,
    role: user.role,
  });

  await userModel.findOneAndUpdate({ _id: user._id }, { refreshToken });

  res.cookie("refreshToken", refreshToken, { httpOnly: true });

  res.status(201).json({
    message: "user created successfully",
    data: {
      user: {
        email: user.email,
        name: user.name,
        id: user._id,
      },
      accessToken,
    },
  });
};

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const { accessToken, refreshToken } = generateToken({
    userId: user._id,
    role: user.role,
  });

  await userModel.findByIdAndUpdate(user._id, { refreshToken });

  res.cookie("refreshToken", refreshToken, { httpOnly: true });

  res.status(200).json({
    message: "user logged in successfully",
    data: {
      user: {
        email: user.email,
        name: user.name,
        id: user._id,
      },
      accessToken,
    },
  });
};

export const refreshTokenController = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({
      message: "refresh Token is required",
    });
  }

  try {
    const { userId } = verifyRefreshToken(refreshToken);

    const user = await userModel.findById(userId);

    if (refreshToken !== user.refreshToken) {
      await userModel.findByIdAndUpdate(user._id, { refreshToken: null });

      return res.status(401).json({
        message: "refresh Token mismatch",
      });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateToken({
      userId: user._id,
      role: user.role,
    });

    await userModel.findByIdAndUpdate(user._id, {
      refreshToken: newRefreshToken,
    });

    res.cookie("refreshToken", newRefreshToken, { httpOnly: true });

    res.status(200).json({
      message: "refresh Token is rotate successfully",
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
        accessToken,
      },
    });
  } catch (error) {
    return res.status(401).json({
      message: "Invlaid refresh Token",
    });
  }
};

export const getMe = async (req,res) => {
  const { userId } = req.user;

  const user = await userModel.findById(userId);

  res.status(200).json({
    message: "user data fetch successfully",
    data:{
      user:{
        id: user._id,
        email: user.email,
        name: user.name,
      }
    }
  })

} 