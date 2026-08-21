const couponPaths = {

  // =========================
  // Customer
  // =========================

  "/api/v1/coupons/apply": {
    post: {
      tags: ["Coupons"],
      summary: "Apply coupon",
      description:
        "Validate a coupon and calculate the discount for an order amount.",

      security: [
        {
          bearerAuth: [],
        },
      ],

      requestBody: {
        required: true,

        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ApplyCouponRequest",
            },
          },
        },
      },

      responses: {
        200: {
          description: "Coupon applied successfully",
        },

        400: {
          description:
            "Coupon inactive, expired, usage limit reached, or minimum order amount not met",
        },

        401: {
          description: "Authentication required",
        },

        403: {
          description: "Only customers can apply coupons",
        },

        404: {
          description: "Invalid coupon code",
        },
      },
    },
  },


  // =========================
  // Admin
  // =========================

  "/api/v1/coupons": {
    post: {
      tags: ["Coupons - Admin"],
      summary: "Create coupon",

      security: [
        {
          bearerAuth: [],
        },
      ],

      requestBody: {
        required: true,

        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CreateCouponRequest",
            },
          },
        },
      },

      responses: {
        201: {
          description: "Coupon created successfully",
        },

        400: {
          description: "Validation error",
        },

        401: {
          description: "Authentication required",
        },

        403: {
          description: "Admin access required",
        },

        409: {
          description: "Coupon with this code already exists",
        },
      },
    },


    get: {
      tags: ["Coupons - Admin"],
      summary: "Get all coupons",

      security: [
        {
          bearerAuth: [],
        },
      ],

      responses: {
        200: {
          description: "Coupons retrieved successfully",
        },

        401: {
          description: "Authentication required",
        },

        403: {
          description: "Admin access required",
        },
      },
    },
  },


  "/api/v1/coupons/{couponId}": {
    get: {
      tags: ["Coupons - Admin"],
      summary: "Get coupon by ID",

      security: [
        {
          bearerAuth: [],
        },
      ],

      parameters: [
        {
          name: "couponId",
          in: "path",
          required: true,

          schema: {
            type: "string",
          },

          example: "66b123456789012345678901",
        },
      ],

      responses: {
        200: {
          description: "Coupon retrieved successfully",
        },

        401: {
          description: "Authentication required",
        },

        403: {
          description: "Admin access required",
        },

        404: {
          description: "Coupon not found",
        },
      },
    },


    patch: {
      tags: ["Coupons - Admin"],
      summary: "Update coupon",

      security: [
        {
          bearerAuth: [],
        },
      ],

      parameters: [
        {
          name: "couponId",
          in: "path",
          required: true,

          schema: {
            type: "string",
          },

          example: "66b123456789012345678901",
        },
      ],

      requestBody: {
        required: true,

        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UpdateCouponRequest",
            },
          },
        },
      },

      responses: {
        200: {
          description: "Coupon updated successfully",
        },

        400: {
          description: "Validation error",
        },

        401: {
          description: "Authentication required",
        },

        403: {
          description: "Admin access required",
        },

        404: {
          description: "Coupon not found",
        },

        409: {
          description: "Coupon with this code already exists",
        },
      },
    },


    delete: {
      tags: ["Coupons - Admin"],
      summary: "Delete coupon",
      description: "Soft deletes a coupon.",

      security: [
        {
          bearerAuth: [],
        },
      ],

      parameters: [
        {
          name: "couponId",
          in: "path",
          required: true,

          schema: {
            type: "string",
          },

          example: "66b123456789012345678901",
        },
      ],

      responses: {
        200: {
          description: "Coupon deleted successfully",
        },

        401: {
          description: "Authentication required",
        },

        403: {
          description: "Admin access required",
        },

        404: {
          description: "Coupon not found",
        },
      },
    },
  },
};


export default couponPaths;