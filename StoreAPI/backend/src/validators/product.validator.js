import { body, param, validationResult } from "express-validator";

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
    .matches(/^[a-zA-Z0-9 -]+$/)
    .withMessage(
      "Title can contain only letters, numbers, spaces, and hyphens",
    ),
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
    .withMessage("Description must be between of 20 to 100 characters")
    .matches(/^[a-zA-Z0-9 -]+$/)
    .withMessage(
      "Description can contain only letters, numbers, spaces,number and hyphens",
    ),
  body("category")
    .exists()
    .withMessage("Category is required")
    .bail()
    .isString()
    .withMessage("Category is must be String")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Category can't be Empty")
    .bail()
    .isLength({ min: 5, max: 50 })
    .withMessage("Category must be between 5 to 50 characters")
    .bail()
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("English letters,space and - is allowed"),
  body("price.amount")
    .exists()
    .withMessage("Amount is required")
    .bail()
    // .isFloat({min:0}).withMessage("Amount should be float value")
    .custom((value) => {
      if (typeof value !== "number") {
        throw new Error("Amount must be number");
      }

      if (!Number.isFinite(value)) {
        throw new Error("Amount must be valid Number");
      }

      if (value < 0) {
        throw new Error("Amount can't be -ve value");
      }

      return true;
    })
    .isFloat({ min: 0 })
    .withMessage("Amount should be float value"),
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
        throw new Error("Stock must be an Integer");
      }

      if (value < 0) {
        throw new Error("Stock Minimum value is 0");
      }

      return true;
    })
    .isInt({ min: 0 })
    .withMessage("Amount should be float value"),
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

export const productPramId = [
  param("id")
    .exists()
    .withMessage("Id is required")
    .isMongoId()
    .withMessage("It is not valid mongodb Id"),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid request",
        errors: errors.array(),
      });
    }
    next();
  },
];

export const updateValidator = [
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
    .matches(/^[a-zA-Z0-9 -]+$/)
    .withMessage(
      "Title can contain only letters, numbers, spaces, and hyphens",
    ),
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
    .withMessage("Description must be between of 20 to 100 characters")
    .matches(/^[a-zA-Z0-9 -]+$/)
    .withMessage(
      "Description can contain only letters, numbers, spaces,number and hyphens",
    ),
  body("category")
    .exists()
    .withMessage("Category is required")
    .bail()
    .isString()
    .withMessage("Category is must be String")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Category can't be Empty")
    .bail()
    .isLength({ min: 5, max: 50 })
    .withMessage("Category must be between 5 to 50 characters")
    .bail()
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("English letters,space and - is allowed"),
  body("price.amount")
    .exists()
    .withMessage("Amount is required")
    .bail()
    // .isFloat({min:0}).withMessage("Amount should be float value")
    .custom((value) => {
      if (typeof value !== "number") {
        throw new Error("Amount must be number");
      }

      if (!Number.isFinite(value)) {
        throw new Error("Amount must be valid Number");
      }

      if (value < 0) {
        throw new Error("Amount can't be -ve value");
      }

      return true;
    })
    .isFloat({ min: 0 })
    .withMessage("Amount should be float value"),
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
        throw new Error("Stock must be an Integer");
      }

      if (value < 0) {
        throw new Error("Stock Minimum value is 0");
      }

      return true;
    })
    .isInt({ min: 0 })
    .withMessage("Amount should be float value"),
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
