import Joi from "joi";

// Validation schema for creating a category
const createCategorySchema = Joi.object({
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

  image: Joi.string()
    .trim()
    .uri()
    .allow("", null),

  isActive: Joi.boolean()
    .default(true),
});

// Validation schema for updating a category
const updateCategorySchema = Joi.object({
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

  image: Joi.string()
    .trim()
    .uri()
    .allow("", null),

  isActive: Joi.boolean(),
}).min(1);

export {
  createCategorySchema,
  updateCategorySchema,
};