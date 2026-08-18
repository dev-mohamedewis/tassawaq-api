const cartPaths = {
  "/api/v1/cart": {
    get: {
      tags: ["Cart"],
      summary: "Get current user's cart",
      security: [
        {
          bearerAuth: [],
        },
      ],

      responses: {
        200: {
          description: "Cart retrieved successfully",
        },

        401: {
          description: "Authentication required",
        },

        403: {
          description: "Only customers can access cart",
        },
      },
    },

    delete: {
      tags: ["Cart"],
      summary: "Clear cart",
      security: [
        {
          bearerAuth: [],
        },
      ],

      responses: {
        200: {
          description: "Cart cleared successfully",
        },

        401: {
          description: "Authentication required",
        },

        403: {
          description: "Only customers can clear cart",
        },
      },
    },
  },

  "/api/v1/cart/items": {
    post: {
      tags: ["Cart"],
      summary: "Add product to cart",
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
              $ref: "#/components/schemas/AddToCart",
            },
          },
        },
      },

      responses: {
        200: {
          description: "Product added to cart successfully",
        },

        400: {
          description: "Invalid quantity or insufficient stock",
        },

        401: {
          description: "Authentication required",
        },

        403: {
          description: "Only customers can add products to cart",
        },

        404: {
          description: "Product not found",
        },
      },
    },
  },

  "/api/v1/cart/items/{productId}": {
    patch: {
      tags: ["Cart"],
      summary: "Update cart item quantity",

      security: [
        {
          bearerAuth: [],
        },
      ],

      parameters: [
        {
          name: "productId",
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
              $ref: "#/components/schemas/UpdateCartItem",
            },
          },
        },
      },

      responses: {
        200: {
          description: "Cart item updated successfully",
        },

        400: {
          description: "Invalid quantity or insufficient stock",
        },

        401: {
          description: "Authentication required",
        },

        403: {
          description: "Only customers can update cart",
        },

        404: {
          description: "Product or cart item not found",
        },
      },
    },

    delete: {
      tags: ["Cart"],
      summary: "Remove product from cart",

      security: [
        {
          bearerAuth: [],
        },
      ],

      parameters: [
        {
          name: "productId",
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
          description: "Product removed successfully",
        },

        401: {
          description: "Authentication required",
        },

        403: {
          description: "Only customers can remove cart items",
        },

        404: {
          description: "Product not found in cart",
        },
      },
    },
  },
};

export default cartPaths;