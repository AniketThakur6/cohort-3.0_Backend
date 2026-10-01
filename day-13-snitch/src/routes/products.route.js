import { Router } from "express";
import { authenticate, authSeller } from "./../middlewares/auth.middleware.js";
import {
  createProduct,
  listAllProducts,
  listAllProductsToSeller,
  unlistProduct,
  listProduct,
} from "../controllers/product.controller.js";
import {
  productValidator,
  listProductValidator,
  unlistProductValidator,
} from "../validators/product.validator.js";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 5,
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

const router = Router();

router.post(
  "/",
  authenticate,
  authSeller,
  upload.array("images"),
  (req, res, next) => {
    req.body?.price && (req.body.price = JSON.parse(req.body.price));
    req.body?.sizes && (req.body.sizes = JSON.parse(req.body.sizes));
    next();
  },
  productValidator,
  createProduct,
);

router.get("/", authenticate, listAllProducts);

router.get("/seller", authenticate, authSeller, listAllProductsToSeller);

router.patch(
  "/unlist/:id",
  authenticate,
  authSeller,
  unlistProductValidator,
  unlistProduct,
);

router.patch(
  "/list/:id",
  authenticate,
  authSeller,
  listProductValidator,
  listProduct,
);

export default router;
