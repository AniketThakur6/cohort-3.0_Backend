import { Router } from "express";
import {
  getMe,
  loginController,
  refreshTokenController,
  regsiterController,
  logoutController,
} from "../controllers/auth.controller.js";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator.js";
import { authenticate } from "./../middlewares/auth.middleware.js";
import {
  loginIpLimiter,
  logoutIpLimiter,
  registerIpLimiter,
  standardIpLimiter,
} from "../middlewares/rateLimit.middleware.js";

const router = Router();

router.post(
  "/register",
  registerIpLimiter,
  registerValidator,
  regsiterController,
);

router.post("/login", loginIpLimiter, loginValidator, loginController);

router.post("/refresh-token", standardIpLimiter, refreshTokenController);

router.get("/me", standardIpLimiter, authenticate, getMe);

router.post("/logout", logoutIpLimiter, authenticate, logoutController);

export default router;
