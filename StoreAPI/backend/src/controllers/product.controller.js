import productModel from "../models/product.model.js";
import uploadFile from "../services/storage.service.js";

export const createProduct = async (req, res) => {
  const response = await uploadFile(req.files);

  const imagesURL = response.map((file) => file.url);

  const { title, description, category, price, sizes } = req.body;

  const product = await productModel.create({
    title,
    description,
    category,
    images: imagesURL,
    price,
    sizes,
    seller: req.userId,
  });

  return res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: {
      product,
    },
  });
};

export const getAllProduct = async (req, res) => {
  const products = await productModel.find().populate("seller", "name");

  res.status(200).json({
    success: true,
    message: "Product fectched successfully",
    data: {
      products,
    },
  });
};

export const getOneProduct = async (req, res) => {
  const { id } = req.params;

  const product = await productModel.findById(id).populate("seller","name")

  res.status(200).json({
    success:true,
    message:"product fetched successfully",
    data:{
      product
    }
  })
};
