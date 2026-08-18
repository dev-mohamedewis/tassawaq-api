const reviewSchemas = {
  CreateReviewRequest: {
    type: "object",
    required: ["product", "rating"],
    properties: {
      product: {
        type: "string",
        example: "68a123456789012345678901",
      },

      rating: {
        type: "integer",
        minimum: 1,
        maximum: 5,
        example: 5,
      },

      comment: {
        type: "string",
        example: "Excellent product and very good quality.",
      },
    },
  },

  UpdateReviewRequest: {
    type: "object",
    properties: {
      rating: {
        type: "integer",
        minimum: 1,
        maximum: 5,
        example: 4,
      },

      comment: {
        type: "string",
        example: "Updated review.",
      },
    },
  },
};

export default reviewSchemas;