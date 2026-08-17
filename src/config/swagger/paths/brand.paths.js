const brandPaths = {
  "/api/v1/brands": {
    get: {
      tags: ["Brands"],
      summary: "Get all brands",
      responses: {
        200: {
          description: "Brands retrieved successfully",
        },
      },
    },

    post: {
      tags: ["Brands"],
      summary: "Create a new brand",
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
              $ref: "#/components/schemas/CreateBrandRequest",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Brand created successfully",
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
          description: "Brand already exists",
        },
      },
    },
  },

  "/api/v1/brands/{brandId}": {
    get: {
      tags: ["Brands"],
      summary: "Get brand by ID",
      parameters: [
        {
          name: "brandId",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Brand retrieved successfully",
        },
        404: {
          description: "Brand not found",
        },
      },
    },

    patch: {
      tags: ["Brands"],
      summary: "Update brand",
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "brandId",
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
              $ref: "#/components/schemas/UpdateBrandRequest",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Brand updated successfully",
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
          description: "Brand not found",
        },
        409: {
          description: "Brand already exists",
        },
      },
    },

    delete: {
      tags: ["Brands"],
      summary: "Delete brand",
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "brandId",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Brand deleted successfully",
        },
        401: {
          description: "Authentication required",
        },
        403: {
          description: "Access denied",
        },
        404: {
          description: "Brand not found",
        },
      },
    },
  },
};

export default brandPaths;