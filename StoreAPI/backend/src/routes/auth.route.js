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
  registerIpLimiter,
} from "../middlewares/rateLimit.middleware.js";

const router = Router();

router.post(
  "/register",
  registerIpLimiter,
  registerValidator,
  regsiterController,
);

router.post("/login", loginIpLimiter, loginValidator, loginController);

router.post("/refresh", refreshTokenController);

router.get("/me", authenticate, getMe);

router.post("/logout", authenticate, logoutController);

export default router;
