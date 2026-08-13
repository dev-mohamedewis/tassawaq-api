import app from "./app.js";
import env from "./config/env.js";
import connectDatabase from "./database/connection.js";

const startServer = async () => {
  await connectDatabase();

  app.listen(env.port, () => {
    console.log(`Tassawaq API is running on port ${env.port}`);
  });
};

startServer();