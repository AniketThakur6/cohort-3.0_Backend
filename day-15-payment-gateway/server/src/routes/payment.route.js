import { Router } from "express";
import { createOrder,createProduct,verifyPayment } from "../controllers/payment.controller.js";
const router = Router();

// order in routes if /:productId appear first then it call the this router in place of /create-product

router.post("/create-product", createProduct);

router.post("/verify", verifyPayment);
router.post("/create/order/:productId", createOrder);


export default router;
