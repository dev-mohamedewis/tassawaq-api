import validate from "../../middlewares/validate.js";
import express from "express";

import authenticate from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/authorize.js";

import {
  createBrandController,
  getBrandsController,
  getBrandByIdController,
  updateBrandController,
  deleteBrandController,
} from "./brand.controller.js";

import {
  createBrandSchema,
  updateBrandSchema,
} from "./brand.validation.js";

const router = express.Router();


// Get all brands
router.get("/", getBrandsController);


// Get brand by ID
router.get("/:brandId", getBrandByIdController);


// Create brand - Admin only
router.post(
  "/",
  authenticate,
  authorize("admin"),
  validate(createBrandSchema),
  createBrandController
);


// Update brand - Admin only
router.patch(
  "/:brandId",
  authenticate,
  authorize("admin"),
  validate(updateBrandSchema),
  updateBrandController
);


// Delete brand - Admin only
router.delete(
  "/:brandId",
  authenticate,
  authorize("admin"),
  deleteBrandController
);


export default router;