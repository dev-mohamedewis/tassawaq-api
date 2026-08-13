import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import notFound from "./middlewares/notfound.js";
import errorHandler from "./middlewares/error.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes will be added here

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Tassawaq API is running",
  });
});

app.use(notFound);
app.use(errorHandler);

export default app;