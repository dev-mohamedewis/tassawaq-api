const orderPaths = {
  "/api/v1/orders": {
    post: {
      tags: ["Orders"],
      summary: "Create a new order",
      description:
        "Create an order from the current customer's cart.",
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
              $ref: "#/components/schemas/CreateOrderRequest",
            },
          },
        },
      },

      responses: {
        201: {
          description: "Order created successfully",
        },

        400: {
          description:
            "Cart is empty, validation error, or insufficient stock",
        },

        401: {
          description: "Authentication required",
        },

        403: {
          description: "Only customers can create orders",
        },

        404: {
          description:
            "User, shipping address, or product not found",
        },
      },
    },

    get: {
      tags: ["Orders"],
      summary: "Get current user's orders",
      security: [
        {
          bearerAuth: [],
        },
      ],

      responses: {
        200: {
          description: "Orders retrieved successfully",
        },

        401: {
          description: "Authentication required",
        },

        403: {
          description: "Only customers can access orders",
        },
      },
    },
  },


  "/api/v1/orders/{orderId}": {
    get: {
      tags: ["Orders"],
      summary: "Get order by ID",
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

          example: "66b123456789012345678901",
        },
      ],

      responses: {
        200: {
          description: "Order retrieved successfully",
        },

        401: {
          description: "Authentication required",
        },

        403: {
          description: "Only customers can access orders",
        },

        404: {
          description: "Order not found",
        },
      },
    },
  },


  "/api/v1/orders/{orderId}/cancel": {
    patch: {
      tags: ["Orders"],
      summary: "Cancel order",
      description:
        "Cancel an eligible order and restore the reserved stock.",
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

          example: "66b123456789012345678901",
        },
      ],

      responses: {
        200: {
          description: "Order cancelled successfully",
        },

        400: {
          description: "Order cannot be cancelled",
        },

        401: {
          description: "Authentication required",
        },

        403: {
          description: "Only customers can cancel orders",
        },

        404: {
          description: "Order not found",
        },
      },
    },
  },

  // =========================
  // Admin Orders
  // =========================

  "/api/v1/orders/admin": {
    get: {
      tags: ["Orders - Admin"],
      summary: "Get all orders",

      security: [
        {
          bearerAuth: [],
        },
      ],

      responses: {
        200: {
          description: "Orders retrieved successfully",
        },
        401: {
          description: "Authentication required",
        },
        403: {
          description: "Admin access required",
        },
      },
    },
  },

 "/api/v1/orders/admin/{orderId}": {
  get: {
    tags: ["Orders - Admin"],
    summary: "Get order by ID",

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
        description: "Order retrieved successfully",
      },
      401: {
        description: "Authentication required",
      },
      403: {
        description: "Admin access required",
      },
      404: {
        description: "Order not found",
      },
    },
  },
},

"/api/v1/orders/admin/{orderId}/status": {
  patch: {
    tags: ["Orders - Admin"],
    summary: "Update order status",

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

    requestBody: {
      required: true,

      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/UpdateOrderStatusRequest",
          },
        },
      },
    },

    responses: {
      200: {
        description: "Order status updated successfully",
      },
      400: {
        description: "Order cannot be updated",
      },
      401: {
        description: "Authentication required",
      },
      403: {
        description: "Admin access required",
      },
      404: {
        description: "Order not found",
      },
    },
  },
},

};


export default orderPaths;