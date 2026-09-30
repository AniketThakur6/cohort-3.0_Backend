import productModel from "./../models/products.model.js";
import cartModel from './../models/cart.model.js';

export const addToCart = async (req, res) => {
  const { productId, quantity, size } = req.body;

  const product = await productModel.findById(productId);

  if(!product){
    return res.status(404).json({
      message: "products not found" 
    })
  }

  const selectedSize = product.sizes.find(p => p.size === size)

  if(!selectedSize){
    return  res.status(400).json({
      message: "Invalid size"
    })
  }

  if(selectedSize.stock < quantity){
    return res.status(400).json({
      message: "insufficient stock"
    })
  }

  const cart = (await cartModel.findOne({user: req.user.userId})) ?? await cartModel.create({user: req.user.userId})

  const presentInCart = cart.find(p => (p.products.product.toString() === productId) && (p.size === size ))

  if(presentInCart){

    if((presentInCart.quantity + quantity) > selectedSize.stock){
      return res.status(400).json({
        message: "Insufficient Stock"
      })
    }

    await cartModel.UpdateOne(
      {
        user: req.user.userId,
        "products.prodcut": productId,
        "products.size": size,
      },
      {
        $inc:{
          "products.$.quantity": quantity,
        }
      }
    )
  }

  await cartModel.findOneAndUpdate(
    {
      user: req.user.userId
    },
    {
      $push:{
        products:{
          product: productId,
          quantity,
          size,
        } 
      }
    }
  )

  return res.status(201).json({
    message: "product is added to cart"
  })
};
