const authSchemas = {
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
};

export default authSchemas;