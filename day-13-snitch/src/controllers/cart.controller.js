import productModel from "./../models/products.model.js";
import cartModel from "./../models/cart.model.js";

export const addToCart = async (req, res) => {
  const { productId, size, quantity } = req.body;

  const product = await productModel.findById(productId);

  if (!product) {
    return res.status(404).json({
      message: "products is not found",
    });
  }

  const selectedSize = product.sizes.find((s) => s.size === size);

  if (!selectedSize) {
    return res.status(400).json({
      message: "Invalid size",
    });
  }

  if (selectedSize.stock < quantity) {
    return res.status(400).json({
      message: "Insufficient stock",
    });
  }

  const cart =
    (await cartModel.findOne({ user: req.user.userId })) ??
    (await cartModel.create({ user: req.user.userId }));

  const presentInCart = cart.products.find(
    (p) => p.product.toString() === productId && p.size === size,
  );

  if (presentInCart) {
    if (presentInCart.quantity + quantity > selectedSize.stock) {
      return res.status(400).json({
        message: "Insufficient stock",
      });
    }

    await cartModel.updateOne(
      {
        user: req.user.userId,
        products: {
          $elemMatch: {
            product: productId,
            size: size,
          },
        },
      },
      {
        $inc: {
          "products.$.quantity": quantity, //products[0].quantity
        },
      },
    );

    return res.status(200).json({
      message: "Product quantity updated in cart",
    });
  }

  await cartModel.findOneAndUpdate(
    {
      user: req.user.userId,
    },
    {
      $push: {
        products: {
          product: productId,
          size,
          quantity,
        },
      },
    },
  );

  res.status(200).json({
    message: "products is added to cart",
  });
};

export const getCart = async (req, res) => {
  const cart =
    (await cartModel.findOne({user:req.user.userId})) ??
    (await cartModel.create({ user: req.user.userId }));

  res.status(200).json({
    message: "Cart retrieved successfully",
    data: {
      cart: cart,
    },
  });
};
