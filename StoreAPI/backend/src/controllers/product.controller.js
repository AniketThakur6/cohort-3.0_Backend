import productModel from "../models/product.model.js";
import uploadFile, { deleteUploadedFile } from "../services/storage.service.js";

export const createProduct = async (req, res) => {
  if (!req.files || req.files.length < 1) {
    return res.status(400).json({
      success: false,
      message: "At least one image is needed",
    });
  }

  const response = await uploadFile(req.files);

  const imagesURL = response.map((file) => ({
    url: file.url,
    fileId: file.fileId,
  }));

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

  const product = await productModel.findById(id).populate("seller", "name");

  if (!product) {
    return res.status(404).json({
      message: "missing product",
      errors: [
        {
          field: "product id",
          message: "product is not found",
        },
      ],
    });
  }

  res.status(200).json({
    success: true,
    message: "product fetched successfully",
    data: {
      product,
    },
  });
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;

  const updateProduct = req.body;

  const product = await productModel.findById(id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
      errors: [
        {
          field: "product id",
          message: "product dont exists",
        },
      ],
    });
  }

  if (req.files.length > 0) {
    let imagesURL = [];
    try {
      await deleteUploadedFile(product.images);

      const response = await uploadFile(req.files);

      imagesURL = response.map((file) => ({
        url: file.url,
        fileId: file.fileId,
      }));
    } catch (error) {
      return res.status(404).json({
        message: "image fileId not found",
        errors: [
          {
            field: "image fileId",
            message: "image fileId dont exists",
          },
        ],
      });
    }

    const newProduct = await productModel.findByIdAndUpdate(
      product._id,
      {
        ...updateProduct,
        images: imagesURL,
      },
      {
        returnDocument: "after",
      },
    );

    return res.status(200).json({
      message: "updated successfully",
      product: newProduct,
    });
  }

  const newProduct = await productModel.findByIdAndUpdate(
    product._id,
    { ...updateProduct },
    { returnDocument: "after" },
  );

  res.status(200).json({
    message: "updated successfully",
    product: newProduct,
  });
};

export const deteteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await productModel.findById(id);

  if (!product) {
    return res.status(404).json({
      message: "product not found",
      errors: [
        {
          field: "product id",
          message: "product dont exists",
        },
      ],
    });
  }

  let imageDeleteStatus;

  try {
    await deleteUploadedFile(product.images);

    imageDeleteStatus = {
      success: true,
      message: "images deleted successfully",
    };
  } catch (error) {
    imageDeleteStatus = {
      success: false,
      message: "Some images could not be deleted",
      errors: [
        {
          field: "image fileid",
          message: "image fileid dont exists",
        },
      ],
    };
  }

  const deletedProduct = await productModel.findByIdAndDelete(product._id);

  return res.status(200).json({
    success: true,
    message: "product is delete successfully",
    imageDeletion: imageDeleteStatus,
  });
};
