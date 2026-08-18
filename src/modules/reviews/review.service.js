import Review from "./review.model.js";
import Product from "../products/product.model.js";

// Create review
const createReview = async (user, reviewData) => {
  const { product, rating, comment } = reviewData;

  // Only regular users can create reviews
    if (user.role !== "customer") {
    const error = new Error("Only customers can create reviews");
    error.statusCode = 403;
    throw error;
    }

  // Check product
  const productExists = await Product.findOne({
    _id: product,
    isDeleted: false,
    isActive: true,
  });

  if (!productExists) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  // Check existing review
  const existingReview = await Review.findOne({
    product,
    user: user._id,
    isDeleted: false,
  });

  if (existingReview) {
    const error = new Error("You have already reviewed this product");
    error.statusCode = 409;
    throw error;
  }

  const review = await Review.create({
    product,
    user: user._id,
    rating,
    comment: comment || "",
  });

  return review;
};

// Get product reviews
const getProductReviews = async (productId) => {
  const productExists = await Product.findOne({
    _id: productId,
    isDeleted: false,
    isActive: true,
  });

  if (!productExists) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  const reviews = await Review.find({
    product: productId,
    isDeleted: false,
  })
    .populate("user", "firstName lastName profileImage")
    .sort({ createdAt: -1 });

  return reviews;
};

// Get review by ID
const getReviewById = async (reviewId) => {
  const review = await Review.findOne({
    _id: reviewId,
    isDeleted: false,
  }).populate("user", "firstName lastName profileImage");

  if (!review) {
    const error = new Error("Review not found");
    error.statusCode = 404;
    throw error;
  }

  return review;
};

// Update review
const updateReview = async (reviewId, user, reviewData) => {
  const query = {
    _id: reviewId,
    isDeleted: false,
  };

  if (user.role !== "admin") {
    query.user = user._id;
  }

  const review = await Review.findOne(query);

  if (!review) {
    const error = new Error("Review not found");
    error.statusCode = 404;
    throw error;
  }

  Object.assign(review, reviewData);

  await review.save();

  return review;
};


const deleteReview = async (reviewId, user) => {
  const query = {
    _id: reviewId,
    isDeleted: false,
  };

  if (user.role !== "admin") {
    query.user = user._id;
  }

  const review = await Review.findOne(query);

  if (!review) {
    const error = new Error("Review not found");
    error.statusCode = 404;
    throw error;
  }

  review.isDeleted = true;
  review.deletedAt = new Date();

  await review.save();

  return review;
};

export {
  createReview,
  getProductReviews,
  getReviewById,
  updateReview,
  deleteReview,
};