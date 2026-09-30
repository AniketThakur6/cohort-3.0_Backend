import { body, validationResult } from 'express-validator';

export const cartValidator = [
  body("productId")
    .exists().withMessage("Product ID is required").bail()
    .isString().withMessage("product id must be string").bail()
    .isMongoId().withMessage("Product ID must be a valid Mongo ID"),
  body("quantity")
    .exists().withMessage("quantity is required").bail()
    .isInt({min:1}).withMessage("quantity must be 1 or greater"),
  body("size")
    .exists().withMessage("size is required").bail()
    .isString().withMessage("size must be string").bail()
    .isIn(["XS","S","M","L","XL","XXL"]).withMessage("Size must be one of XS, S, M, L, XL, XXL"),
  (req,res,next)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
      return res.status(400).json({
        message:"Invalid Request",
      })
    }

    next();

  }      

]
