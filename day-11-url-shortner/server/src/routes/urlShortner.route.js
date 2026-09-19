import { Router } from "express";
import {
  createShortUrlController,
  getAllShortUrl,
} from "../controllers/url.controller.js";

const router = Router();

router.post("/", createShortUrlController);

router.get("/", getAllShortUrl);

export default router;
