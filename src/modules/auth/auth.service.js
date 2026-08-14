import User from "../users/user.model.js";
import { createUser } from "../users/user.service.js";
import { sendVerificationEmail } from "../../services/email/email.service.js";
import crypto from "crypto";

const generateVerificationCode = () => {
  return crypto.randomInt(100000, 1000000).toString();
};
const register = async (userData) => {
  const existingUser = await User.findOne({
    email: userData.email,
    isDeleted: false,
  });

  if (existingUser) {
    const error = new Error("Email is already registered");
    error.statusCode = 409;
    throw error;
  }

  const verificationCode = generateVerificationCode();

  const verificationCodeExpiresAt = new Date(
    Date.now() + 10 * 60 * 1000
  );

  const user = await createUser({
    ...userData,
    verificationCode,
    verificationCodeExpiresAt,
  });

  await sendVerificationEmail({
    email: user.email,
    verificationCode,
  });

  return user;
};

const verifyEmail = async (email, verificationCode) => {
  const user = await User.findOne({
    email,
    isDeleted: false,
  }).select("+verificationCode +verificationCodeExpiresAt");

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  if (user.isVerified) {
    const error = new Error("Email is already verified");
    error.statusCode = 400;
    throw error;
  }

  if (
    !user.verificationCode ||
    user.verificationCode !== verificationCode
  ) {
    const error = new Error("Invalid verification code");
    error.statusCode = 400;
    throw error;
  }

  if (
    !user.verificationCodeExpiresAt ||
    user.verificationCodeExpiresAt < new Date()
  ) {
    const error = new Error("Verification code has expired");
    error.statusCode = 400;
    throw error;
  }

  user.isVerified = true;
  user.verificationCode = null;
  user.verificationCodeExpiresAt = null;

  await user.save();

  return user;
};

export { register, verifyEmail };