import Joi from "joi";

// Validation schema for updating user profile
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

  // Validation schema for changing user password
  const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),

  newPassword: Joi.string()
    .min(8)
    .max(128)
    .required()
    .invalid(Joi.ref("currentPassword"))
    .messages({
      "any.invalid": "New password must be different from current password",
    }),

  confirmPassword: Joi.any()
    .valid(Joi.ref("newPassword"))
    .required()
    .messages({
      "any.only": "Passwords do not match",
    }),
});

// Validation schema for requesting email change
const requestEmailChangeSchema = Joi.object({
  currentPassword: Joi.string().required(),

  newEmail: Joi.string()
    .trim()
    .lowercase()
    .email()
    .required(),
});

// Validation schema for verifying email change
const verifyEmailChangeSchema = Joi.object({
  verificationCode: Joi.string()
    .length(6)
    .required(),
});
export { updateProfileSchema, changePasswordSchema, requestEmailChangeSchema, verifyEmailChangeSchema };