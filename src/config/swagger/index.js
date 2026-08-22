import authSchemas from "./schemas/auth.schemas.js";
import userSchemas from "./schemas/user.schemas.js";
import categorySchemas from "./schemas/category.schemas.js";
import brandSchemas from "./schemas/brand.schemas.js";
import wishlistSchemas from "./schemas/wishlist.schemas.js";
import productSchemas from "./schemas/products.schemas.js";
import reviewSchemas from "./schemas/reviews.schemas.js";
import cartSchemas from "./schemas/cart.schemas.js";
import orderSchemas from "./schemas/order.schemas.js";
import couponSchemas from "./schemas/coupon.schemas.js";
import paymentSchemas from "./schemas/payment.schemas.js";

import reviewPaths from "./paths/reviews.paths.js";
import cartPaths from "./paths/cart.paths.js";
import productPaths from "./paths/products.paths.js";
import authPaths from "./paths/auth.paths.js";
import userPaths from "./paths/user.paths.js";
import categoryPaths from "./paths/category.paths.js";
import brandPaths from "./paths/brand.paths.js";
import wishlistPaths from "./paths/wishlist.paths.js";
import orderPaths from "./paths/order.paths.js";
import couponPaths from "./paths/coupon.paths.js";
import paymentPaths from "./paths/payment.paths.js";
import adminPaths from "./paths/admin.paths.js";

const swaggerDocument = {
  openapi: "3.0.0",

  info: {
    title: "Tassawaq API",
    version: "1.0.0",
    description: "Tassawaq E-Commerce REST API",
  },

  servers: [
    {
      url: "http://localhost:3000",
      description: "Local development server",
    },
  ],

  paths: {
    ...authPaths,
    ...userPaths,
    ...categoryPaths,
    ...brandPaths,
    ...productPaths,
    ...reviewPaths,
    ...cartPaths,
    ...wishlistPaths,
    ...orderPaths,
    ...couponPaths,
    ...paymentPaths,
    ...adminPaths,
  },

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },

    schemas: {
      ...authSchemas,
      ...userSchemas,
      ...categorySchemas,
      ...brandSchemas,
      ...productSchemas,
      ...reviewSchemas,
      ...cartSchemas,
      ...wishlistSchemas,
      ...orderSchemas,
      ...couponSchemas,
      ...paymentSchemas,
    },
  },
};

export default swaggerDocument;