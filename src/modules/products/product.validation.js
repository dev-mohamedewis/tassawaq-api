import Joi from "joi";

const createProductSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(200)
    .required(),

  slug: Joi.string()
    .trim()
    .lowercase()
    .pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .max(200)
    .required(),

  description: Joi.string()
    .trim()
    .min(10)
    .max(5000)
    .required(),

  price: Joi.number()
    .min(0)
    .required(),

  discountPrice: Joi.number()
    .min(0)
    .allow(null),

  stock: Joi.number()
    .integer()
    .min(0)
    .required(),

  category: Joi.string()
    .hex()
    .length(24)
    .required(),

  brand: Joi.string()
    .hex()
    .length(24)
    .allow(null),

  images: Joi.array()
    .items(Joi.string().uri())
    .default([]),

  isActive: Joi.boolean()
    .default(true),
});


const updateProductSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(200),

  slug: Joi.string()
    .trim()
    .lowercase()
    .pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .max(200),

  description: Joi.string()
    .trim()
    .min(10)
    .max(5000),

  price: Joi.number()
    .min(0),

  discountPrice: Joi.number()
    .min(0)
    .allow(null),

  stock: Joi.number()
    .integer()
    .min(0),

  category: Joi.string()
    .hex()
    .length(24),

  brand: Joi.string()
    .hex()
    .length(24)
    .allow(null),

  images: Joi.array()
    .items(Joi.string().uri()),

  isActive: Joi.boolean(),
}).min(1);


export {
  createProductSchema,
  updateProductSchema,
};