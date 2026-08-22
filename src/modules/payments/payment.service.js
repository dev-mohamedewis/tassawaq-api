import mongoose from "mongoose";
import Stripe from "stripe";

import Payment from "./payment.model.js";
import Order from "../orders/order.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const CURRENCY = process.env.STRIPE_CURRENCY || "egp";


// Create Payment Intent
const createPaymentIntent = async (userId, orderId) => {
  const order = await Order.findOne({
    _id: orderId,
    user: userId,
  });

  if (!order) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    throw error;
  }


  if (order.status === "cancelled") {
    const error = new Error(
      "Cancelled orders cannot be paid"
    );

    error.statusCode = 400;
    throw error;
  }


  if (order.paymentMethod !== "card") {
    const error = new Error(
      "This order does not require card payment"
    );

    error.statusCode = 400;
    throw error;
  }


  if (order.paymentStatus === "paid") {
    const error = new Error(
      "Order is already paid"
    );

    error.statusCode = 400;
    throw error;
  }


  // Check existing payment
  let payment = await Payment.findOne({
    order: order._id,
    user: userId,
  });


  // If an existing PaymentIntent exists,
  // return it instead of creating another one.
  if (
    payment &&
    payment.stripePaymentIntentId
  ) {
    const existingIntent =
      await stripe.paymentIntents.retrieve(
        payment.stripePaymentIntentId
      );

    if (
      existingIntent.status === "succeeded"
    ) {
      payment.status = "paid";
      payment.paidAt =
        payment.paidAt || new Date();

      await payment.save();

      if (
        order.paymentStatus !== "paid"
      ) {
        order.paymentStatus = "paid";
        await order.save();
      }

      return {
        payment,
        clientSecret:
          existingIntent.client_secret,
      };
    }

    return {
      payment,
      clientSecret:
        existingIntent.client_secret,
    };
  }


  // Stripe expects the amount
  // in the smallest currency unit.
  const amountInSmallestUnit =
    Math.round(order.totalPrice * 100);


  const paymentIntent =
    await stripe.paymentIntents.create({
      amount: amountInSmallestUnit,
      currency: CURRENCY,

      automatic_payment_methods: {
        enabled: true,
      },

      metadata: {
        orderId: order._id.toString(),
        userId: userId.toString(),
      },
    });


  payment = await Payment.create({
    order: order._id,
    user: userId,

    amount: order.totalPrice,

    currency: CURRENCY,

    method: "card",

    status: "processing",

    stripePaymentIntentId:
      paymentIntent.id,

    metadata: {
      orderId: order._id.toString(),
    },
  });


  order.paymentStatus = "pending";

  await order.save();


  return {
    payment,
    clientSecret:
      paymentIntent.client_secret,
  };
};


// Create COD payment
const createCashOnDeliveryPayment = async (
  userId,
  orderId
) => {
  const order = await Order.findOne({
    _id: orderId,
    user: userId,
  });

  if (!order) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    throw error;
  }


  if (
    order.paymentMethod !==
    "cash_on_delivery"
  ) {
    const error = new Error(
      "This order is not cash on delivery"
    );

    error.statusCode = 400;
    throw error;
  }


  let payment = await Payment.findOne({
    order: order._id,
  });


  if (payment) {
    return payment;
  }


  payment = await Payment.create({
    order: order._id,
    user: userId,

    amount: order.totalPrice,

    currency: CURRENCY,

    method: "cash_on_delivery",

    status: "pending",
  });


  return payment;
};


// Get current user's payments
const getMyPayments = async (userId) => {
  return Payment.find({
    user: userId,
  })
    .populate(
      "order",
      "status totalPrice paymentMethod paymentStatus createdAt"
    )
    .sort({
      createdAt: -1,
    });
};


// Get payment by ID
const getPaymentById = async (
  paymentId,
  userId
) => {
  const payment = await Payment.findOne({
    _id: paymentId,
    user: userId,
  }).populate(
    "order",
    "status totalPrice paymentMethod paymentStatus"
  );


  if (!payment) {
    const error = new Error(
      "Payment not found"
    );

    error.statusCode = 404;

    throw error;
  }


  return payment;
};


