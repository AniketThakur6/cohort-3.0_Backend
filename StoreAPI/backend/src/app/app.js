import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "../routes/auth.route.js";
import productRouter from "../routes/product.route.js";
import config from "../config/config.js";
import cors from "cors";
import { registerIpLimiter } from "../middlewares/rateLimit.middleware.js";

const app = express();

app.use(
  cors({
    origin: config.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);

app.get("/", registerIpLimiter, (req, res) => {
  res.send("working");
});

export default app;
