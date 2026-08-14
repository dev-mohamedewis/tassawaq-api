import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import notFound from "./middlewares/notfound.js";
import errorHandler from "./middlewares/error.js";

import authRoutes from "./modules/auth/auth.routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./config/swagger.js";

import userRoutes from "./modules/users/user.routes.js";

const app = express();

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

app.use(notFound);
app.use(errorHandler);


export default app;