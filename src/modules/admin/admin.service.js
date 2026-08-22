import User from "../users/user.model.js";
import Product from "../products/product.model.js";
import Order from "../orders/order.model.js";
import Category from "../categories/category.model.js";
import Brand from "../brands/brand.model.js";
import Review from "../reviews/review.model.js";


// Dashboard overview
const getDashboardOverview = async () => {
  const [
    totalUsers,
    totalCustomers,
    totalAdmins,
    totalProducts,
    totalCategories,
    totalBrands,
    totalOrders,
    pendingOrders,
    confirmedOrders,
    processingOrders,
    shippedOrders,
    deliveredOrders,
    cancelledOrders,
    pendingPayments,
    paidPayments,
    failedPayments,
    refundedPayments,
  ] = await Promise.all([
    User.countDocuments({
      isDeleted: false,
    }),

    User.countDocuments({
      role: "customer",
      isDeleted: false,
    }),

    User.countDocuments({
      role: "admin",
      isDeleted: false,
    }),

    Product.countDocuments({
      isDeleted: false,
    }),

    Category.countDocuments({
      isDeleted: false,
    }),

    Brand.countDocuments({
      isDeleted: false,
    }),

    Order.countDocuments(),

    Order.countDocuments({
      status: "pending",
    }),

    Order.countDocuments({
      status: "confirmed",
    }),

    Order.countDocuments({
      status: "processing",
    }),

    Order.countDocuments({
      status: "shipped",
    }),

    Order.countDocuments({
      status: "delivered",
    }),

    Order.countDocuments({
      status: "cancelled",
    }),

    Order.countDocuments({
      paymentStatus: "pending",
    }),

    Order.countDocuments({
      paymentStatus: "paid",
    }),

    Order.countDocuments({
      paymentStatus: "failed",
    }),

    Order.countDocuments({
      paymentStatus: "refunded",
    }),
  ]);


  // Revenue
  const revenueResult = await Order.aggregate([
    {
      $match: {
        status: {
          $ne: "cancelled",
        },
        paymentStatus: {
          $in: ["paid", "pending"],
        },
      },
    },

    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: "$totalPrice",
        },
      },
    },
  ]);


  const totalRevenue =
    revenueResult[0]?.totalRevenue || 0;


  // Low stock products
  const lowStockProducts = await Product.find({
    isDeleted: false,
    isActive: true,
    stock: {
      $lte: 10,
    },
  })
    .select("name stock price discountPrice images")
    .sort({
      stock: 1,
    })
    .limit(10);


  // Recent orders
  const recentOrders = await Order.find()
    .populate(
      "user",
      "firstName lastName email"
    )
    .sort({
      createdAt: -1,
    })
    .limit(10);


  // Top selling products
  const topProducts = await Order.aggregate([
    {
      $match: {
        status: {
          $ne: "cancelled",
        },
      },
    },

    {
      $unwind: "$items",
    },

    {
      $group: {
        _id: "$items.product",

        name: {
          $first: "$items.name",
        },

        image: {
          $first: "$items.image",
        },

        totalQuantity: {
          $sum: "$items.quantity",
        },

        totalRevenue: {
          $sum: "$items.total",
        },
      },
    },

    {
      $sort: {
        totalQuantity: -1,
      },
    },

    {
      $limit: 10,
    },
  ]);


  return {
    statistics: {
      users: {
        total: totalUsers,
        customers: totalCustomers,
        admins: totalAdmins,
      },

      products: {
        total: totalProducts,
      },

      categories: {
        total: totalCategories,
      },

      brands: {
        total: totalBrands,
      },

      orders: {
        total: totalOrders,
        pending: pendingOrders,
        confirmed: confirmedOrders,
        processing: processingOrders,
        shipped: shippedOrders,
        delivered: deliveredOrders,
        cancelled: cancelledOrders,
      },

      payments: {
        pending: pendingPayments,
        paid: paidPayments,
        failed: failedPayments,
        refunded: refundedPayments,
      },

      revenue: {
        total: totalRevenue,
        currency: "EGP",
      },
    },

    recentOrders,

    lowStockProducts,

    topProducts,
  };
};


// Sales overview
const getSalesOverview = async () => {
  const sales = await Order.aggregate([
    {
      $match: {
        status: {
          $ne: "cancelled",
        },
      },
    },

    {
      $group: {
        _id: {
          year: {
            $year: "$createdAt",
          },

          month: {
            $month: "$createdAt",
          },
        },

        orders: {
          $sum: 1,
        },

        revenue: {
          $sum: "$totalPrice",
        },
      },
    },

    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
  ]);


  return sales;
};


export {
  getDashboardOverview,
  getSalesOverview,
};