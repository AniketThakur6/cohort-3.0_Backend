import jwt from "jsonwebtoken";
import { verifyAccessToken } from "../utils/auth.utils.js";

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
      errors: [
        {
          path: "authorization",
          message: "Access token is not present",
        },
      ],
    });
  }

  try {
    const decoded = verifyAccessToken(token);

    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired access token",
      error: [
        {
          path: "authorization",
          message: "Invalid or expired access token",
        },
      ],
    });
  }
};
