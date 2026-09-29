import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const generateToken = ({ userId, role }) => {
  const accessToken = jwt.sign({ userId, role }, config.ACCESS_SECRET_TOKEN, {
    expiresIn: "1d",
  });

  const refreshToken = jwt.sign({ userId, role }, config.REFRESH_SECRET_TOKEN, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

export const verifyAccessToken = (accessToken) => {
  return jwt.verify(accessToken, config.ACCESS_SECRET_TOKEN);
};

export const verifyRefreshToken = (refreshToken) => {
  return jwt.verify(refreshToken, config.REFRESH_SECRET_TOKEN);
};
