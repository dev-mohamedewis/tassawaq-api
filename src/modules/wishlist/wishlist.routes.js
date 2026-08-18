import express from "express";

import {
  getWishlistController,
  addToWishlistController,
  removeFromWishlistController,
  clearWishlistController,
} from "./wishlist.controller.js";

import authenticate from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/authorize.js";
import validate from "../../middlewares/validate.js";

import { productIdSchema } from "./wishlist.validation.js";

const router = express.Router();

router.use(
  authenticate,
  authorize("customer")
);


router.get(
  "/",
  getWishlistController
);


router.post(
  "/items",
  validate(productIdSchema),
  addToWishlistController
);


router.delete(
  "/items",
  validate(productIdSchema),
  removeFromWishlistController
);


router.delete(
  "/",
  clearWishlistController
);


export default router;