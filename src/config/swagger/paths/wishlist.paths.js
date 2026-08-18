const wishlistPaths = {
  "/api/v1/wishlist": {
    get: {
      tags: ["Wishlist"],
      summary: "Get current user's wishlist",
      security: [
        {
          bearerAuth: [],
        },
      ],

      responses: {
        200: {
          description: "Wishlist retrieved successfully",
        },

        401: {
          description: "Authentication required",
        },

        403: {
          description: "Only customers can access wishlist",
        },
      },
    },

    delete: {
      tags: ["Wishlist"],
      summary: "Clear wishlist",
      security: [
        {
          bearerAuth: [],
        },
      ],

      responses: {
        200: {
          description: "Wishlist cleared successfully",
        },

        401: {
          description: "Authentication required",
        },

        403: {
          description: "Only customers can clear wishlist",
        },
      },
    },
  },

  "/api/v1/wishlist/items": {
    post: {
      tags: ["Wishlist"],
      summary: "Add product to wishlist",
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
              $ref: "#/components/schemas/WishlistProductRequest",
            },
          },
        },
      },

      responses: {
        200: {
          description: "Product added to wishlist successfully",
        },

        400: {
          description: "Validation error",
        },

        401: {
          description: "Authentication required",
        },

        403: {
          description: "Only customers can add products to wishlist",
        },

        404: {
          description: "Product not found",
        },

        409: {
          description: "Product already exists in wishlist",
        },
      },
    },

    delete: {
      tags: ["Wishlist"],
      summary: "Remove product from wishlist",
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
              $ref: "#/components/schemas/WishlistProductRequest",
            },
          },
        },
      },

      responses: {
        200: {
          description: "Product removed from wishlist successfully",
        },

        400: {
          description: "Validation error",
        },

        401: {
          description: "Authentication required",
        },

        403: {
          description: "Only customers can remove products from wishlist",
        },

        404: {
          description: "Product not found in wishlist",
        },
      },
    },
  },
};

export default wishlistPaths;