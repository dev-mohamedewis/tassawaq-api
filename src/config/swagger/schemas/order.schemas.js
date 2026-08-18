const orderSchemas = {
  CreateOrderRequest: {
    type: "object",

    required: [
      "addressId",
      "paymentMethod",
    ],

    properties: {
      addressId: {
        type: "string",
        description:
          "ID of an existing address belonging to the current customer",

        example:
          "66b123456789012345678901",
      },

      paymentMethod: {
        type: "string",

        enum: [
          "cash_on_delivery",
          "card",
        ],

        example: "cash_on_delivery",
      },
    },
  },

UpdateOrderStatusRequest: {
  type: "object",

  required: ["status"],

  properties: {
    status: {
      type: "string",

      enum: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],

      example: "processing",
    },
  },
},
};
        

export default orderSchemas;