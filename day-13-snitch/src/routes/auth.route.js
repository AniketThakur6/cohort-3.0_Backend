import { Router } from "express";
import { registerUserController, loginUserController, refreshTokenController, getMe } from "../controllers/auth.controller.js";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/register',registerValidator, registerUserController);

router.post("/login",loginValidator,loginUserController);

router.post('/refresh',refreshTokenController);

router.get('/me',authenticate,getMe)

export default router;
