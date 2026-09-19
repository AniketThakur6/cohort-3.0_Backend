import express from "express";
import urlRouter from "../routes/urlShortner.route.js";

const app = express();

app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("server is working in url shortner");
// });

app.use("/api/url", urlRouter);

export default app;
