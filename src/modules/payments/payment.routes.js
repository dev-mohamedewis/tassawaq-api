import express from "express";

import {
  createPaymentIntentController,
  createCODPaymentController,
  getMyPaymentsController,
  getPaymentByIdController,
  getPaymentByOrderController,
  refundPaymentController,
  getAllPaymentsController,
  getPaymentByIdAdminController,
} from "./payment.controller.js";

import authenticate from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/authorize.js";
import validate from "../../middlewares/validate.js";

import {
  createPaymentIntentSchema,
  createCODPaymentSchema,
} from "./payment.validation.js";


const router = express.Router();


// =========================
// Customer
// =========================

router.post(
  "/create-intent",
  authenticate,
  authorize("customer"),
  validate(createPaymentIntentSchema),
  createPaymentIntentController
);


router.post(
  "/cash-on-delivery",
  authenticate,
  authorize("customer"),
  validate(createCODPaymentSchema),
  createCODPaymentController
);


router.get(
  "/",
  authenticate,
  authorize("customer"),
  getMyPaymentsController
);


router.get(
  "/order/:orderId",
  authenticate,
  authorize("customer"),
  getPaymentByOrderController
);


router.get(
  "/:paymentId",
  authenticate,
  authorize("customer"),
  getPaymentByIdController
);


// =========================
// Admin
// =========================

router.post(
  "/admin/:paymentId/refund",
  authenticate,
  authorize("admin"),
  refundPaymentController
);


router.get(
  "/admin",
  authenticate,
  authorize("admin"),
  getAllPaymentsController
);


router.get(
  "/admin/:paymentId",
  authenticate,
  authorize("admin"),
  getPaymentByIdAdminController
);


export default router;