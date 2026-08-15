const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Tassawaq API",
    version: "1.0.0",
    description: "E-Commerce REST API",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  paths: {
    // register operation
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
 // verify email
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
// login operation
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

// Users
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


  },

  components: {
     // security schemas
 securitySchemes: {
  bearerAuth: {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
  },
},

  schemas: {
    UpdateProfileRequest: {
  type: "object",
  properties: {
    firstName: {
      type: "string",
      example: "Mohamed",
    },
    lastName: {
      type: "string",
      example: "Ewis",
    },
    phone: {
      type: "string",
      example: "01111111111",
    },
    profileImage: {
      type: "string",
      format: "uri",
      example: "https://example.com/profile.jpg",
    },
  },
},

ChangePasswordRequest: {
  type: "object",
  required: [
    "currentPassword",
    "newPassword",
    "confirmPassword",
  ],
  properties: {
    currentPassword: {
      type: "string",
      format: "password",
      example: "12345678",
    },
    newPassword: {
      type: "string",
      format: "password",
      example: "NewPassword123!",
    },
    confirmPassword: {
      type: "string",
      format: "password",
      example: "NewPassword123!",
    },
  },
},
    // request schemas
    RegisterRequest: {
      type: "object",
      required: [
        "firstName",
        "lastName",
        "email",
        "password",
        "phone",
      ],
      properties: {
        firstName: {
          type: "string",
          example: "Mohamed",
        },
        lastName: {
          type: "string",
          example: "Ewis",
        },
        email: {
          type: "string",
          format: "email",
          example: "mohamed@example.com",
        },
        password: {
          type: "string",
          format: "password",
          example: "12345678",
        },
        phone: {
          type: "string",
          example: "01000000000",
        },
      },
    },
// verify email
    VerifyEmailRequest: {
  type: "object",
  required: ["email", "verificationCode"],
  properties: {
    email: {
      type: "string",
      format: "email",
      example: "mohamed.tst@example.com",
    },
    verificationCode: {
      type: "string",
      example: "393487",
    },
  },
},
// login request 
LoginRequest: {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: {
      type: "string",
      format: "email",
      example: "mohamed.tst@example.com",
    },
    password: {
      type: "string",
      format: "password",
      example: "12345678",
    },
  },
},


  },
},
};

export default swaggerDocument;