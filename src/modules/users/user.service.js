import bcrypt from "bcrypt";
import User from "./user.model.js";
import crypto from "crypto";
import { sendVerificationEmail } from "../../services/email/email.service.js";

const createUser = async (userData) => {
  const { password } = userData;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    ...userData,
    password: hashedPassword,
  });

  return user;
};

// Update user profile
const updateProfile = async (userId, updateData) => {
  const allowedFields = [
    "firstName",
    "lastName",
    "phone",
    "profileImage",
  ];

  const updates = {};

  for (const field of allowedFields) {
    if (updateData[field] !== undefined) {
      updates[field] = updateData[field];
    }
  }

  const user = await User.findOneAndUpdate(
    {
      _id: userId,
      isDeleted: false,
    },
    {
      $set: updates,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return user;
};

const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findOne({
    _id: userId,
    isDeleted: false,
  }).select("+password");

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const isCurrentPasswordValid = await bcrypt.compare(
    currentPassword,
    user.password
  );

  if (!isCurrentPasswordValid) {
    const error = new Error("Current password is incorrect");
    error.statusCode = 401;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  user.password = hashedPassword;
  user.lastPasswordChanged = new Date();

  await user.save();

  return user;
};

// request email change
const requestEmailChange = async (userId, currentPassword, newEmail) => {
  const user = await User.findOne({
    _id: userId,
    isDeleted: false,
  }).select("+password");

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const isCurrentPasswordValid = await bcrypt.compare(
    currentPassword,
    user.password
  );

  if (!isCurrentPasswordValid) {
    const error = new Error("Current password is incorrect");
    error.statusCode = 401;
    throw error;
  }

  const existingUser = await User.findOne({
    email: newEmail,
    isDeleted: false,
  });

  if (existingUser) {
    const error = new Error("Email is already registered");
    error.statusCode = 409;
    throw error;
  }

  const verificationCode = crypto
    .randomInt(100000, 1000000)
    .toString();

  user.pendingEmail = newEmail;
  user.emailChangeCode = verificationCode;
  user.emailChangeCodeExpiresAt = new Date(
    Date.now() + 10 * 60 * 1000
  );

  await user.save();

  await sendVerificationEmail({
  email: newEmail,
  verificationCode,
});
  return {
    pendingEmail: newEmail,
    verificationCode,
  };
};

// Verify email change
const verifyEmailChange = async (userId, verificationCode) => {
  const user = await User.findOne({
    _id: userId,
    isDeleted: false,
  }).select(
    "+pendingEmail +emailChangeCode +emailChangeCodeExpiresAt"
  );

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  if (!user.pendingEmail || !user.emailChangeCode) {
    const error = new Error("No email change request found");
    error.statusCode = 400;
    throw error;
  }

  if (
    !user.emailChangeCodeExpiresAt ||
    user.emailChangeCodeExpiresAt < new Date()
  ) {
    const error = new Error("Verification code has expired");
    error.statusCode = 400;
    throw error;
  }

  if (user.emailChangeCode !== verificationCode) {
    const error = new Error("Invalid verification code");
    error.statusCode = 400;
    throw error;
  }

  const existingUser = await User.findOne({
    email: user.pendingEmail,
    _id: { $ne: user._id },
    isDeleted: false,
  });

  if (existingUser) {
    const error = new Error("Email is already registered");
    error.statusCode = 409;
    throw error;
  }

  user.email = user.pendingEmail;

  user.pendingEmail = null;
  user.emailChangeCode = null;
  user.emailChangeCodeExpiresAt = null;

  await user.save();

  return user;
};
export { createUser, updateProfile, changePassword, requestEmailChange, verifyEmailChange };