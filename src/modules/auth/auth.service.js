import User from "../users/user.model.js";
import { createUser } from "../users/user.service.js";
import { sendVerificationEmail, sendPasswordResetEmail } from "../../services/email/email.service.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateVerificationCode = () => {
  return crypto.randomInt(100000, 1000000).toString();
};

// TODO: Add email verification
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

// TODO: login
const login = async (email, password) => {
  const user = await User.findOne({
    email,
    isDeleted: false,
  }).select("+password");

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  if (!user.isVerified) {
    const error = new Error("Please verify your email before logging in");
    error.statusCode = 403;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  user.lastLogin = new Date();
  await user.save();

  const token = jwt.sign(
    {
      userId: user._id.toString(),
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  return { user, token };
};

const forgotPassword = async (email) => {
  const user = await User.findOne({
    email: email.toLowerCase(),
    isDeleted: false,
  });

  // لا نكشف هل الإيميل موجود أم لا
  if (!user) {
    return;
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

  user.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.passwordResetTokenExpiresAt = new Date(
    Date.now() + 15 * 60 * 1000
  );

  await user.save();

  // مؤقتًا هنستخدم الـemail service الموجود
  await sendPasswordResetEmail({
    email: user.email,
    resetToken,
  });
};

// TODO: reset password
const resetPassword = async ({ token, newPassword }) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpiresAt: {
      $gt: new Date(),
    },
    isDeleted: false,
  }).select("+passwordResetToken +passwordResetTokenExpiresAt");

  if (!user) {
    const error = new Error("Invalid or expired reset token");
    error.statusCode = 400;
    throw error;
  }

  user.password = await bcrypt.hash(newPassword, 12);

  user.passwordResetToken = null;
  user.passwordResetTokenExpiresAt = null;
  user.lastPasswordChanged = new Date();

  await user.save();
};
export { register, verifyEmail, login, forgotPassword, resetPassword };