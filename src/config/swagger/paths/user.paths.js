const userPaths = {
  "/api/v1/users/me": {
    get: {
      tags: ["Users"],
      summary: "Get current authenticated user",
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: "Current user returned successfully",
        },
        401: {
          description: "Authentication required or invalid token",
        },
      },
    },

    patch: {
      tags: ["Users"],
      summary: "Update current user profile",
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
              $ref: "#/components/schemas/UpdateProfileRequest",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Profile updated successfully",
        },
        400: {
          description: "Validation error",
        },
        401: {
          description: "Authentication required",
        },
        404: {
          description: "User not found",
        },
      },
    },
  },

  "/api/v1/users/me/password": {
    patch: {
      tags: ["Users"],
      summary: "Change current user password",
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
              $ref: "#/components/schemas/ChangePasswordRequest",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Password changed successfully",
        },
        400: {
          description: "Validation error",
        },
        401: {
          description: "Current password is incorrect",
        },
        404: {
          description: "User not found",
        },
      },
    },
  },

  "/api/v1/users/me/email": {
    patch: {
      tags: ["Users"],
      summary: "Request email change",
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
              $ref: "#/components/schemas/RequestEmailChange",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Email change verification code sent",
        },
        400: {
          description: "Validation error",
        },
        401: {
          description: "Current password is incorrect",
        },
        409: {
          description: "Email is already registered",
        },
      },
    },
  },

  "/api/v1/users/me/email/verify": {
    post: {
      tags: ["Users"],
      summary: "Verify new email address",
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
              $ref: "#/components/schemas/VerifyEmailChangeRequest",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Email changed successfully",
        },
        400: {
          description: "Invalid or expired verification code",
        },
        401: {
          description: "Authentication required",
        },
        404: {
          description: "User not found",
        },
        409: {
          description: "Email is already registered",
        },
      },
    },
  },

  "/api/v1/users/me/addresses": {
    get: {
      tags: ["Users"],
      summary: "Get current user addresses",
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: "Addresses retrieved successfully",
        },
        401: {
          description: "Authentication required",
        },
        404: {
          description: "User not found",
        },
      },
    },

    post: {
      tags: ["Users"],
      summary: "Add a new address",
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
              $ref: "#/components/schemas/AddAddressRequest",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Address added successfully",
        },
        400: {
          description: "Validation error",
        },
        401: {
          description: "Authentication required",
        },
        404: {
          description: "User not found",
        },
      },
    },
  },

  "/api/v1/users/me/addresses/{addressId}": {
    patch: {
      tags: ["Users"],
      summary: "Update an address",
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "addressId",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UpdateAddressRequest",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Address updated successfully",
        },
        400: {
          description: "Validation error",
        },
        401: {
          description: "Authentication required",
        },
        404: {
          description: "Address not found",
        },
      },
    },

    delete: {
      tags: ["Users"],
      summary: "Delete an address",
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "addressId",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Address deleted successfully",
        },
        401: {
          description: "Authentication required",
        },
        404: {
          description: "Address not found",
        },
      },
    },
  },

  "/api/v1/users/me/addresses/{addressId}/default": {
    patch: {
      tags: ["Users"],
      summary: "Set an address as default",
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "addressId",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Default address updated successfully",
        },
        401: {
          description: "Authentication required",
        },
        404: {
          description: "Address not found",
        },
      },
    },
  },
};

export default userPaths;