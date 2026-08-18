import {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  getOrderByIdAdmin,
  updateOrderStatus,
} from "./order.service.js";


// Create order
const createOrderController = async (req, res, next) => {
  try {
    const order = await createOrder(
      req.user._id,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};


// Get my orders
const getMyOrdersController = async (req, res, next) => {
  try {
    const orders = await getMyOrders(
      req.user._id
    );

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};


// Get order by ID
const getOrderByIdController = async (req, res, next) => {
  try {
    const order = await getOrderById(
      req.params.orderId,
      req.user._id
    );

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};


// Cancel order
const cancelOrderController = async (req, res, next) => {
  try {
    const order = await cancelOrder(
      req.params.orderId,
      req.user._id
    );

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

// Get all orders - Admin
const getAllOrdersController = async (req, res, next) => {
  try {
    const orders = await getAllOrders();

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};


// Get order by ID - Admin
const getOrderByIdAdminController = async (req, res, next) => {
  try {
    const order = await getOrderByIdAdmin(
      req.params.orderId
    );

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};


// Update order status - Admin
const updateOrderStatusController = async (req, res, next) => {
  try {
    const order = await updateOrderStatus(
      req.params.orderId,
      req.body.status
    );

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export {
  createOrderController,
  getMyOrdersController,
  getOrderByIdController,
  cancelOrderController,
  getAllOrdersController,
  getOrderByIdAdminController,
  updateOrderStatusController,
};
