const categorySchemas = {
  CreateCategoryRequest: {
    type: "object",
    required: ["name", "slug"],
    properties: {
      name: {
        type: "string",
        example: "Electronics",
      },
      slug: {
        type: "string",
        example: "electronics",
      },
      description: {
        type: "string",
        example: "Electronic devices and accessories",
      },
      image: {
        type: "string",
        format: "uri",
        example: "https://example.com/electronics.jpg",
      },
      isActive: {
        type: "boolean",
        example: true,
      },
    },
  },

  UpdateCategoryRequest: {
    type: "object",
    properties: {
      name: {
        type: "string",
        example: "Electronics",
      },
      slug: {
        type: "string",
        example: "electronics",
      },
      description: {
        type: "string",
        example: "Electronic devices and accessories",
      },
      image: {
        type: "string",
        format: "uri",
        example: "https://example.com/electronics.jpg",
      },
      isActive: {
        type: "boolean",
        example: true,
      },
    },
  },
};

export default categorySchemas;