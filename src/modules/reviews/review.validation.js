import Joi from "joi";

const createReviewSchema = Joi.object({
  product: Joi.string()
    .hex()
    .length(24)
    .required(),

  rating: Joi.number()
    .integer()
    .min(1)
    .max(5)
    .required(),

  comment: Joi.string()
    .trim()
    .max(1000)
    .allow(""),
});

const updateReviewSchema = Joi.object({
  rating: Joi.number()
    .integer()
    .min(1)
    .max(5),

  comment: Joi.string()
    .trim()
    .max(1000)
    .allow(""),
}).min(1);

export {
  createReviewSchema,
  updateReviewSchema,
};