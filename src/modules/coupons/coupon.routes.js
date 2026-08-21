import express from "express";

import {
  createCouponController,
  getAllCouponsController,
  getCouponByIdController,
  updateCouponController,
  deleteCouponController,
  applyCouponController,
} from "./coupon.controller.js";

import authenticate from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/authorize.js";
import validate from "../../middlewares/validate.js";

import {
  createCouponSchema,
  updateCouponSchema,
  applyCouponSchema,
} from "./coupon.validation.js";

const router = express.Router();


// =========================
// Customer
// =========================

router.post(
  "/apply",
  authenticate,
  authorize("customer"),
  validate(applyCouponSchema),
  applyCouponController
);


// =========================
// Admin
// =========================

router.use(
  authenticate,
  authorize("admin")
);


router.post(
  "/",
  validate(createCouponSchema),
  createCouponController
);


router.get(
  "/",
  getAllCouponsController
);


router.get(
  "/:couponId",
  getCouponByIdController
);


router.patch(
  "/:couponId",
  validate(updateCouponSchema),
  updateCouponController
);


router.delete(
  "/:couponId",
  deleteCouponController
);


export default router;