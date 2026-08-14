import Joi from "joi";

const updateProfileSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .min(2)
    .max(50),

  lastName: Joi.string()
    .trim()
    .min(2)
    .max(50),

  phone: Joi.string()
    .trim()
    .pattern(/^[0-9]{10,15}$/),

  profileImage: Joi.string()
    .trim()
    .uri(),
})
  .min(1)
  .messages({
    "object.min": "At least one field is required",
  });

export { updateProfileSchema };