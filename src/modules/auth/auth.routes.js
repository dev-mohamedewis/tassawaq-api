import express from "express";
import { registerUser, verifyUserEmail } from "./auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify-email", verifyUserEmail);

export default router;