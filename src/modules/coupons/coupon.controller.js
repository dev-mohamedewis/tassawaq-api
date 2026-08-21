import {
  createCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  applyCoupon,
} from "./coupon.service.js";


// =========================
// Create Coupon
// =========================

const createCouponController = async (req, res, next) => {
  try {
    const coupon = await createCoupon(req.body);

    res.status(201).json({
      success: true,
      message: "Coupon created successfully",
      data: coupon,
    });
  } catch (error) {
    next(error);
  }
};


// =========================
// Get All Coupons
// =========================

const getAllCouponsController = async (req, res, next) => {
  try {
    const coupons = await getAllCoupons();

    res.status(200).json({
      success: true,
      data: coupons,
    });
  } catch (error) {
    next(error);
  }
};


// =========================
// Get Coupon By ID
// =========================

const getCouponByIdController = async (req, res, next) => {
  try {
    const coupon = await getCouponById(
      req.params.couponId
    );

    res.status(200).json({
      success: true,
      data: coupon,
    });
  } catch (error) {
    next(error);
  }
};


// =========================
// Update Coupon
// =========================

const updateCouponController = async (req, res, next) => {
  try {
    const coupon = await updateCoupon(
      req.params.couponId,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Coupon updated successfully",
      data: coupon,
    });
  } catch (error) {
    next(error);
  }
};


// =========================
// Delete Coupon
// =========================

const deleteCouponController = async (req, res, next) => {
  try {
    await deleteCoupon(req.params.couponId);

    res.status(200).json({
      success: true,
      message: "Coupon deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};


// =========================
// Apply Coupon
// =========================

const applyCouponController = async (req, res, next) => {
  try {
    const result = await applyCoupon(
      req.body.code,
      req.body.orderAmount
    );

    res.status(200).json({
      success: true,
      message: "Coupon applied successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


export {
  createCouponController,
  getAllCouponsController,
  getCouponByIdController,
  updateCouponController,
  deleteCouponController,
  applyCouponController,
};