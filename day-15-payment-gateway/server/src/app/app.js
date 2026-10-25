import express from "express";
import paymentRouter from "../routes/payment.route.js"
import morgan from 'morgan'

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Working",
  });
});

app.use("/api/payment",paymentRouter)

export default app;
