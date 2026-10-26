import productModel from "../models/product.model.js";
import razorpayInstance from "./../config/razorpay.js";
import paymentModel from "../models/payment.model.js";
import config from "../config/config.js";
import crypto from "crypto";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";

export const createProduct = async (req, res) => {
  const { price, currency, name } = req.body;

  const product = await productModel.create({
    name,
    price,
    currency: currency.toUpperCase(),
  });

  const plainProduct = product.toObject();

  res.json({
    message: "product created successfully",
    product: {
      ...plainProduct,
      createdAt: undefined,
      updatedAt: undefined,
      __v: undefined,
    },
  });
};

export const getProduct = async (req, res) => {
  const products = await productModel.find();

  res.status(200).json({
    message: "successfully",
    products,
  });
};

export const createOrder = async (req, res) => {
  const userId = "6782d09c0001000000000000";

  const product = await productModel.findById(req.params.productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  const order = await razorpayInstance.orders.create({
    amount: Math.round(product.price * 100),
    currency: product.currency,
    receipt: `rcpt_${Date.now()}`,
    notes: { productId: String(product._id) },
  });

  const payment = await paymentModel.create({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    product: product._id,
    user: userId,
    status: "pending",
  });

  res.status(201).json({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    keyId: razorpayInstance.key_id,
    name: product.name,
  });
};

export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  console.log(razorpay_signature);

  const expectedSignature = crypto
    .createHmac("sha256", config.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  console.log(expectedSignature);

  const isValid = validatePaymentVerification(
    {
      razorpay_order_id,
      razorpay_payment_id,
    },
    razorpay_signature,
    config.RAZORPAY_KEY_ID,
  );
 

  if (expectedSignature !== razorpay_signature) {
    res.status(400).json({
      status: "failed",
      message: "Invalid signature",
    });
  }

  const payment = await paymentModel.findOneAndUpdate(
    { orderId: razorpay_order_id },
    { paymentId: razorpay_payment_id, signature: razorpay_signature, status: "completed" },
    { returnDocument: "after" },
  );

  res.status(200).json({
    status: "success",
    orderId: payment.orderId,
  });
};
