import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import notFound from "./middlewares/notfound.js";
import errorHandler from "./middlewares/error.js";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./config/swagger/index.js";


import authRoutes from "./modules/auth/auth.routes.js";
import categoryRoutes from "./modules/categories/category.routes.js";
import userRoutes from "./modules/users/user.routes.js";
import brandRoutes from "./modules/brands/brand.routes.js";
import productRoutes from "./modules/products/product.routes.js";
import reviewRoutes from "./modules/reviews/review.routes.js";
import cartRoutes from "./modules/cart/cart.routes.js";
import wishlistRoutes from "./modules/wishlist/wishlist.routes.js";
import orderRoutes from "./modules/orders/order.routes.js";
import couponRoutes from "./modules/coupons/coupon.routes.js";
import paymentRoutes from "./modules/payments/payment.routes.js";
import {
  stripeWebhookController,
} from "./modules/payments/payment.controller.js";

const app = express();

app.use(
  "/api/v1/payments/webhook",
  express.raw({
    type: "application/json",
  }),
  stripeWebhookController
);

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Routes will be added here

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Tassawaq API is running",
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/brands", brandRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/coupons", couponRoutes);
app.use("/api/v1/payments", paymentRoutes);

app.use(notFound);
app.use(errorHandler);


export default app;