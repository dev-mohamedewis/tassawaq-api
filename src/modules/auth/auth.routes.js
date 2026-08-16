import express from "express";
import { registerUser, verifyUserEmail, loginUser, forgotPasswordController, resetPasswordController } from "./auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify-email", verifyUserEmail);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password", resetPasswordController);

export default router;