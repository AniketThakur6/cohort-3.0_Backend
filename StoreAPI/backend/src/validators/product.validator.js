import { body, validationResult } from "express-validator";

export const productValidator = [
  body("title")
    .exists()
    .withMessage("Title is required")
    .bail()
    .isString()
    .withMessage("Title must be string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Title can't be empty")
    .bail()
    .isLength({ min: 10, max: 100 })
    .withMessage("Title must be between of 20 to 100 characters")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("only content letter,space and hyphen"),
  body("description")
    .exists()
    .withMessage("Description is required")
    .bail()
    .isString()
    .withMessage("Description must be string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Description can't be empty")
    .bail()
    .isLength({ min: 20, max: 500 })
    .withMessage("Description must be between of 20 to 100 characters"),
  body('category')
    .exists().withMessage("Category is required").bail()
    .isString().withMessage("Category is must be String").bail()
    .trim()
    .notEmpty().withMessage("Category can't be Empty").bail()
    .isLength().withMessage("Category must be between 5 to 50 characters").bail()
    .isAlpha("en-US",{ignore:" -"}).withMessage("English letters,space and - is allowed"),
  body("price.amount")
    .exists()
    .withMessage("Amount is required")
    .bail()
    // .isFloat({min:0}).withMessage("Amount should be float value")
    .custom((value) => {
      if (typeof value !== "number") {
        throw new error("Amount must be number");
      }

      if (!Number.isFinite(value)) {
        throw new error("Amount must be valid Number");
      }

      if (value < 0) {
        throw new error("Amount can't be -ve value");
      }

      return true;
    }),
  body("price.currency")
    .isString()
    .withMessage("Currency must be String")
    .bail()
    .isIn(["INR", "USD"])
    .withMessage("Currency must be from INR or USD"),
  body("sizes")
    .exists()
    .withMessage("Sizes is required")
    .bail()
    .isArray()
    .withMessage("Sizes must be a array"),
  body("sizes.*.size")
    .exists()
    .withMessage("Size is required")
    .bail()
    .isString()
    .withMessage("Size must be string")
    .bail()
    .trim()
    .isIn(["XS", "S", "M", "L", "XL", "XXL", "XXXL"])
    .withMessage("Size can be one of these XS, S, M, L, XL, XXL,XXXL."),
  body("sizes.*.stock")
    .exists()
    .withMessage("Stock is required")
    .bail()
    .custom((value) => {
      if (!Number.isFinite(value)) {
        throw new error("Stock must be an Integer");
      }

      if (value < 0) {
        throw new error("Stock Minimum value is 0");
      }

      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid Request",
        errors: errors.array(),
      });
    }
    next();
  },
];
