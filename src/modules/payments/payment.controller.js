import {
  createPaymentIntent,
  createCashOnDeliveryPayment,
  getMyPayments,
  getPaymentById,
  getPaymentByOrder,
  refundPayment,
  getAllPayments,
  getPaymentByIdAdmin,
  handleStripeWebhook,
} from "./payment.service.js";


// Create card payment
const createPaymentIntentController =
  async (req, res, next) => {
    try {
      const result =
        await createPaymentIntent(
          req.user._id,
          req.body.orderId
        );


      res.status(201).json({
        success: true,
        data: result,
      });

    } catch (error) {
      next(error);
    }
  };


// Create COD payment
const createCODPaymentController =
  async (req, res, next) => {
    try {
      const payment =
        await createCashOnDeliveryPayment(
          req.user._id,
          req.body.orderId
        );


      res.status(201).json({
        success: true,
        data: payment,
      });

    } catch (error) {
      next(error);
    }
  };


// Get my payments
const getMyPaymentsController =
  async (req, res, next) => {
    try {
      const payments =
        await getMyPayments(
          req.user._id
        );


      res.status(200).json({
        success: true,
        data: payments,
      });

    } catch (error) {
      next(error);
    }
  };


// Get payment
const getPaymentByIdController =
  async (req, res, next) => {
    try {
      const payment =
        await getPaymentById(
          req.params.paymentId,
          req.user._id
        );


      res.status(200).json({
        success: true,
        data: payment,
      });

    } catch (error) {
      next(error);
    }
  };


// Get order payment
const getPaymentByOrderController =
  async (req, res, next) => {
    try {
      const payment =
        await getPaymentByOrder(
          req.params.orderId,
          req.user._id
        );


      res.status(200).json({
        success: true,
        data: payment,
      });

    } catch (error) {
      next(error);
    }
  };


// Refund - Admin
const refundPaymentController =
  async (req, res, next) => {
    try {
      const payment =
        await refundPayment(
          req.params.paymentId
        );


      res.status(200).json({
        success: true,
        data: payment,
      });

    } catch (error) {
      next(error);
    }
  };


// Admin get all payments
const getAllPaymentsController =
  async (req, res, next) => {
    try {
      const payments =
        await getAllPayments();


      res.status(200).json({
        success: true,
        data: payments,
      });

    } catch (error) {
      next(error);
    }
  };


// Admin get payment
const getPaymentByIdAdminController =
  async (req, res, next) => {
    try {
      const payment =
        await getPaymentByIdAdmin(
          req.params.paymentId
        );


      res.status(200).json({
        success: true,
        data: payment,
      });

    } catch (error) {
      next(error);
    }
  };


// Stripe webhook
const stripeWebhookController =
  async (req, res, next) => {
    try {
      const result =
        await handleStripeWebhook(
          req.body,
          req.headers[
            "stripe-signature"
          ]
        );


      res.status(200).json(result);

    } catch (error) {
      next(error);
    }
  };


export {
  createPaymentIntentController,
  createCODPaymentController,
  getMyPaymentsController,
  getPaymentByIdController,
  getPaymentByOrderController,
  refundPaymentController,
  getAllPaymentsController,
  getPaymentByIdAdminController,
  stripeWebhookController,
};