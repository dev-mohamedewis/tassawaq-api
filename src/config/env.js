import "dotenv/config";

const env = {
  port: process.env.PORT || 3000,
  mongodbUri: process.env.MONGODB_URI,
};

export default env;