import { Router } from "express";
import { authenticate } from "./../middlewares/auth.middleware.js";
import {
  createProduct,
  deteteProduct,
  getAllProduct,
  getOneProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import {
  productPramId,
  productValidator,
  updateValidator,
} from "../validators/product.validator.js";
import {
  standardIpLimiter,
  productCreationLimiter,
  productUpdateLimiter,
  productDeleteLimiter,
} from "../middlewares/rateLimit.middleware.js";
import multer from "multer";

const router = Router();

const uploadProduct = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 5,
    fileSize: 20 * 1024 * 1024,
  },
});

// product creation
router.post(
  "/",
  productCreationLimiter,
  authenticate,
  uploadProduct.array("images"),
  (req, res, next) => {
    try {
      req.body.price = JSON.parse(req.body.price);
      req.body.sizes = JSON.parse(req.body.sizes);

      next();
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid JSON in price or sizes",
      });
    }
  },
  productValidator,
  createProduct,
);

// get all product
router.get("/", standardIpLimiter, getAllProduct);

// get one product
router.get("/:id", standardIpLimiter, productPramId, getOneProduct);

// update one product
router.put(
  "/:id",
  productUpdateLimiter,
  authenticate,
  uploadProduct.array("images"),
  (req, res, next) => {
    try {
      req.body.price = JSON.parse(req.body.price);
      req.body.sizes = JSON.parse(req.body.sizes);

      next();
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid JSON in price or sizes",
      });
    }
  },
  productPramId,
  updateValidator,
  updateProduct,
);

// delete one product
router.delete(
  "/:id",
  productDeleteLimiter,
  authenticate,
  productPramId,
  deteteProduct,
);

export default router;
