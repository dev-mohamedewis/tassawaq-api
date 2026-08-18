import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} from "./wishlist.service.js";


// Get wishlist
const getWishlistController = async (req, res, next) => {
  try {
    const wishlist = await getWishlist(req.user._id);

    res.status(200).json({
      success: true,
      data: wishlist,
    });
  } catch (error) {
    next(error);
  }
};


// Add product
const addToWishlistController = async (req, res, next) => {
  try {
    const wishlist = await addToWishlist(
      req.user._id,
      req.body.productId
    );

    res.status(200).json({
      success: true,
      message: "Product added to wishlist successfully",
      data: wishlist,
    });
  } catch (error) {
    next(error);
  }
};


// Remove product
const removeFromWishlistController = async (req, res, next) => {
  try {
    const wishlist = await removeFromWishlist(
      req.user._id,
      req.body.productId
    );

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist successfully",
      data: wishlist,
    });
  } catch (error) {
    next(error);
  }
};


// Clear wishlist
const clearWishlistController = async (req, res, next) => {
  try {
    await clearWishlist(req.user._id);

    res.status(200).json({
      success: true,
      message: "Wishlist cleared successfully",
    });
  } catch (error) {
    next(error);
  }
};


export {
  getWishlistController,
  addToWishlistController,
  removeFromWishlistController,
  clearWishlistController,
};