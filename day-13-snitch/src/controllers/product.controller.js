import { uploadFile } from "../services/storage.service.js";
import productModel from "./../models/products.model.js";

export async function createProduct(req, res) {
  /**
   * file upload code
   *
   */
  const response = await uploadFile(req.files);
  const filesUrls = response.map((file) => file.url);

  const { title, description, price, sizes } = req.body;

  const product = await productModel.create({
    title,
    description,
    images: filesUrls,
    price,
    sizes,
    seller: req.user.userId,
  });

  console.log(response);
  console.log(filesUrls);

  res.status(201).json({
    message: "product created successfully",
    data: {
      product,
    },
  });
}

export async function listAllProducts(req, res) {
  const products = await productModel.find({ published: true });

  return res.status(200).json({
    message: "all products is fetched successfully",
    data: {
      products,
    },
  });
}

export async function listAllProductsToSeller(req, res) {
  const products = await productModel.find();

  return res.status(200).json({
    message: "all products is fetched successfully",
    data: {
      products,
    },
  });
}

export async function unlistProduct(req, res) {
  const { id } = req.params;

  const product = await productModel.findById(id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  await productModel.findByIdAndUpdate(id, {
    published: false,
  });

  res.status(200).json({
    message: "Product  unlisted successfully",
  });
}

export async function listProduct(req, res) {
  const { id } = req.params;

  const product = await productModel.findById(id);

  if (!product) {
    return res.status(404).json({
      message: "Product is not found",
    });
  }

  await productModel.findByIdAndUpdate(id, {
    published: true,
  });

  res.status(200).json({
    message: "Product is listed successfully",
  });
}
