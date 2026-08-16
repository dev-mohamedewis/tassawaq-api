import Joi from "joi";

// Validation schema for registering a new user
const registerSchema = Joi.object({
  firstName: Joi.string().trim().min(2).max(50).required(),

  lastName: Joi.string().trim().min(2).max(50).required(),

  email: Joi.string().trim().lowercase().email().required(),

  password: Joi.string().min(8).max(128).required(),

  phone: Joi.string().trim().min(10).max(20).required(),
});

// Validation schema for verifying email with a verification code
const verifyEmailSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),

  verificationCode: Joi.string()
    .pattern(/^\d{6}$/)
    .required(),
});

// Validation schema for logging in
const loginSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),

  password: Joi.string().required(),
});

// Validation schema for forgot password
const forgotPasswordSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
});

// Validation schema for reset password
const resetPasswordSchema = Joi.object({
  token: Joi.string()
    .required(),

  newPassword: Joi.string()
    .min(8)
    .required(),

  confirmPassword: Joi.string()
    .valid(Joi.ref("newPassword"))
    .required()
    .messages({
      "any.only": "Passwords do not match",
    }),
});
export { registerSchema, verifyEmailSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema };