import authMiddleware from "../../middlewares/auth.middleware.js";
import express from "express";
import authenticate from "../../middlewares/auth.middleware.js";
import { getCurrentUser, updateCurrentUser, changeCurrentUserPassword, requestEmailChangeController, verifyEmailChangeController, addAddressController, getAddressesController, updateAddressController, deleteAddressController, setDefaultAddressController } from "./user.controller.js";

const router = express.Router();

router.get("/me", authenticate, getCurrentUser);
router.patch("/me", authenticate, updateCurrentUser);
router.patch( "/me/password",authenticate,changeCurrentUserPassword);
router.patch("/me/email",authenticate,requestEmailChangeController);
router.post(
  "/me/email/verify",
  authenticate,
  verifyEmailChangeController
);
router.post("/me/addresses", authMiddleware, addAddressController);

router.get("/me/addresses", authMiddleware, getAddressesController);

router.patch(
  "/me/addresses/:addressId",
  authMiddleware,
  updateAddressController
);

router.delete(
  "/me/addresses/:addressId",
  authMiddleware,
  deleteAddressController
);

router.patch(
  "/me/addresses/:addressId/default",
  authMiddleware,
  setDefaultAddressController
);
export default router;