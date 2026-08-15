import express from "express";
import authenticate from "../../middlewares/auth.middleware.js";
import { getCurrentUser, updateCurrentUser, changeCurrentUserPassword } from "./user.controller.js";

const router = express.Router();

router.get("/me", authenticate, getCurrentUser);
router.patch("/me", authenticate, updateCurrentUser);
router.patch(
  "/me/password",
  authenticate,
  changeCurrentUserPassword
);

export default router;