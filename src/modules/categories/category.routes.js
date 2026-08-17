import express from "express";

import authenticate from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/authorize.js";

import {
  createCategoryController,
  getCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryController,
} from "./category.controller.js";

const router = express.Router();

// Public
router.get("/", getCategoriesController);
router.get("/:categoryId", getCategoryByIdController);

// Admin only
router.post(
  "/",
  authenticate,
  authorize("admin"),
  createCategoryController
);

router.patch(
  "/:categoryId",
  authenticate,
  authorize("admin"),
  updateCategoryController
);

router.delete(
  "/:categoryId",
  authenticate,
  authorize("admin"),
  deleteCategoryController
);

export default router;