// Get payment by order
const getPaymentByOrder = async (
  orderId,
  userId
) => {
  const order = await Order.findOne({
    _id: orderId,
    user: userId,
  });

  if (!order) {
    const error = new Error(
      "Order not found"
    );

    error.statusCode = 404;

    throw error;
  }


  const payment = await Payment.findOne({
    order: orderId,
    user: userId,
  });


  if (!payment) {
    const error = new Error(
      "Payment not found"
    );

    error.statusCode = 404;

    throw error;
  }


  return payment;
};


// Refund payment - Admin
const refundPayment = async (
  paymentId
) => {
  const payment =
    await Payment.findById(paymentId);

  if (!payment) {
    const error = new Error(
      "Payment not found"
    );

    error.statusCode = 404;

    throw error;
  }


  if (payment.method !== "card") {
    const error = new Error(
      "Only card payments can be refunded through Stripe"
    );

    error.statusCode = 400;

    throw error;
  }


  if (
    payment.status !== "paid"
  ) {
    const error = new Error(
      "Only paid payments can be refunded"
    );

    error.statusCode = 400;

    throw error;
  }


  if (
    !payment.stripePaymentIntentId
  ) {
    const error = new Error(
      "Stripe PaymentIntent not found"
    );

    error.statusCode = 400;

    throw error;
  }


  const refund =
    await stripe.refunds.create({
      payment_intent:
        payment.stripePaymentIntentId,
    });


  if (
    refund.status === "succeeded"
  ) {
    payment.status = "refunded";
    payment.refundedAt = new Date();

    payment.refundAmount =
      refund.amount / 100;

    await payment.save();


    const order =
      await Order.findById(
        payment.order
      );

    if (order) {
      order.paymentStatus =
        "refunded";

      await order.save();
    }
  }


  return payment;
};


// Admin get all payments
const getAllPayments = async () => {
  return Payment.find()
    .populate(
      "user",
      "firstName lastName email"
    )
    .populate(
      "order",
      "status totalPrice paymentMethod paymentStatus"
    )
    .sort({
      createdAt: -1,
    });
};


// Admin get payment
const getPaymentByIdAdmin =
  async (paymentId) => {
    const payment =
      await Payment.findById(paymentId)
        .populate(
          "user",
          "firstName lastName email"
        )
        .populate(
          "order",
          "status totalPrice paymentMethod paymentStatus"
        );


    if (!payment) {
      const error = new Error(
        "Payment not found"
      );

      error.statusCode = 404;

      throw error;
    }


    return payment;
  };


/*
  Stripe Webhook

  IMPORTANT:
  This function must receive
  the RAW request body.
*/
const handleStripeWebhook = async (
  rawBody,
  signature
) => {
  let event;

  try {
    event =
      stripe.webhooks.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
  } catch (error) {
    error.statusCode = 400;
    error.message =
      "Invalid Stripe webhook signature";

    throw error;
  }


  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent =
        event.data.object;


      const payment =
        await Payment.findOne({
          stripePaymentIntentId:
            paymentIntent.id,
        });


      if (!payment) {
        break;
      }


      payment.status = "paid";
      payment.paidAt =
        payment.paidAt || new Date();

      await payment.save();


      await Order.findByIdAndUpdate(
        payment.order,
        {
          paymentStatus: "paid",
        }
      );


      break;
    }


    case "payment_intent.payment_failed": {
      const paymentIntent =
        event.data.object;


      const payment =
        await Payment.findOne({
          stripePaymentIntentId:
            paymentIntent.id,
        });


      if (!payment) {
        break;
      }


      payment.status = "failed";

      payment.failureReason =
        paymentIntent.last_payment_error
          ?.message ||
        "Payment failed";


      await payment.save();


      break;
    }


    case "payment_intent.processing": {
      const paymentIntent =
        event.data.object;


      await Payment.findOneAndUpdate(
        {
          stripePaymentIntentId:
            paymentIntent.id,
        },
        {
          status: "processing",
        }
      );


      break;
    }


    default:
      break;
  }


  return {
    received: true,
  };
};


export {
  createPaymentIntent,
  createCashOnDeliveryPayment,
  getMyPayments,
  getPaymentById,
  getPaymentByOrder,
  refundPayment,
  getAllPayments,
  getPaymentByIdAdmin,
  handleStripeWebhook,
};