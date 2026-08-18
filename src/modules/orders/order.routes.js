import express from "express";

import {
  createOrderController,
  getMyOrdersController,
  getOrderByIdController,
  cancelOrderController,
  getAllOrdersController,
  getOrderByIdAdminController,
  updateOrderStatusController,
} from "./order.controller.js";

import authenticate from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/authorize.js";
import validate from "../../middlewares/validate.js";

import {
  createOrderSchema,
  updateOrderStatusSchema,
} from "./order.validation.js";

const router = express.Router();


// =========================
// Admin Orders
// =========================

router.get(
  "/admin",
  authenticate,
  authorize("admin"),
  getAllOrdersController
);

router.get(
  "/admin/:orderId",
  authenticate,
  authorize("admin"),
  getOrderByIdAdminController
);

router.patch(
  "/admin/:orderId/status",
  authenticate,
  authorize("admin"),
  validate(updateOrderStatusSchema),
  updateOrderStatusController
);


// =========================
// Customer Orders
// =========================

router.post(
  "/",
  authenticate,
  authorize("customer"),
  validate(createOrderSchema),
  createOrderController
);

router.get(
  "/",
  authenticate,
  authorize("customer"),
  getMyOrdersController
);

router.get(
  "/:orderId",
  authenticate,
  authorize("customer"),
  getOrderByIdController
);

router.patch(
  "/:orderId/cancel",
  authenticate,
  authorize("customer"),
  cancelOrderController
);


export default router;