const productPaths = {
  "/api/v1/products": {
    get: {
      tags: ["Products"],
      summary: "Get all products",
      responses: {
        200: {
          description: "Products retrieved successfully",
        },
      },
    },

    post: {
      tags: ["Products"],
      summary: "Create a new product",
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
              $ref: "#/components/schemas/CreateProductRequest",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Product created successfully",
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
          description: "Category or brand not found",
        },
        409: {
          description: "Product with this slug already exists",
        },
      },
    },
  },


  "/api/v1/products/{productId}": {
    get: {
      tags: ["Products"],
      summary: "Get product by ID",
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
          description: "Product retrieved successfully",
        },
        404: {
          description: "Product not found",
        },
      },
    },


    patch: {
      tags: ["Products"],
      summary: "Update product",
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
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UpdateProductRequest",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Product updated successfully",
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
          description: "Product, category, or brand not found",
        },
        409: {
          description: "Product with this slug already exists",
        },
      },
    },


    delete: {
      tags: ["Products"],
      summary: "Delete product",
      description: "Soft deletes a product.",
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
        },
      ],
      responses: {
        200: {
          description: "Product deleted successfully",
        },
        401: {
          description: "Authentication required",
        },
        403: {
          description: "Access denied",
        },
        404: {
          description: "Product not found",
        },
      },
    },
  },
};


export default productPaths;