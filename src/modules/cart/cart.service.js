import Cart from "./cart.model.js";
import Product from "../products/product.model.js";


// Get effective product price
const getProductPrice = (product) => {
  if (
    product.discountPrice !== null &&
    product.discountPrice !== undefined &&
    product.discountPrice < product.price
  ) {
    return product.discountPrice;
  }

  return product.price;
};


// Format cart response
const formatCart = (cart) => {
  let totalItems = 0;
  let totalPrice = 0;

  const items = cart.items.map((item) => {
    const product = item.product;

    const price = getProductPrice(product);

    const itemTotal = price * item.quantity;

    totalItems += item.quantity;
    totalPrice += itemTotal;

    return {
      _id: item._id,
      product,
      quantity: item.quantity,
      price,
      itemTotal,
    };
  });

  return {
    _id: cart._id,
    user: cart.user,
    items,
    totalItems,
    totalPrice,
    createdAt: cart.createdAt,
    updatedAt: cart.updatedAt,
  };
};


// Get or create cart
const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({
    user: userId,
  }).populate(
    "items.product",
    "name slug price discountPrice stock images isActive isDeleted"
  );

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [],
    });

    cart = await Cart.findById(cart._id).populate(
      "items.product",
      "name slug price discountPrice stock images isActive isDeleted"
    );
  }

  return cart;
};


// Add product to cart
const addToCart = async (userId, productId, quantity) => {
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

  if (product.stock < quantity) {
    const error = new Error(
      `Only ${product.stock} item(s) available in stock`
    );
    error.statusCode = 400;
    throw error;
  }

  let cart = await Cart.findOne({
    user: userId,
  });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [
        {
          product: productId,
          quantity,
        },
      ],
    });
  } else {
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;

      if (newQuantity > product.stock) {
        const error = new Error(
          `Only ${product.stock} item(s) available in stock`
        );
        error.statusCode = 400;
        throw error;
      }

      existingItem.quantity = newQuantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
      });
    }

    await cart.save();
  }

  cart = await Cart.findById(cart._id).populate(
    "items.product",
    "name slug price discountPrice stock images isActive isDeleted"
  );

  return formatCart(cart);
};


// Get cart
const getCart = async (userId) => {
  const cart = await getOrCreateCart(userId);

  return formatCart(cart);
};


// Update cart item quantity
const updateCartItem = async (userId, productId, quantity) => {
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

  if (quantity > product.stock) {
    const error = new Error(
      `Only ${product.stock} item(s) available in stock`
    );
    error.statusCode = 400;
    throw error;
  }

  const cart = await Cart.findOne({
    user: userId,
  });

  if (!cart) {
    const error = new Error("Cart not found");
    error.statusCode = 404;
    throw error;
  }

  const item = cart.items.find(
    (cartItem) => cartItem.product.toString() === productId
  );

  if (!item) {
    const error = new Error("Product not found in cart");
    error.statusCode = 404;
    throw error;
  }

  item.quantity = quantity;

  await cart.save();

  const updatedCart = await Cart.findById(cart._id).populate(
    "items.product",
    "name slug price discountPrice stock images isActive isDeleted"
  );

  return formatCart(updatedCart);
};


// Remove product from cart
const removeFromCart = async (userId, productId) => {
  const cart = await Cart.findOne({
    user: userId,
  });

  if (!cart) {
    const error = new Error("Cart not found");
    error.statusCode = 404;
    throw error;
  }

  const itemExists = cart.items.some(
    (item) => item.product.toString() === productId
  );

  if (!itemExists) {
    const error = new Error("Product not found in cart");
    error.statusCode = 404;
    throw error;
  }

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  await cart.save();

  const updatedCart = await Cart.findById(cart._id).populate(
    "items.product",
    "name slug price discountPrice stock images isActive isDeleted"
  );

  return formatCart(updatedCart);
};


// Clear cart
const clearCart = async (userId) => {
  const cart = await Cart.findOne({
    user: userId,
  });

  if (!cart) {
    return {
      items: [],
      totalItems: 0,
      totalPrice: 0,
    };
  }

  cart.items = [];

  await cart.save();

  return {
    _id: cart._id,
    user: cart.user,
    items: [],
    totalItems: 0,
    totalPrice: 0,
    updatedAt: cart.updatedAt,
  };
};


export {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};