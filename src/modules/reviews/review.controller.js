import {
  createReview,
  getProductReviews,
  getReviewById,
  updateReview,
  deleteReview,
} from "./review.service.js";


// Create review
const createReviewController = async (req, res, next) => {
  try {
    const review = await createReview(req.user, req.body);

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review,
    });
  } catch (error) {
    next(error);
  }
};


// Get product reviews
const getProductReviewsController = async (req, res, next) => {
  try {
    const reviews = await getProductReviews(req.params.productId);

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};


// Get review by ID
const getReviewByIdController = async (req, res, next) => {
  try {
    const review = await getReviewById(req.params.reviewId);

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (error) {
    next(error);
  }
};


// Update review
// Update review
const updateReviewController = async (req, res, next) => {
  try {
    const review = await updateReview(
      req.params.reviewId,
      req.user,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: review,
    });
  } catch (error) {
    next(error);
  }
};


// Delete review
const deleteReviewController = async (req, res, next) => {
  try {
    await deleteReview(
      req.params.reviewId,
      req.user
    );

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export {
  createReviewController,
  getProductReviewsController,
  getReviewByIdController,
  updateReviewController,
  deleteReviewController,
};