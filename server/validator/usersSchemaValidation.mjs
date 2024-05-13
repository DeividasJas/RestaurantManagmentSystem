import { checkSchema, param, oneOf } from "express-validator";

// This is user validation -- checks if user input are valid, if yes - adding it to ./db/users.json via router then controller

export const userValidationSchema = checkSchema({
  name: {
    isLength: {
      options: { min: 8, max: 20 },
      errorMessage: "Username should be between 8 and 20 characters",
    },
    notEmpty: {
      errorMessage: "Cannot be empty username",
    },
    isString: {
      errorMessage: "Username is not a string, must be one",
    },
  },
  password: {
    isLength: {
      options: { min: 8, max: 30 },
      errorMessage: "Password should be between 8 and 30 characters",
    },
    matches: {
      options:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&~#^_+=\-';,./|":<>?])[A-Za-z\d@$!%*?&~#^_+=\-';,./|":<>?]{8,128}$/,
      errorMessage:
        "Minimum eight characters, maximum 30 characters at least one uppercase letter, one lowercase letter, one number and one special character:",
    },

    notEmpty: {
      errorMessage: "Password cannot be empty",
    },
  },
  email: {
    isEmail: {
      errorMessage: "Email must be valid email",
    },
    notEmpty: {
      errorMessage: "Email cannot be empty",
    },
  },
});

// **************************************************************************
// LOGIN VALIDATION
export const loginValidationSchema = [
  oneOf(
    [
      checkSchema({
        name: {
          notEmpty: {
            errorMessage: "Cannot be empty username",
          },
          isString: {
            errorMessage: "Username is not a string, must be one",
          },
        },
      }),
      checkSchema({
        email: {
          isEmail: {
            errorMessage: "Email must be valid email",
          },
          isEmpty: {
            errorMessage: "Email cannot be empty",
          },
        },
      }),
    ],
    "Either username or email must be provided"
  ),
  checkSchema({
    password: {
      notEmpty: {
        errorMessage: "Password cannot be empty",
      },
    },
  }),
];
// **************************************************************************
// update validation

export const updateUserValidationSchema = checkSchema({
  name: {
    optional: true,
    isLength: {
      options: { min: 8, max: 20 },
      errorMessage: "Username should be between 8 and 20 characters",
    },
    notEmpty: {
      errorMessage: "Cannot be empty username",
    },
    isString: {
      errorMessage: "Username is not a string, must be one",
    },
  },
  password: {
    isLength: {
      optional: true,
      options: { min: 8, max: 30 },
      errorMessage: "Password should be between 8 and 30 characters",
    },
    matches: {
      options:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&~#^_+=\-';,./|":<>?])[A-Za-z\d@$!%*?&~#^_+=\-';,./|":<>?]{8,128}$/,
      errorMessage:
        "Minimum eight characters, maximum 30 characters at least one uppercase letter, one lowercase letter, one number and one special character:",
    },

    notEmpty: {
      errorMessage: "Password cannot be empty",
    },
  },
  email: {
    optional: true,
    isEmail: {
      errorMessage: "Email must be valid email",
    },
    isEmpty: {
      errorMessage: "Email cannot be empty",
    },
  },
});

export const validateUserIdSchema = [
  param("id").isInt().withMessage("ID must be an interger"),
];

export const validateReservationParams = [
  param("userId").isInt().withMessage("user id must be interger"),
  param("bookId").isInt().withMessage("book id must be interger"),
];
