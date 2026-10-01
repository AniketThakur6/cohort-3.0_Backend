import { body, param , validationResult } from 'express-validator'

export const productValidator = [
  body('title')
    .exists().withMessage("title is required").bail()
    .isString().withMessage("title must be string").bail()
    .trim()
    .isLength({min:2,max:100}).withMessage("title must be between 2 to 100 characters").bail()
    .isAlpha("en-US",{ignore: " -"}).withMessage("only content letter,space and hyphen"),
  body('description')
    .exists().withMessage("description is required").bail()
    .isString().withMessage("description must be String").bail()
    .trim()
    .isLength({min:20,max:500}).withMessage("description length must be between 20 to 500 characters").bail(),  body("price.amount"),
  body("price.amount")  
    .exists().withMessage("price amount is required").bail()
    .trim()
    .isFloat({min:0}).withMessage("price must be floating point number and greater than 0"),
  body("price.currency")
    .exists().withMessage("price currency is required").bail()
    .isString().withMessage("price currency must be string").bail()
    .isIn(["INR","USD"]).withMessage("currenct must be from INR or USR"),  
  body('sizes')
    .exists().withMessage("sizes is required").bail()
    .isArray().withMessage("sizes must be array"),
  body("sizes.*.size")
    .exists().withMessage("size must be present in every entry of sizes array").bail()
    .isString().withMessage("size must be string").bail()
    .trim()
    .isIn(["XS","S","M","L","XL","XXL"]).withMessage("size can be one of these XS, S, M, L, XL, XXL."),
  body("sizes.*.stock")
    .exists().withMessage("stock must be present in every entry of sizes array").bail()
    .isInt({min:0}).withMessage("Stock must be a integer value"),      
  (req,res,next)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
      res.status(400).json({
        message: "Invalid Request",
        errors: errors.array()
      })
    }

    next();
  }
]

export const unlistProductValidator = [
  param('id')
    .exists().withMessage("id is required in params").bail()
    .isMongoId().withMessage("id should be valid mongoDB ID"),
  (req,res,next)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      return  res.status(400).json({
        message: "Invalid Request",
        errors: errors.array(),
      })
    }

    next();

  }  
]

export const listProductValidator = [
  param('id')
    .exists().withMessage("id is required in params").bail()
    .isMongoId().withMessage("id should be valid mongoDB ID"),
  (req,res,next)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      return  res.status(400).json({
        message: "Invalid Request",
        errors: errors.array(),
      })
    }

    next();

  }  
]