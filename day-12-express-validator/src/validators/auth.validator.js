import { body, validationResult } from 'express-validator';

export const registerValidation = [
  body('email')
    .exists().withMessage("email is required").bail()
    .isEmail().withMessage('invalid email'),
  body('phone')
    .exists().withMessage("phone No is required").bail()
    .isMobilePhone("en-IN").withMessage("Invalid number"),
  body("password")
    .exists().withMessage("password is required").bail()
    .trim().isLength({min:6}).withMessage("password at least 6 characters long"),
  (req,res,next)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
      return res.status(400).json({
        message:"Invalid request",
        errors:errors.array()
      })
    }
    next();
  }    
    
]
