import Coupon from "./coupon.model.js";


// =========================
// Create Coupon
// =========================

const createCoupon = async (data) => {
  const existingCoupon = await Coupon.findOne({
    code: data.code.toUpperCase(),
    isDeleted: false,
  });

  if (existingCoupon) {
    const error = new Error("Coupon with this code already exists");
    error.statusCode = 409;
    throw error;
  }

  if (
    data.discountType === "percentage" &&
    data.discountValue > 100
  ) {
    const error = new Error(
      "Percentage discount cannot exceed 100"
    );

    error.statusCode = 400;
    throw error;
  }

  if (
    data.discountType === "fixed" &&
    data.maximumDiscountAmount
  ) {
    const error = new Error(
      "Maximum discount amount is only valid for percentage coupons"
    );

    error.statusCode = 400;
    throw error;
  }

  const coupon = await Coupon.create({
    ...data,
    code: data.code.toUpperCase(),
  });

  return coupon;
};


// =========================
// Get All Coupons
// =========================

const getAllCoupons = async () => {
  return await Coupon.find({
    isDeleted: false,
  }).sort({
    createdAt: -1,
  });
};


// =========================
// Get Coupon By ID
// =========================

const getCouponById = async (couponId) => {
  const coupon = await Coupon.findOne({
    _id: couponId,
    isDeleted: false,
  });

  if (!coupon) {
    const error = new Error("Coupon not found");
    error.statusCode = 404;
    throw error;
  }

  return coupon;
};


// =========================
// Update Coupon
// =========================

const updateCoupon = async (couponId, data) => {
  const coupon = await Coupon.findOne({
    _id: couponId,
    isDeleted: false,
  });

  if (!coupon) {
    const error = new Error("Coupon not found");
    error.statusCode = 404;
    throw error;
  }

  if (data.code) {
    const existingCoupon = await Coupon.findOne({
      code: data.code.toUpperCase(),
      _id: { $ne: couponId },
      isDeleted: false,
    });

    if (existingCoupon) {
      const error = new Error(
        "Coupon with this code already exists"
      );

      error.statusCode = 409;
      throw error;
    }

    data.code = data.code.toUpperCase();
  }

  const discountType =
    data.discountType ?? coupon.discountType;

  const discountValue =
    data.discountValue ?? coupon.discountValue;

  if (
    discountType === "percentage" &&
    discountValue > 100
  ) {
    const error = new Error(
      "Percentage discount cannot exceed 100"
    );

    error.statusCode = 400;
    throw error;
  }

  if (
    discountType === "fixed" &&
    data.maximumDiscountAmount !== undefined &&
    data.maximumDiscountAmount !== null
  ) {
    const error = new Error(
      "Maximum discount amount is only valid for percentage coupons"
    );

    error.statusCode = 400;
    throw error;
  }

  Object.assign(coupon, data);

  await coupon.save();

  return coupon;
};


// =========================
// Delete Coupon
// =========================

const deleteCoupon = async (couponId) => {
  const coupon = await Coupon.findOne({
    _id: couponId,
    isDeleted: false,
  });

  if (!coupon) {
    const error = new Error("Coupon not found");
    error.statusCode = 404;
    throw error;
  }

  coupon.isDeleted = true;
  coupon.deletedAt = new Date();
  coupon.isActive = false;

  await coupon.save();

  return coupon;
};


// =========================
// Apply Coupon
// =========================

const applyCoupon = async (code, orderAmount) => {
  const coupon = await Coupon.findOne({
    code: code.toUpperCase(),
    isDeleted: false,
  });

  if (!coupon) {
    const error = new Error("Invalid coupon code");
    error.statusCode = 404;
    throw error;
  }

  if (!coupon.isActive) {
    const error = new Error("Coupon is inactive");
    error.statusCode = 400;
    throw error;
  }

  if (coupon.expiresAt <= new Date()) {
    const error = new Error("Coupon has expired");
    error.statusCode = 400;
    throw error;
  }

  if (
    coupon.usageLimit !== null &&
    coupon.usedCount >= coupon.usageLimit
  ) {
    const error = new Error(
      "Coupon usage limit has been reached"
    );

    error.statusCode = 400;
    throw error;
  }

  if (orderAmount < coupon.minimumOrderAmount) {
    const error = new Error(
      `Minimum order amount is ${coupon.minimumOrderAmount}`
    );

    error.statusCode = 400;
    throw error;
  }

  let discountAmount = 0;

  if (coupon.discountType === "percentage") {
    discountAmount =
      (orderAmount * coupon.discountValue) / 100;

    if (
      coupon.maximumDiscountAmount !== null &&
      discountAmount > coupon.maximumDiscountAmount
    ) {
      discountAmount = coupon.maximumDiscountAmount;
    }
  }

  if (coupon.discountType === "fixed") {
    discountAmount = coupon.discountValue;

    if (discountAmount > orderAmount) {
      discountAmount = orderAmount;
    }
  }

  const finalAmount = orderAmount - discountAmount;

  return {
    coupon: {
      _id: coupon._id,
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
    },

    orderAmount,

    discountAmount,

    finalAmount,
  };
};


export {
  createCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  applyCoupon,
};