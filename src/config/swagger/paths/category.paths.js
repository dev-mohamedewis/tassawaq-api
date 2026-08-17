const categoryPaths = {
  "/api/v1/categories": {
    get: {
      tags: ["Categories"],
      summary: "Get all categories",
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
          description: "Access denied",
        },
        409: {
          description: "Category already exists",
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
        401: {
          description: "Authentication required",
        },
        403: {
          description: "Access denied",
        },
        404: {
          description: "Category not found",
        },
        409: {
          description: "Category already exists",
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
        401: {
          description: "Authentication required",
        },
        403: {
          description: "Access denied",
        },
        404: {
          description: "Category not found",
        },
      },
    },
  },
};

export default categoryPaths;