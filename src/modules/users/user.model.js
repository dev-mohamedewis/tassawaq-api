import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      trim: true,
    },

    street: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      trim: true,
    },

    postalCode: {
      type: String,
      trim: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { _id: true }
);

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },

    profileImage: {
      type: String,
      default: "/images/default-avatar.png",
      trim: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationCode: {
      type: String,
      default: null,
      select: false,
    },

    verificationCodeExpiresAt: {
      type: Date,
      default: null,
      select: false,
    },

    addresses: {
      type: [addressSchema],
      default: [],
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },

    lastLogin: {
      type: Date,
      default: null,
    },

    lastPasswordChanged: {
      type: Date,
      default: null,
    },

    pendingEmail: {
  type: String,
  default: null,
  lowercase: true,
  trim: true,
  select: false,
},

emailChangeCode: {
  type: String,
  default: null,
  select: false,
},

emailChangeCodeExpiresAt: {
  type: Date,
  default: null,
  select: false,
},
  },
  {
    timestamps: true,
  }
  
);

const User = mongoose.model("User", userSchema);

export default User;