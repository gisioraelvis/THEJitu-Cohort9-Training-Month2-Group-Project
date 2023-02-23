import Joi, { ref } from "joi";

// signup dto
export const UserSignUpDto = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email().messages({
    "string.empty": "Please provide email",
    "string.email": "Invalid email",
  }),
  password: Joi.string().required(),
  // .pattern(
  //   new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$")
  // )
  // .messages({
  //   "string.pattern.base":
  //     "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character",
  // }),

  confirmPassword: Joi.equal(ref("password")).required().messages({
    "any.only": "Passwords do not match",
  }),
});

// signin dto
export const UserSignInDto = Joi.object({
  email: Joi.string().required().email().messages({
    "string.empty": "Please provide an email",
    "string.email": "Invalid email",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Please provide a password",
  }),
});

// forgot password dto
export const UserForgotPasswordDto = Joi.object({
  email: Joi.string().required().email().messages({
    "string.empty": "Please provide an email",
    "string.email": "Invalid email",
  }),
});

// reset password dto
export const UserPasswordResetDto = Joi.object({
  password: Joi.string()
    .required()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$")
    )
    .messages({
      "string.pattern.base":
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character",
    }),
  confirmPassword: Joi.equal(ref("password")).required().messages({
    "any.only": "Passwords do not match",
  }),
});

// update user profile dto
export const UserUpdateProfileDto = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email().messages({
    "string.empty": "Please provide an email",
    "string.email": "Invalid email",
  }),
  password: Joi.string()
    .required()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$")
    )
    .messages({
      "string.pattern.base":
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character",
    }),
  confirmPassword: Joi.equal(ref("password")).required().messages({
    "any.only": "Passwords do not match",
  }),
});

// update user password dto
export const UserUpdatePasswordDto = Joi.object({
  password: Joi.string()
    .required()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$")
    )
    .messages({
      "string.pattern.base":
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character",
    }),
  confirmPassword: Joi.equal(ref("password")).required().messages({
    "any.only": "Passwords do not match",
  }),
});

export const UserUpdateProfileByAdminDto = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email().messages({
    "string.empty": "Please provide an email",
    "string.email": "Invalid email",
  }),
  isAdmin: Joi.boolean(),
});
