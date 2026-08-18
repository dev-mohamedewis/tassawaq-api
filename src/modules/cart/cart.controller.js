import {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "./cart.service.js";


// Add to cart
const addToCartController = async (req, res, next) => {
  try {
    const { product, quantity } = req.body;

    const cart = await addToCart(
      req.user._id,
      product,
      quantity
    );

    res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};


// Get cart
const getCartController = async (req, res, next) => {
  try {
    const cart = await getCart(req.user._id);

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};


// Update cart item
const updateCartItemController = async (req, res, next) => {
  try {
    const cart = await updateCartItem(
      req.user._id,
      req.params.productId,
      req.body.quantity
    );

    res.status(200).json({
      success: true,
      message: "Cart item updated successfully",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};


// Remove from cart
const removeFromCartController = async (req, res, next) => {
  try {
    const cart = await removeFromCart(
      req.user._id,
      req.params.productId
    );

    res.status(200).json({
      success: true,
      message: "Product removed from cart successfully",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};


// Clear cart
const clearCartController = async (req, res, next) => {
  try {
    const cart = await clearCart(req.user._id);

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};


export {
  addToCartController,
  getCartController,
  updateCartItemController,
  removeFromCartController,
  clearCartController,
};