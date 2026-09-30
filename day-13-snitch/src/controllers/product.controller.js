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

export async function listAllProducts(req,res){
  const products = await productModel.find();

  return res.status(200).json({
    message:"all products is fetched successfully",
    data:{
      products
    }
  })
}