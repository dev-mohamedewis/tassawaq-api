const brandSchemas = {
  CreateBrandRequest: {
    type: "object",
    required: ["name", "slug"],
    properties: {
      name: {
        type: "string",
        example: "Samsung",
      },
      slug: {
        type: "string",
        example: "samsung",
      },
      description: {
        type: "string",
        example: "Samsung electronics brand",
      },
      image: {
        type: "string",
        format: "uri",
        example: "https://example.com/samsung.jpg",
      },
      isActive: {
        type: "boolean",
        example: true,
      },
    },
  },

  UpdateBrandRequest: {
    type: "object",
    properties: {
      name: {
        type: "string",
        example: "Samsung",
      },
      slug: {
        type: "string",
        example: "samsung",
      },
      description: {
        type: "string",
        example: "Samsung electronics brand",
      },
      image: {
        type: "string",
        format: "uri",
        example: "https://example.com/samsung.jpg",
      },
      isActive: {
        type: "boolean",
        example: true,
      },
    },
  },
};

export default brandSchemas;