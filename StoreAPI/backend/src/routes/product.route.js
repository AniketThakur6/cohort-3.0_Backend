import { Router } from "express";
import { authenticate } from "./../middlewares/auth.middleware.js";
import {
  createProduct,
  getAllProduct,
  getOneProduct,
} from "../controllers/product.controller.js";
import { productValidator } from "../validators/product.validator.js";
import { standardIpLimiter,productCreationLimiter } from "../middlewares/rateLimit.middleware.js";
import multer from "multer";

const router = Router();

const uploadProduct = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 5,
    fileSize: 20 * 1024 * 1024,
  },
});

router.post(
  "/",
  productCreationLimiter,
  authenticate,
  uploadProduct.array("images"),
  (req, res, next) => {
    ((req.body.price = JSON.parse(req.body.price)),
      (req.body.sizes = JSON.parse(req.body.sizes)));
    console.log(req.body);
    next();
  },
  productValidator,
  createProduct,
);

router.get("/",standardIpLimiter,getAllProduct);

router.get("/:id",standardIpLimiter,getOneProduct)

export default router;
