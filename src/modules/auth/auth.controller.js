import { register, verifyEmail, login } from "./auth.service.js";
import { registerSchema, verifyEmailSchema, loginSchema } from "./auth.validation.js";

const registerUser = async (req, res, next) => {
  try {
    const { error, value } = registerSchema.validate(req.body);

    if (error) {
      const validationError = new Error(error.details[0].message);
      validationError.statusCode = 400;
      throw validationError;
    }

    const user = await register(value);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          role: user.role,
          isVerified: user.isVerified,
          profileImage: user.profileImage,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const verifyUserEmail = async (req, res, next) => {
  try {
    const { error, value } = verifyEmailSchema.validate(req.body);

    if (error) {
      const validationError = new Error(error.details[0].message);
      validationError.statusCode = 400;
      throw validationError;
    }

    await verifyEmail(
      value.email,
      value.verificationCode
    );

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
      const validationError = new Error(error.details[0].message);
      validationError.statusCode = 400;
      throw validationError;
    }

    const { user, token } = await login(
      value.email,
      value.password
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          role: user.role,
          isVerified: user.isVerified,
          profileImage: user.profileImage,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export { registerUser, verifyUserEmail, loginUser };