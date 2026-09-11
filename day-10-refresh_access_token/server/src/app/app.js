import express from "express";
import config from "../config/config.js";
import authRouter from "../routers/auth.route.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "server is working",
  });
});

app.use("/api/auth", authRouter);

export default app;
