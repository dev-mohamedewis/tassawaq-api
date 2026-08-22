import express from "express";

import authenticate from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/authorize.js";

import {
  getDashboardOverviewController,
  getSalesOverviewController,
} from "./admin.controller.js";


const router = express.Router();


// All admin routes require authentication + admin role
router.use(
  authenticate,
  authorize("admin")
);


// Dashboard overview
router.get(
  "/dashboard",
  getDashboardOverviewController
);


// Sales overview
router.get(
  "/dashboard/sales",
  getSalesOverviewController
);


export default router;