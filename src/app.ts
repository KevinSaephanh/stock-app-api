import express from "express";
import config from "./config/config";
import { errorHandler } from "./middleware/errorHandler";
import { logger } from "./utils/logger";
import UserRoutes from "./routes/user.routes";
import AuthRoutes from "./routes/auth.routes";
import { connect } from "./config/db";

const main = async () => {
  const app = express();

  // Connect to db
  await connect();

  // Config middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(errorHandler);

  // Config routes
  app.use("/users", UserRoutes);
  app.use("/auth", AuthRoutes);

  // Start listening
  app.listen(config.port, () => {
    logger.info(`App listening on the port ${config.port}`);
  });
};

main();
