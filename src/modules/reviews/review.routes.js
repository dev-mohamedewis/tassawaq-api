import express from "express";

import authenticate from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.js";

import {
  createReviewSchema,
  updateReviewSchema,
} from "./review.validation.js";

import {
  createReviewController,
  getProductReviewsController,
  getReviewByIdController,
  updateReviewController,
  deleteReviewController,
} from "./review.controller.js";

const router = express.Router();


// Public
router.get(
  "/product/:productId",
  getProductReviewsController
);

router.get(
  "/:reviewId",
  getReviewByIdController
);


// Authenticated users
router.post(
  "/",
  authenticate,
  validate(createReviewSchema),
  createReviewController
);

router.patch(
  "/:reviewId",
  authenticate,
  validate(updateReviewSchema),
  updateReviewController
);

router.delete(
  "/:reviewId",
  authenticate,
  deleteReviewController
);

export default router;