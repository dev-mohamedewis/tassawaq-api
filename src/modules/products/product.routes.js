import express from "express";

import authenticate from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/authorize.js";
import validate from "../../middlewares/validate.js";

import {
  createProductSchema,
  updateProductSchema,
} from "./product.validation.js";

import {
  createProductController,
  getProductsController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
} from "./product.controller.js";


const router = express.Router();


// Public routes
router.get("/", getProductsController);

router.get("/:productId", getProductByIdController);


// Admin routes
router.post(
  "/",
  authenticate,
  authorize("admin"),
  validate(createProductSchema),
  createProductController
);

router.patch(
  "/:productId",
  authenticate,
  authorize("admin"),
  validate(updateProductSchema),
  updateProductController
);

router.delete(
  "/:productId",
  authenticate,
  authorize("admin"),
  deleteProductController
);


export default router;