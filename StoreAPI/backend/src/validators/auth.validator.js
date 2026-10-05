import { body,validationResult } from 'express-validator';

export const registerValidator = [
  body('email')
    .exists().withMessage("Email is required").bail()
    .trim()
    .notEmpty().withMessage("Email is required").bail()
    .isEmail().withMessage("Invalid Email")
    .normalizeEmail(),
  body("name")
    .exists().withMessage("username is required").bail()
    .isString().withMessage("username must be string").bail()
    .trim()
    .notEmpty().withMessage(`username is can't be Empty`).bail()
    .isLength({min:2,max:50}).withMessage("username length from 2 to 50 charactes").bail()
    .matches(/^[a-zA-Z][a-zA-Z0-9_]*$/).withMessage("Username must start with a letter and contain only letters, numbers, or underscores"),
  body("password")
    .exists().withMessage('Password is required').bail()
    .isString().withMessage("Password must be String").bail()
    .matches(/^\S.*$/).withMessage("Invalid password").bail()
    .isLength({min:6,max:50}).withMessage("Password must be between 6 and 50 characters"),
  (req,res,next)=>{

    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
      return res.status(400).json({
        message:"Inavlid request",
        errors: errors.array()
      })
    }
    next()
  }        
]

export const loginValidator = [
  body("email")
    .exists().withMessage("Email is required").bail()
    .trim()
    .notEmpty().withMessage("Email can't be Empty").bail()
    .isEmail().withMessage("Invalid Email address")
    .normalizeEmail(),
  body('password')
    .exists().withMessage('Password is required')
    .isString().withMessage("Password must be String")
    .matches(/^\S.*$/).withMessage("Invalid Password")
    .isLength({min:6,max:50}).withMessage("Password must be between 6 and 50 characters"),
  (req,res,next)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      return res.status(400).json({
        message: "Invalid Request",
        errors:errors.array(),
      })
    }
    next();
  }   
]