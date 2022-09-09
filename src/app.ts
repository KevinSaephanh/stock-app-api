import express from "express";
import config from "./config/config";
import { errorHandler } from "./middleware/errorHandler";
import { logger } from "./utils/logger";
import { connect } from "./config/db";
import routes from "./routes";

const main = async () => {
  const app = express();

  // Connect to db
  await connect();

  // Config middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(errorHandler);

  // Config routes
  app.use("/api/v1", routes);

  // Start listening
  app.listen(config.port, () => {
    logger.info(`App listening on the port ${config.port}`);
  });
};

main();
