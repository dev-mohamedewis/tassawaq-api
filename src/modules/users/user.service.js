import bcrypt from "bcrypt";
import User from "./user.model.js";

const createUser = async (userData) => {
  const { password } = userData;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    ...userData,
    password: hashedPassword,
  });

  return user;
};

export { createUser };