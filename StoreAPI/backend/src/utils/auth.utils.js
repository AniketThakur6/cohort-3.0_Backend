import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const generateToken = (userId) => {
  const refreshToken = jwt.sign({ userId }, config.REFRESH_SECRET_TOKEN, {
    expiresIn: "7d",
  });

  const accessToken = jwt.sign({ userId }, config.ACCESS_SECRET_TOKEN, {
    expiresIn: "2d",
  });

  return { refreshToken, accessToken };
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, config.REFRESH_SECRET_TOKEN);
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, config.ACCESS_SECRET_TOKEN);
};
