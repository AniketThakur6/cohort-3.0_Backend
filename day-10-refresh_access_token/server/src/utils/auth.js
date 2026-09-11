import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const generateToken = ({ userId }) => {
  const accessToken = jwt.sign({ id: userId }, config.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ id: userId }, config.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

export function verifyAccessToken(accessToken) {
  const decoded = jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET);
  return decoded;
}

export function verifyRefreshToken(refreshToken) {
  const decoded = jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET);
  return decoded;
}
