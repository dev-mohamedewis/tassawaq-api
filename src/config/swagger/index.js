import authSchemas from "./schemas/auth.schemas.js";
import userSchemas from "./schemas/user.schemas.js";
import categorySchemas from "./schemas/category.schemas.js";
import brandSchemas from "./schemas/brand.schemas.js";
import productPaths from "./paths/products.paths.js";
import reviewPaths from "./paths/reviews.paths.js";
import cartPaths from "./paths/cart.paths.js";

import authPaths from "./paths/auth.paths.js";
import userPaths from "./paths/user.paths.js";
import categoryPaths from "./paths/category.paths.js";
import brandPaths from "./paths/brand.paths.js";
import productSchemas from "./schemas/products.schemas.js";
import reviewSchemas from "./schemas/reviews.schemas.js";
import cartSchemas from "./schemas/cart.schemas.js";

const swaggerDocument = {
  openapi: "3.0.0",

  info: {
    title: "Tassawaq API",
    version: "1.0.0",
    description: "Tassawaq E-Commerce REST API",
  },

  servers: [
    {
      url: "http://localhost:3000",
      description: "Local development server",
    },
  ],

  paths: {
    ...authPaths,
    ...userPaths,
    ...categoryPaths,
    ...brandPaths,
    ...productPaths,
    ...reviewPaths,
    ...cartPaths,
  },

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },

    schemas: {
      ...authSchemas,
      ...userSchemas,
      ...categorySchemas,
      ...brandSchemas,
      ...productSchemas,
      ...reviewSchemas,
      ...cartSchemas,
    },
  },
};

export default swaggerDocument;