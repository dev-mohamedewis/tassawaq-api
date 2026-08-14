import Joi from "joi";

const registerSchema = Joi.object({
  firstName: Joi.string().trim().min(2).max(50).required(),

  lastName: Joi.string().trim().min(2).max(50).required(),

  email: Joi.string().trim().lowercase().email().required(),

  password: Joi.string().min(8).max(128).required(),

  phone: Joi.string().trim().min(10).max(20).required(),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),

  verificationCode: Joi.string()
    .pattern(/^\d{6}$/)
    .required(),
});

const loginSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),

  password: Joi.string().required(),
});

export { registerSchema, verifyEmailSchema, loginSchema };