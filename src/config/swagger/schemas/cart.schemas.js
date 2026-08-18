const cartSchemas = {
  CartItem: {
    type: "object",
    properties: {
      _id: {
        type: "string",
        example: "66b123456789012345678901",
      },

      product: {
        $ref: "#/components/schemas/Product",
      },

      quantity: {
        type: "integer",
        example: 2,
      },

      price: {
        type: "number",
        example: 149.99,
      },

      itemTotal: {
        type: "number",
        example: 299.98,
      },
    },
  },

  Cart: {
    type: "object",
    properties: {
      _id: {
        type: "string",
        example: "66b123456789012345678901",
      },

      user: {
        type: "string",
        example: "66b987654321098765432109",
      },

      items: {
        type: "array",
        items: {
          $ref: "#/components/schemas/CartItem",
        },
      },

      totalItems: {
        type: "integer",
        example: 4,
      },

      totalPrice: {
        type: "number",
        example: 599.96,
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

  AddToCart: {
    type: "object",
    required: ["product", "quantity"],
    properties: {
      product: {
        type: "string",
        example: "66b123456789012345678901",
      },

      quantity: {
        type: "integer",
        minimum: 1,
        example: 2,
      },
    },
  },

  UpdateCartItem: {
    type: "object",
    required: ["quantity"],
    properties: {
      quantity: {
        type: "integer",
        minimum: 1,
        example: 3,
      },
    },
  },
};

export default cartSchemas;