import Joi from "joi";

const productIdSchema = Joi.object({
  productId: Joi.string().hex().length(24).required(),
});

export {
  productIdSchema,
};