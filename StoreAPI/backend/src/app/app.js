import express from "express";
import cookieParser from "cookie-parser";
import authRouter from '../routes/auth.route.js'

const app = express();

app.use(express.json());
app.use(cookieParser());

//routes
app.use('/api/auth',authRouter);


app.get("/", (req, res) => {
  res.send("working");
});

export default app;
