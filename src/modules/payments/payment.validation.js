import Joi from "joi";

const createPaymentIntentSchema =
  Joi.object({
    orderId: Joi.string()
      .hex()
      .length(24)
      .required(),
  });


const createCODPaymentSchema =
  Joi.object({
    orderId: Joi.string()
      .hex()
      .length(24)
      .required(),
  });


export {
  createPaymentIntentSchema,
  createCODPaymentSchema,
};