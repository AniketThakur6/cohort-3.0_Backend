import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minLength: 10,
      maxLength: 100,
      required: true,
    },
    description: {
      type: String,
      minLength: 20,
      maxLength: 500,
      required: true,
    },
    category: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 50,
    },
    price: {
      amount: {
        type: Number,
        min: 0,
        required: 0,
      },
      currency: {
        type: String,
        enum: ["INR", "USD"],
        default: "INR",
      },
    },
    images: {
      type: [
        {
          url: {
            type: String,
            required: true,
          },
          fileId: {
            type: String,
            required: true,
          },
        },
      ],
      validate: {
        validator: (images) => images.length <= 5,
        message: "A product can have at most 5 images",
      },
    },
    sizes: [
      {
        size: {
          type: String,
          enum: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
        },
        stock: {
          type: Number,
          min: 0,
          default: 0,
        },
      },
    ],
    seller: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const productModel = mongoose.model("products", productSchema);

export default productModel;
