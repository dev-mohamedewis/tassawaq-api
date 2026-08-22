const paymentPaths = {

  "/api/v1/payments/create-intent": {
    post: {
      tags: ["Payments"],
      summary: "Create Stripe PaymentIntent",

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
              $ref:
                "#/components/schemas/CreatePaymentIntentRequest",
            },
          },
        },
      },

      responses: {
        201: {
          description:
            "PaymentIntent created successfully",
        },

        400: {
          description:
            "Invalid order or payment method",
        },

        401: {
          description:
            "Authentication required",
        },

        403: {
          description:
            "Only customers can create payments",
        },

        404: {
          description:
            "Order not found",
        },
      },
    },
  },


  "/api/v1/payments/cash-on-delivery": {
    post: {
      tags: ["Payments"],
      summary: "Create cash on delivery payment",

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
              $ref:
                "#/components/schemas/CreateCODPaymentRequest",
            },
          },
        },
      },

      responses: {
        201: {
          description:
            "COD payment created successfully",
        },

        400: {
          description:
            "Invalid order or payment method",
        },

        401: {
          description:
            "Authentication required",
        },

        403: {
          description:
            "Only customers can create payments",
        },

        404: {
          description:
            "Order not found",
        },
      },
    },
  },


  "/api/v1/payments": {
    get: {
      tags: ["Payments"],
      summary: "Get current user's payments",

      security: [
        {
          bearerAuth: [],
        },
      ],

      responses: {
        200: {
          description:
            "Payments retrieved successfully",
        },

        401: {
          description:
            "Authentication required",
        },

        403: {
          description:
            "Only customers can access payments",
        },
      },
    },
  },


  "/api/v1/payments/order/{orderId}": {
    get: {
      tags: ["Payments"],
      summary: "Get payment for an order",

      security: [
        {
          bearerAuth: [],
        },
      ],

      parameters: [
        {
          name: "orderId",
          in: "path",
          required: true,

          schema: {
            type: "string",
          },
        },
      ],

      responses: {
        200: {
          description:
            "Payment retrieved successfully",
        },

        401: {
          description:
            "Authentication required",
        },

        403: {
          description:
            "Only customers can access payments",
        },

        404: {
          description:
            "Order or payment not found",
        },
      },
    },
  },


  "/api/v1/payments/{paymentId}": {
    get: {
      tags: ["Payments"],
      summary: "Get payment by ID",

      security: [
        {
          bearerAuth: [],
        },
      ],

      parameters: [
        {
          name: "paymentId",
          in: "path",
          required: true,

          schema: {
            type: "string",
          },
        },
      ],

      responses: {
        200: {
          description:
            "Payment retrieved successfully",
        },

        401: {
          description:
            "Authentication required",
        },

        403: {
          description:
            "Only customers can access payments",
        },

        404: {
          description:
            "Payment not found",
        },
      },
    },
  },


  "/api/v1/payments/admin": {
    get: {
      tags: ["Payments - Admin"],
      summary: "Get all payments",

      security: [
        {
          bearerAuth: [],
        },
      ],

      responses: {
        200: {
          description:
            "Payments retrieved successfully",
        },

        401: {
          description:
            "Authentication required",
        },

        403: {
          description:
            "Admin access required",
        },
      },
    },
  },


  "/api/v1/payments/admin/{paymentId}": {
    get: {
      tags: ["Payments - Admin"],
      summary: "Get payment by ID",

      security: [
        {
          bearerAuth: [],
        },
      ],

      parameters: [
        {
          name: "paymentId",
          in: "path",
          required: true,

          schema: {
            type: "string",
          },
        },
      ],

      responses: {
        200: {
          description:
            "Payment retrieved successfully",
        },

        401: {
          description:
            "Authentication required",
        },

        403: {
          description:
            "Admin access required",
        },

        404: {
          description:
            "Payment not found",
        },
      },
    },
  },


  "/api/v1/payments/admin/{paymentId}/refund": {
    post: {
      tags: ["Payments - Admin"],
      summary: "Refund a payment",

      security: [
        {
          bearerAuth: [],
        },
      ],

      parameters: [
        {
          name: "paymentId",
          in: "path",
          required: true,

          schema: {
            type: "string",
          },
        },
      ],

      responses: {
        200: {
          description:
            "Payment refunded successfully",
        },

        400: {
          description:
            "Payment cannot be refunded",
        },

        401: {
          description:
            "Authentication required",
        },

        403: {
          description:
            "Admin access required",
        },

        404: {
          description:
            "Payment not found",
        },
      },
    },
  },


  "/api/v1/payments/webhook": {
    post: {
      tags: ["Payments"],
      summary: "Stripe webhook",

      description:
        "Receives Stripe payment events. This endpoint is not protected by JWT.",

      responses: {
        200: {
          description:
            "Webhook received successfully",
        },

        400: {
          description:
            "Invalid webhook signature",
        },
      },
    },
  },

};


export default paymentPaths;