import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  products: [
    {
      products: {
        type: mongoose.Types.ObjectId,
        refs: "prodcuts",
        required: true,
      },
      quantity: {
        type: Number,
        min: 1,
        default: 1,
      },
      size: {
        type: String,
        enum: ["XS", "S", "M", "L", "XL", "XXL"],
      },
    },
  ],
  user: {
    type: mongoose.Types.ObjectId,
    refs: "users",
    required: true,
  },
});

const cartModel = mongoose.model("carts", cartSchema);

export default cartModel;
