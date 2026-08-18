const reviewPaths = {
  "/api/v1/reviews/product/{productId}": {
    get: {
      tags: ["Reviews"],
      summary: "Get all reviews for a product",

      parameters: [
        {
          name: "productId",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],

      responses: {
        200: {
          description: "Product reviews retrieved successfully",
        },

        404: {
          description: "Product not found",
        },
      },
    },
  },


  "/api/v1/reviews/{reviewId}": {
    get: {
      tags: ["Reviews"],
      summary: "Get review by ID",

      parameters: [
        {
          name: "reviewId",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],

      responses: {
        200: {
          description: "Review retrieved successfully",
        },

        404: {
          description: "Review not found",
        },
      },
    },


    patch: {
      tags: ["Reviews"],
      summary: "Update own review",

      security: [
        {
          bearerAuth: [],
        },
      ],

      parameters: [
        {
          name: "reviewId",
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
              $ref: "#/components/schemas/UpdateReviewRequest",
            },
          },
        },
      },

      responses: {
        200: {
          description: "Review updated successfully",
        },

        400: {
          description: "Validation error",
        },

        401: {
          description: "Authentication required",
        },

        404: {
          description: "Review not found",
        },
      },
    },


    delete: {
      tags: ["Reviews"],
      summary: "Delete own review",

      security: [
        {
          bearerAuth: [],
        },
      ],

      parameters: [
        {
          name: "reviewId",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],

      responses: {
        200: {
          description: "Review deleted successfully",
        },

        401: {
          description: "Authentication required",
        },

        404: {
          description: "Review not found",
        },
      },
    },
  },


  "/api/v1/reviews": {
    post: {
      tags: ["Reviews"],
      summary: "Create a product review",

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
              $ref: "#/components/schemas/CreateReviewRequest",
            },
          },
        },
      },

      responses: {
        201: {
          description: "Review created successfully",
        },

        400: {
          description: "Validation error",
        },

        401: {
          description: "Authentication required",
        },

        404: {
          description: "Product not found",
        },

        409: {
          description: "You have already reviewed this product",
        },
      },
    },
  },
};

export default reviewPaths;