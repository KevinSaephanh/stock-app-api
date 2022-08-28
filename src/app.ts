import express from "express";
import config from "./config/config";
import { errorHandler } from "./middleware/errorHandler";
import { logger } from "./utils/logger";
import UserRouter from "./routes/user.routes";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.connectToDatabase();
  }

  start() {
    this.app.listen(config.port, () => {
      logger.info(`App listening on the port ${config.port}`);
    });
  }

  private config() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(errorHandler);
    this.app.use("/users", UserRouter);
  }

  private connectToDatabase() {}
}

const app = new App();
app.start();
