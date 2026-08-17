const userSchemas = {
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
};

export default userSchemas;