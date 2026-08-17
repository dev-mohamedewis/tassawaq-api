const productSchemas = {
  CreateProductRequest: {
    type: "object",
    required: [
      "name",
      "slug",
      "description",
      "price",
      "stock",
      "category",
    ],
    properties: {
      name: {
        type: "string",
        example: "Samsung Galaxy S24",
      },

      slug: {
        type: "string",
        example: "samsung-galaxy-s24",
      },

      description: {
        type: "string",
        example: "Samsung Galaxy S24 with powerful performance and premium design.",
      },

      price: {
        type: "number",
        minimum: 0,
        example: 35000,
      },

      discountPrice: {
        type: "number",
        minimum: 0,
        nullable: true,
        example: 33000,
      },

      stock: {
        type: "integer",
        minimum: 0,
        example: 10,
      },

      category: {
        type: "string",
        example: "68a123456789012345678901",
      },

      brand: {
        type: "string",
        nullable: true,
        example: "68b123456789012345678901",
      },

      images: {
        type: "array",
        items: {
          type: "string",
          format: "uri",
        },
        example: [
          "https://example.com/products/samsung-s24.jpg",
        ],
      },

      isActive: {
        type: "boolean",
        example: true,
      },
    },
  },


  UpdateProductRequest: {
    type: "object",
    properties: {
      name: {
        type: "string",
        example: "Samsung Galaxy S24 Ultra",
      },

      slug: {
        type: "string",
        example: "samsung-galaxy-s24-ultra",
      },

      description: {
        type: "string",
        example: "Updated product description.",
      },

      price: {
        type: "number",
        minimum: 0,
        example: 40000,
      },

      discountPrice: {
        type: "number",
        minimum: 0,
        nullable: true,
        example: 38000,
      },

      stock: {
        type: "integer",
        minimum: 0,
        example: 15,
      },

      category: {
        type: "string",
        example: "68a123456789012345678901",
      },

      brand: {
        type: "string",
        nullable: true,
        example: "68b123456789012345678901",
      },

      images: {
        type: "array",
        items: {
          type: "string",
          format: "uri",
        },
        example: [
          "https://example.com/products/samsung-s24.jpg",
        ],
      },

      isActive: {
        type: "boolean",
        example: true,
      },
    },
  },
};


export default productSchemas;