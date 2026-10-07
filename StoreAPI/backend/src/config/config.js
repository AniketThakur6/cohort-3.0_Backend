import dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  REFRESH_SECRET_TOKEN: process.env.REFRESH_SECRET_TOKEN,
  ACCESS_SECRET_TOKEN: process.env.ACCESS_SECRET_TOKEN,
  ACCESS_TOKEN_EXPIRY:process.env.ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
  IMAGEKIT_SECRET_KEY: process.env.IMAGEKIT_SECRET_KEY,
  FRONTEND_URL: process.env.FRONTEND_URL,
};

export default config;
