import Joi from "joi";


const createOrderSchema = Joi.object({
  addressId: Joi.string()
    .hex()
    .length(24)
    .required(),

  paymentMethod: Joi.string()
    .valid("cash_on_delivery", "card")
    .default("cash_on_delivery"),
});


const updateOrderStatusSchema = Joi.object({
  status: Joi.string()
    .valid(
      "pending",
      "confirmed",
      "processing",
      "shipped",
      "delivered",
      "cancelled"
    )
    .required(),
});
export {
  createOrderSchema,
  updateOrderStatusSchema,
};