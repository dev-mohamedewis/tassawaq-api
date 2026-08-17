import { updateProfileSchema, changePasswordSchema, requestEmailChangeSchema, verifyEmailChangeSchema, addAddressSchema, updateAddressSchema } from "./user.validation.js";
import { updateProfile, changePassword, requestEmailChange, verifyEmailChange, addAddress, getAddresses, updateAddress, deleteAddress, setDefaultAddress } from "./user.service.js";

// Get current user's profile
const getCurrentUser = async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      user: {
        id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        phone: req.user.phone,
        role: req.user.role,
        isVerified: req.user.isVerified,
        profileImage: req.user.profileImage,
      },
    },
  });
};

// Update current user's profile
const updateCurrentUser = async (req, res, next) => {
  try {
    const { error, value } = updateProfileSchema.validate(req.body);

    if (error) {
      const validationError = new Error(error.details[0].message);
      validationError.statusCode = 400;
      throw validationError;
    }

    const user = await updateProfile(req.user._id, value);

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
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

// Change current user's password
const changeCurrentUserPassword = async (req, res, next) => {
  try {
    const { error, value } = changePasswordSchema.validate(req.body);

    if (error) {
      const validationError = new Error(error.details[0].message);
      validationError.statusCode = 400;
      throw validationError;
    }

    await changePassword(
      req.user._id,
      value.currentPassword,
      value.newPassword
    );

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Request email change
const requestEmailChangeController = async (req, res, next) => {
  try {
    const { error, value } = requestEmailChangeSchema.validate(req.body);

    if (error) {
      const validationError = new Error(error.details[0].message);
      validationError.statusCode = 400;
      throw validationError;
    }

    const result = await requestEmailChange(
      req.user._id,
      value.currentPassword,
      value.newEmail
    );

    res.status(200).json({
      success: true,
      message: "Email change verification code sent",
      data: {
        pendingEmail: result.pendingEmail,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Verify email change
const verifyEmailChangeController = async (req, res, next) => {
  try {
    const { error, value } = verifyEmailChangeSchema.validate(req.body);

    if (error) {
      const validationError = new Error(error.details[0].message);
      validationError.statusCode = 400;
      throw validationError;
    }

    await verifyEmailChange(
      req.user._id,
      value.verificationCode
    );

    res.status(200).json({
      success: true,
      message: "Email changed successfully",
    });
  } catch (error) {
    next(error);
  }
};


// Address management controllers
const addAddressController = async (req, res, next) => {
  try {
    const { error, value } = addAddressSchema.validate(req.body);

    if (error) {
      const validationError = new Error(error.details[0].message);
      validationError.statusCode = 400;
      throw validationError;
    }

    const address = await addAddress(req.user._id, value);

    res.status(201).json({
      success: true,
      message: "Address added successfully",
      data: address,
    });
  } catch (error) {
    next(error);
  }
};

const getAddressesController = async (req, res, next) => {
  try {
    const addresses = await getAddresses(req.user._id);

    res.status(200).json({
      success: true,
      data: addresses,
    });
  } catch (error) {
    next(error);
  }
};

const updateAddressController = async (req, res, next) => {
  try {
    const { error, value } = updateAddressSchema.validate(req.body);

    if (error) {
      const validationError = new Error(error.details[0].message);
      validationError.statusCode = 400;
      throw validationError;
    }

    const address = await updateAddress(
      req.user._id,
      req.params.addressId,
      value
    );

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      data: address,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAddressController = async (req, res, next) => {
  try {
    await deleteAddress(
      req.user._id,
      req.params.addressId
    );

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const setDefaultAddressController = async (req, res, next) => {
  try {
    const address = await setDefaultAddress(
      req.user._id,
      req.params.addressId
    );

    res.status(200).json({
      success: true,
      message: "Default address updated successfully",
      data: address,
    });
  } catch (error) {
    next(error);
  }
};
export { getCurrentUser, updateCurrentUser, changeCurrentUserPassword, requestEmailChangeController, verifyEmailChangeController, addAddressController, getAddressesController, updateAddressController, deleteAddressController, setDefaultAddressController };