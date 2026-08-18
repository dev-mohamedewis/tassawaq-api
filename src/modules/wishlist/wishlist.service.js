import Wishlist from "./wishlist.model.js";
import Product from "../products/product.model.js";


// Get wishlist
const getWishlist = async (userId) => {
  let wishlist = await Wishlist.findOne({
    user: userId,
  }).populate({
    path: "products",
    match: {
      isDeleted: false,
      isActive: true,
    },
  });

  if (!wishlist) {
    wishlist = await Wishlist.create({
      user: userId,
      products: [],
    });
  }

  return wishlist;
};


// Add product to wishlist
const addToWishlist = async (userId, productId) => {
  const product = await Product.findOne({
    _id: productId,
    isDeleted: false,
    isActive: true,
  });

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  let wishlist = await Wishlist.findOne({
    user: userId,
  });

  if (!wishlist) {
    wishlist = await Wishlist.create({
      user: userId,
      products: [productId],
    });
  } else {
    const alreadyExists = wishlist.products.some(
      (id) => id.toString() === productId.toString()
    );

    if (alreadyExists) {
      const error = new Error("Product already exists in wishlist");
      error.statusCode = 409;
      throw error;
    }

    wishlist.products.push(productId);

    await wishlist.save();
  }

  await wishlist.populate({
    path: "products",
    match: {
      isDeleted: false,
      isActive: true,
    },
  });

  return wishlist;
};


// Remove product from wishlist
const removeFromWishlist = async (userId, productId) => {
  const wishlist = await Wishlist.findOne({
    user: userId,
  });

  if (!wishlist) {
    const error = new Error("Wishlist not found");
    error.statusCode = 404;
    throw error;
  }

  const productExists = wishlist.products.some(
    (id) => id.toString() === productId.toString()
  );

  if (!productExists) {
    const error = new Error("Product not found in wishlist");
    error.statusCode = 404;
    throw error;
  }

  wishlist.products = wishlist.products.filter(
    (id) => id.toString() !== productId.toString()
  );

  await wishlist.save();

  await wishlist.populate({
    path: "products",
    match: {
      isDeleted: false,
      isActive: true,
    },
  });

  return wishlist;
};


// Clear wishlist
const clearWishlist = async (userId) => {
  const wishlist = await Wishlist.findOne({
    user: userId,
  });

  if (!wishlist) {
    const error = new Error("Wishlist not found");
    error.statusCode = 404;
    throw error;
  }

  wishlist.products = [];

  await wishlist.save();

  return wishlist;
};


export {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
};