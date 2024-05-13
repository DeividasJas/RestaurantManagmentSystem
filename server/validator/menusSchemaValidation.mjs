import { checkSchema, param } from "express-validator";
//  validation for menus item

export const meniuValidationSchema = checkSchema({
  name: {
    isLength: {
      options: { min: 1, max: 30 },
      errorMessage: "Name has to be between 1 and 30 characters long",
    },
    notEmpty: {
      errorMessage: "Name cannot be empty",
    },
    isString: {
      errorMessage: "Name has to be a string",
    },
  },
  price: {
    notEmpty: {
      errorMessage: "Price cannot be empty",
    },
    isNumeric: {
      errorMessage: "Price has to be a number",
    },
  },
  category: {
    isObject: {
      errorMessage: "is not object",
    },
  },
  "category.appetizer": {
    isBoolean: {
      errorMessage: "Has to be a boolean",
    },
  },
  "category.main_course": {
    isBoolean: {
      errorMessage: "Has to be a boolean",
    },
  },
  "category.dessert": {
    isBoolean: {
      errorMessage: "Has to be a boolean",
    },
  },
});

export const validateMenuIdSchema = [
  param("id").isInt().withMessage("ID must be an interger"),
];
