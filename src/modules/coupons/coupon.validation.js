import Joi from "joi";

const createCouponSchema = Joi.object({
  code: Joi.string()
    .trim()
    .uppercase()
    .min(3)
    .max(50)
    .required(),

  description: Joi.string()
    .trim()
    .max(500)
    .allow("", null),

  discountType: Joi.string()
    .valid("percentage", "fixed")
    .required(),

  discountValue: Joi.number()
    .positive()
    .required(),

  minimumOrderAmount: Joi.number()
    .min(0)
    .default(0),

  maximumDiscountAmount: Joi.number()
    .positive()
    .allow(null),

  usageLimit: Joi.number()
    .integer()
    .positive()
    .allow(null),

  expiresAt: Joi.date()
    .iso()
    .greater("now")
    .required(),

  isActive: Joi.boolean()
    .default(true),
});


const updateCouponSchema = Joi.object({
  code: Joi.string()
    .trim()
    .uppercase()
    .min(3)
    .max(50),

  description: Joi.string()
    .trim()
    .max(500)
    .allow("", null),

  discountType: Joi.string()
    .valid("percentage", "fixed"),

  discountValue: Joi.number()
    .positive(),

  minimumOrderAmount: Joi.number()
    .min(0),

  maximumDiscountAmount: Joi.number()
    .positive()
    .allow(null),

  usageLimit: Joi.number()
    .integer()
    .positive()
    .allow(null),

  expiresAt: Joi.date()
    .iso()
    .greater("now"),

  isActive: Joi.boolean(),
}).min(1);


const applyCouponSchema = Joi.object({
  code: Joi.string()
    .trim()
    .uppercase()
    .required(),

  orderAmount: Joi.number()
    .min(0)
    .required(),
});


export {
  createCouponSchema,
  updateCouponSchema,
  applyCouponSchema,
};