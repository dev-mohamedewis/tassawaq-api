import Joi from "joi";

const addToCartSchema = Joi.object({
  product: Joi.string().hex().length(24).required().messages({
    "string.empty": "Product is required",
    "string.length": "Invalid product ID",
    "string.hex": "Invalid product ID",
    "any.required": "Product is required",
  }),

  quantity: Joi.number().integer().min(1).required().messages({
    "number.base": "Quantity must be a number",
    "number.integer": "Quantity must be an integer",
    "number.min": "Quantity must be at least 1",
    "any.required": "Quantity is required",
  }),
});

const updateCartItemSchema = Joi.object({
  quantity: Joi.number().integer().min(1).required().messages({
    "number.base": "Quantity must be a number",
    "number.integer": "Quantity must be an integer",
    "number.min": "Quantity must be at least 1",
    "any.required": "Quantity is required",
  }),
});

const productIdParamSchema = Joi.object({
  productId: Joi.string().hex().length(24).required().messages({
    "string.length": "Invalid product ID",
    "string.hex": "Invalid product ID",
    "any.required": "Product ID is required",
  }),
});

export {
  addToCartSchema,
  updateCartItemSchema,
  productIdParamSchema,
};