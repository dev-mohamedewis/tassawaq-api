const couponSchemas = {
  Coupon: {
    type: "object",

    properties: {
      _id: {
        type: "string",
      },

      code: {
        type: "string",
        example: "SAVE20",
      },

      description: {
        type: "string",
        example: "20% discount",
      },

      discountType: {
        type: "string",
        enum: ["percentage", "fixed"],
      },

      discountValue: {
        type: "number",
        example: 20,
      },

      minimumOrderAmount: {
        type: "number",
        example: 500,
      },

      maximumDiscountAmount: {
        type: "number",
        nullable: true,
        example: 200,
      },

      usageLimit: {
        type: "integer",
        nullable: true,
        example: 100,
      },

      usedCount: {
        type: "integer",
        example: 0,
      },

      expiresAt: {
        type: "string",
        format: "date-time",
      },

      isActive: {
        type: "boolean",
      },

      isDeleted: {
        type: "boolean",
      },

      deletedAt: {
        type: "string",
        format: "date-time",
        nullable: true,
      },

      createdAt: {
        type: "string",
        format: "date-time",
      },

      updatedAt: {
        type: "string",
        format: "date-time",
      },
    },
  },


  CreateCouponRequest: {
    type: "object",

    required: [
      "code",
      "discountType",
      "discountValue",
      "expiresAt",
    ],

    properties: {
      code: {
        type: "string",
        example: "SAVE20",
      },

      description: {
        type: "string",
        example: "20% off your order",
      },

      discountType: {
        type: "string",
        enum: ["percentage", "fixed"],
        example: "percentage",
      },

      discountValue: {
        type: "number",
        example: 20,
      },

      minimumOrderAmount: {
        type: "number",
        example: 500,
      },

      maximumDiscountAmount: {
        type: "number",
        nullable: true,
        example: 200,
      },

      usageLimit: {
        type: "integer",
        nullable: true,
        example: 100,
      },

      expiresAt: {
        type: "string",
        format: "date-time",
        example: "2026-12-31T23:59:59.000Z",
      },

      isActive: {
        type: "boolean",
        example: true,
      },
    },
  },


  UpdateCouponRequest: {
    type: "object",

    properties: {
      code: {
        type: "string",
        example: "SAVE25",
      },

      description: {
        type: "string",
      },

      discountType: {
        type: "string",
        enum: ["percentage", "fixed"],
      },

      discountValue: {
        type: "number",
      },

      minimumOrderAmount: {
        type: "number",
      },

      maximumDiscountAmount: {
        type: "number",
        nullable: true,
      },

      usageLimit: {
        type: "integer",
        nullable: true,
      },

      expiresAt: {
        type: "string",
        format: "date-time",
      },

      isActive: {
        type: "boolean",
      },
    },
  },


  ApplyCouponRequest: {
    type: "object",

    required: [
      "code",
      "orderAmount",
    ],

    properties: {
      code: {
        type: "string",
        example: "SAVE20",
      },

      orderAmount: {
        type: "number",
        example: 1000,
      },
    },
  },
};


export default couponSchemas;