import express from "express";
import urlRouter from "../routes/urlShortner.route.js";
import { urlRedirectController } from "../controllers/url.controller.js";
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());

app.use(cookieParser())

// app.get("/", (req, res) => {
//   res.send("server is working in url shortner");
// });

app.use("/api/url", urlRouter);

app.get("/:code", urlRedirectController);

export default app;
