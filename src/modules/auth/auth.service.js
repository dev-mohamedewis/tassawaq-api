import User from "../users/user.model.js";
import { createUser } from "../users/user.service.js";

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

  const user = await createUser(userData);

  return user;
};

export { register };