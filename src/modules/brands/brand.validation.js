import Joi from "joi";


// Validation schema for creating a brand
const createBrandSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required(),

  slug: Joi.string()
    .trim()
    .lowercase()
    .pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .max(100)
    .required(),

  description: Joi.string()
    .trim()
    .max(500)
    .allow("", null),

  logo: Joi.string()
    .trim()
    .uri()
    .allow("", null),

  isActive: Joi.boolean()
    .default(true),
});


// Validation schema for updating a brand
const updateBrandSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100),

  slug: Joi.string()
    .trim()
    .lowercase()
    .pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .max(100),

  description: Joi.string()
    .trim()
    .max(500)
    .allow("", null),

  logo: Joi.string()
    .trim()
    .uri()
    .allow("", null),

  isActive: Joi.boolean(),
}).min(1);


export {
  createBrandSchema,
  updateBrandSchema,
};