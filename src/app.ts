import express from "express";
import config from "./config/config";
import { errorHandler } from "./middleware/errorHandler";
import { logger } from "./utils/logger";
import UserRouter from "./routes/user.routes";
import AuthRouter from "./routes/auth.routes";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.configMiddleware();
    this.configRoutes();
    this.connectToDatabase();
  }

  start() {
    this.app.listen(config.port, () => {
      logger.info(`App listening on the port ${config.port}`);
    });
  }

  private configMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(errorHandler);
  }

  private configRoutes() {
    this.app.use("/users", UserRouter);
    this.app.use("/auth", AuthRouter);
  }

  private connectToDatabase() {}
}

const app = new App();
app.start();
