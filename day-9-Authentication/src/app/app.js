import express from "express";
import jwt from "jsonwebtoken";
import userModel from "./../models/user.model.js";
import bcrypt from "bcryptjs";
import authentication from "../middlewares/auth.middleware.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "working server",
  });
});

app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;

  const user = await userModel.create({
    name,
    email,
    password: await bcrypt.hash(password,10),
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.status(201).json({
    message: "user is created",
    data: {
      name,
      email,
    },
    token,
  });
});

app.get("/api/auth/me", authentication, async (req, res) => {
  const user = req.user;

  res.status(200).json({
    message: "succes",
    data: {
      user,
    },
  });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  const isValidPassword = bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({
      message: "invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  return res.status(200).json({
    message: "user logged in success",
    data: {
      name: user.name,
      email: user.email,
    },
    token
  });
});

export default app;
