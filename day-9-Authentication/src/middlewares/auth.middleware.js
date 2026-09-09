import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const authentication = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "token is not present",
    });
  }

  const data = jwt.verify(token, process.env.JWT_SECRET);

  const { name, email } = await userModel.findById(data.id);

  req.user = { name, email };

  next();
};

export default authentication;
