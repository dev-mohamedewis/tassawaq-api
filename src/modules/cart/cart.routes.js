import express from "express";

import {
  addToCartController,
  getCartController,
  updateCartItemController,
  removeFromCartController,
  clearCartController,
} from "./cart.controller.js";

import authenticate from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/authorize.js";
import validate from "../../middlewares/validate.js";

import {
  addToCartSchema,
  updateCartItemSchema,
  productIdParamSchema,
} from "./cart.validation.js";

const router = express.Router();


// All cart routes require authenticated customer
router.use(
  authenticate,
  authorize("customer")
);


// Get cart
router.get(
  "/",
  getCartController
);


// Add product to cart
router.post(
  "/items",
  validate(addToCartSchema),
  addToCartController
);


// Update cart item quantity
router.patch(
  "/items/:productId",
  validate(productIdParamSchema, "params"),
  validate(updateCartItemSchema),
  updateCartItemController
);


// Remove product from cart
router.delete(
  "/items/:productId",
  validate(productIdParamSchema, "params"),
  removeFromCartController
);


// Clear cart
router.delete(
  "/",
  clearCartController
);


export default router;