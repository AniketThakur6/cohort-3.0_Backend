import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "../routes/auth.route.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "user registered successfully",
//     data: {
//       email: user.email,
//       phone: user.phone,
//       id: user._id,
//     },
//   });
// });

export default app;
