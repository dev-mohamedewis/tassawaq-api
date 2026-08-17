const authPaths = {
  "/api/v1/auth/register": {
    post: {
      tags: ["Authentication"],
      summary: "Register a new user",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/RegisterRequest",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Account created successfully",
        },
        400: {
          description: "Validation error",
        },
        409: {
          description: "Email is already registered",
        },
      },
    },
  },

  "/api/v1/auth/verify-email": {
    post: {
      tags: ["Authentication"],
      summary: "Verify user email",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/VerifyEmailRequest",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Email verified successfully",
        },
        400: {
          description: "Invalid or expired verification code",
        },
        404: {
          description: "User not found",
        },
      },
    },
  },

  "/api/v1/auth/login": {
    post: {
      tags: ["Authentication"],
      summary: "Login user",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/LoginRequest",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Login successful",
        },
        400: {
          description: "Validation error",
        },
        401: {
          description: "Invalid email or password",
        },
        403: {
          description: "Email is not verified",
        },
      },
    },
  },

  "/api/v1/auth/forgot-password": {
    post: {
      tags: ["Authentication"],
      summary: "Request password reset",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ForgotPasswordRequest",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Password reset request processed",
        },
        400: {
          description: "Validation error",
        },
      },
    },
  },

  "/api/v1/auth/reset-password": {
    post: {
      tags: ["Authentication"],
      summary: "Reset user password",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ResetPasswordRequest",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Password reset successfully",
        },
        400: {
          description: "Invalid or expired reset token",
        },
      },
    },
  },
};

export default authPaths;