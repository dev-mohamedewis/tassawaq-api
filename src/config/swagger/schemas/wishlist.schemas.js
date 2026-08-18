const wishlistSchemas = {
  WishlistProductRequest: {
    type: "object",
    required: ["productId"],

    properties: {
      productId: {
        type: "string",
        example: "66b123456789012345678901",
      },
    },
  },
};

export default wishlistSchemas;