const paymentSchemas = {
  CreatePaymentIntentRequest: {
    type: "object",
    required: ["orderId"],

    properties: {
      orderId: {
        type: "string",
        example: "66b123456789012345678901",
      },
    },
  },


  CreateCODPaymentRequest: {
    type: "object",
    required: ["orderId"],

    properties: {
      orderId: {
        type: "string",
        example: "66b123456789012345678901",
      },
    },
  },


  Payment: {
    type: "object",

    properties: {
      _id: {
        type: "string",
      },

      order: {
        type: "string",
      },

      user: {
        type: "string",
      },

      amount: {
        type: "number",
      },

      currency: {
        type: "string",
        example: "egp",
      },

      method: {
        type: "string",
        enum: [
          "cash_on_delivery",
          "card",
        ],
      },

      status: {
        type: "string",
        enum: [
          "pending",
          "processing",
          "paid",
          "failed",
          "refunded",
          "partially_refunded",
          "cancelled",
        ],
      },

      stripePaymentIntentId: {
        type: "string",
        nullable: true,
      },

      paidAt: {
        type: "string",
        format: "date-time",
        nullable: true,
      },

      refundedAt: {
        type: "string",
        format: "date-time",
        nullable: true,
      },

      failureReason: {
        type: "string",
        nullable: true,
      },

      refundAmount: {
        type: "number",
      },
    },
  },
};


export default paymentSchemas;