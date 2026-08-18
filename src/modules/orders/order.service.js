import mongoose from "mongoose";

import Order from "./order.model.js";
import Cart from "../cart/cart.model.js";
import Product from "../products/product.model.js";
import User from "../users/user.model.js";


// Create order
const createOrder = async (userId, orderData) => {
  const { addressId, paymentMethod } = orderData;

  const session = await mongoose.startSession();

  try {
    let createdOrder;

    await session.withTransaction(async () => {
      // Get user
      const user = await User.findOne({
        _id: userId,
        isDeleted: false,
      }).session(session);

      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }


      // Get shipping address
      const address = user.addresses.id(addressId);

      if (!address) {
        const error = new Error("Shipping address not found");
        error.statusCode = 404;
        throw error;
      }


      // Get cart
      const cart = await Cart.findOne({
        user: userId,
      }).session(session);

      if (!cart || cart.items.length === 0) {
        const error = new Error("Cart is empty");
        error.statusCode = 400;
        throw error;
      }


      const orderItems = [];
      let subtotal = 0;


      // Validate products and stock
      for (const cartItem of cart.items) {
        const product = await Product.findOne({
          _id: cartItem.product,
          isDeleted: false,
          isActive: true,
        }).session(session);

        if (!product) {
          const error = new Error(
            `Product not found: ${cartItem.product}`
          );

          error.statusCode = 404;
          throw error;
        }


        if (product.stock < cartItem.quantity) {
          const error = new Error(
            `Insufficient stock for product: ${product.name}`
          );

          error.statusCode = 400;
          throw error;
        }


        const price =
          product.discountPrice !== null &&
          product.discountPrice < product.price
            ? product.discountPrice
            : product.price;


        const itemTotal = price * cartItem.quantity;

        subtotal += itemTotal;


        orderItems.push({
          product: product._id,
          name: product.name,
          image: product.images?.[0] || null,
          price,
          quantity: cartItem.quantity,
          total: itemTotal,
        });
      }


      const shippingFee = 0;

      const totalPrice = subtotal + shippingFee;


      // Create order
      const orderResult = await Order.create(
        [
          {
            user: userId,

            items: orderItems,

            shippingAddress: {
              label: address.label,
              street: address.street,
              city: address.city,
              state: address.state,
              postalCode: address.postalCode,
              country: address.country,
              phone: user.phone,
            },

            subtotal,

            shippingFee,

            totalPrice,

            paymentMethod,

            status: "pending",

            paymentStatus: "pending",
          },
        ],
        { session }
      );


      createdOrder = orderResult[0];


      // Atomic stock decrement
      for (const item of cart.items) {
        const result = await Product.updateOne(
          {
            _id: item.product,
            isDeleted: false,
            isActive: true,
            stock: {
              $gte: item.quantity,
            },
          },
          {
            $inc: {
              stock: -item.quantity,
            },
          },
          {
            session,
          }
        );


        if (result.modifiedCount !== 1) {
          const error = new Error(
            "Insufficient stock"
          );

          error.statusCode = 400;
          throw error;
        }
      }


      // Clear cart
      cart.items = [];

      await cart.save({
        session,
      });
    });


    return createdOrder;

  } finally {
    await session.endSession();
  }
};


// Get current user's orders
const getMyOrders = async (userId) => {
  return Order.find({
    user: userId,
  })
    .populate(
      "items.product",
      "name slug images"
    )
    .sort({
      createdAt: -1,
    });
};


// Get order by ID
const getOrderById = async (orderId, userId) => {
  const order = await Order.findOne({
    _id: orderId,
    user: userId,
  }).populate(
    "items.product",
    "name slug images"
  );

  if (!order) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    throw error;
  }

  return order;
};


// Cancel order
const cancelOrder = async (orderId, userId) => {
  const session = await mongoose.startSession();

  try {
    let cancelledOrder;

    await session.withTransaction(async () => {
      const order = await Order.findOne({
        _id: orderId,
        user: userId,
      }).session(session);

      if (!order) {
        const error = new Error("Order not found");
        error.statusCode = 404;
        throw error;
      }


      if (
        [
          "shipped",
          "delivered",
          "cancelled",
        ].includes(order.status)
      ) {
        const error = new Error(
          "Order cannot be cancelled"
        );

        error.statusCode = 400;
        throw error;
      }


      // Restore stock atomically
      for (const item of order.items) {
        await Product.updateOne(
          {
            _id: item.product,
          },
          {
            $inc: {
              stock: item.quantity,
            },
          },
          {
            session,
          }
        );
      }


      order.status = "cancelled";
      order.cancelledAt = new Date();

      await order.save({
        session,
      });


      cancelledOrder = order;
    });


    return cancelledOrder;

  } finally {
    await session.endSession();
  }
};

// Get all orders - Admin
const getAllOrders = async () => {
  const orders = await Order.find()
    .populate("user", "firstName lastName email phone")
    .sort({ createdAt: -1 });

  return orders;
};


// Get order by ID - Admin
const getOrderByIdAdmin = async (orderId) => {
  const order = await Order.findById(orderId)
    .populate("user", "firstName lastName email phone");

  if (!order) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    throw error;
  }

  return order;
};


// Update order status - Admin
const updateOrderStatus = async (orderId, status) => {
  const order = await Order.findById(orderId);

  if (!order) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    throw error;
  }

  // Prevent updating cancelled orders
  if (order.status === "cancelled") {
    const error = new Error(
      "Cancelled orders cannot be updated"
    );

    error.statusCode = 400;

    throw error;
  }

  // Prevent updating delivered orders
  if (order.status === "delivered") {
    const error = new Error(
      "Delivered orders cannot be updated"
    );

    error.statusCode = 400;

    throw error;
  }

  order.status = status;

  if (status === "delivered") {
    order.deliveredAt = new Date();
  }

  await order.save();

  return order;
};

export {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  getOrderByIdAdmin,
  updateOrderStatus,
};
