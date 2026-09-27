import { body, validationResult } from "express-validator";

export const registerValidator = [
  body("email")
    .exists().withMessage("Email is required").bail()
    .trim()
    .notEmpty().withMessage("Email cannot be empty").bail()
    .isEmail().withMessage("Enter a valid email address"),
  body("name")
    .exists().withMessage("Name is required").bail()
    .isString().withMessage("Name must be a String").bail()
    .trim()
    .notEmpty().withMessage("Name cannot be empty").bail()
    .isLength({ min: 2, max: 50 }).withMessage("Name must be between 2 to 50 characters").bail()
    .matches(/^[A-Za-z][A-Za-z0-9]*$/).withMessage("Name must start with a letter and contain only letters, numbers, and spaces"),
  body("password")
    .exists().withMessage("Password is required").bail()
    .isString().withMessage("Password must be String").bail()
    .trim()
    .isLength({ min: 6, max: 100 }).withMessage("Password must be minimum 6 charaters long"),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        message: "Invalid Request",
        errors: errors.array(),
      });
    }

    next();
  },
];


export const loginValidator = [
  body("email")
    .exists().withMessage("Email is required").bail()
    .trim()
    .notEmpty().withMessage("Email cannot be empty").bail()
    .isEmail().withMessage("Invalid email address"),
  body("password")
   .exists().withMessage("password is required").bail()
   .isString().withMessage("password must be String").bail()
   .trim()
   .notEmpty().withMessage("password cannot be empty").bail()
   .isLength({min:6 , max: 100}).withMessage("password must be 6 characters long"),
  (req,res,next)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      return res.status(400).json({
        message: "Invalid Request",
        errors: errors.array(),
      })
    }

    next();

  }   
]