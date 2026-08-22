const adminPaths = {
  "/api/v1/admin/dashboard": {
    get: {
      tags: ["Admin Dashboard"],

      summary: "Get admin dashboard overview",

      description:
        "Returns dashboard statistics, recent orders, low stock products, and top selling products.",

      security: [
        {
          bearerAuth: [],
        },
      ],

      responses: {
        200: {
          description:
            "Dashboard data retrieved successfully",
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


  "/api/v1/admin/dashboard/sales": {
    get: {
      tags: ["Admin Dashboard"],

      summary: "Get sales overview",

      description:
        "Returns monthly order and revenue statistics.",

      security: [
        {
          bearerAuth: [],
        },
      ],

      responses: {
        200: {
          description:
            "Sales data retrieved successfully",
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
};


export default adminPaths;