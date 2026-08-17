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

// Categories
"/api/v1/categories": {
  get: {
    tags: ["Categories"],
    summary: "Get all active categories",
    responses: {
      200: {
        description: "Categories retrieved successfully",
      },
    },
  },

post: {
  tags: ["Categories"],
  summary: "Create a new category",

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
          $ref: "#/components/schemas/CreateCategoryRequest",
        },
      },
    },
  },

  responses: {
    201: {
      description: "Category created successfully",
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
      description: "Category name or slug already exists",
    },
  },
},
},

"/api/v1/categories/{categoryId}": {
  get: {
    tags: ["Categories"],
    summary: "Get category by ID",
    parameters: [
      {
        name: "categoryId",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    responses: {
      200: {
        description: "Category retrieved successfully",
      },
      404: {
        description: "Category not found",
      },
    },
  },

patch: {
  tags: ["Categories"],
  summary: "Update category",

  security: [
    {
      bearerAuth: [],
    },
  ],

  parameters: [
      {
        name: "categoryId",
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
            $ref: "#/components/schemas/UpdateCategoryRequest",
          },
        },
      },
    },
    responses: {
      200: {
        description: "Category updated successfully",
      },
      400: {
        description: "Validation error",
      },
      404: {
        description: "Category not found",
      },
      409: {
        description: "Category name or slug already exists",
      },
    },
  },

  delete: {
  tags: ["Categories"],
  summary: "Delete category",

  security: [
    {
      bearerAuth: [],
    },
  ],

  parameters: [
      {
        name: "categoryId",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    responses: {
      200: {
        description: "Category deleted successfully",
      },
      404: {
        description: "Category not found",
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
RequestEmailChange: {
  type: "object",
  required: ["currentPassword", "newEmail"],
  properties: {
    currentPassword: {
      type: "string",
      format: "password",
      example: "NewPassword123!",
    },
    newEmail: {
      type: "string",
      format: "email",
      example: "mohamed.new@example.com",
    },
  },
},

VerifyEmailChangeRequest: {
  type: "object",
  required: ["verificationCode"],
  properties: {
    verificationCode: {
      type: "string",
      example: "393487",
    },
  },
},

ForgotPasswordRequest: {
  type: "object",
  required: ["email"],
  properties: {
    email: {
      type: "string",
      format: "email",
      example: "mohamed.new@example.com",
    },
  },
},

ResetPasswordRequest: {
  type: "object",
  required: [
    "token",
    "newPassword",
    "confirmPassword",
  ],
  properties: {
    token: {
      type: "string",
      example: "TOKEN_FROM_EMAIL",
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

AddAddressRequest: {
  type: "object",
  required: ["street", "city", "country"],
  properties: {
    label: {
      type: "string",
      example: "Home",
    },
    street: {
      type: "string",
      example: "15 El Nasr Street",
    },
    city: {
      type: "string",
      example: "Qena",
    },
    state: {
      type: "string",
      example: "Qena",
    },
    postalCode: {
      type: "string",
      example: "83511",
    },
    country: {
      type: "string",
      example: "Egypt",
    },
    isDefault: {
      type: "boolean",
      example: true,
    },
  },
},

UpdateAddressRequest: {
  type: "object",
  properties: {
    label: {
      type: "string",
      example: "Work",
    },
    street: {
      type: "string",
      example: "20 Nile Street",
    },
    city: {
      type: "string",
      example: "Qena",
    },
    state: {
      type: "string",
      example: "Qena",
    },
    postalCode: {
      type: "string",
      example: "83511",
    },
    country: {
      type: "string",
  
      example: "Egypt",
    },
    isDefault: {
      type: "boolean",
      example: false,
    },
  },
},

CreateCategoryRequest: {
  type: "object",
  required: ["name", "slug"],
  properties: {
    name: {
      type: "string",
      example: "Electronics",
    },
    slug: {
      type: "string",
      example: "electronics",
    },
    description: {
      type: "string",
      example: "Electronic devices and accessories",
    },
    image: {
      type: "string",
      format: "uri",
      example: "https://example.com/electronics.jpg",
    },
    isActive: {
      type: "boolean",
      example: true,
    },
  },
},

UpdateCategoryRequest: {
  type: "object",
  properties: {
    name: {
      type: "string",
      example: "Electronics",
    },
    slug: {
      type: "string",
      example: "electronics",
    },
    description: {
      type: "string",
      example: "Electronic devices and accessories",
    },
    image: {
      type: "string",
      format: "uri",
      example: "https://example.com/electronics.jpg",
    },
    isActive: {
      type: "boolean",
      example: true,
    },
  },
},



  },
},
};

export default swaggerDocument;