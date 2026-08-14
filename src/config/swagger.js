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
  },

  components: {
  schemas: {
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
  },
},
};

export default swaggerDocument;