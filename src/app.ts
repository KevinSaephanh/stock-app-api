import express from "express";
import config from "./config/config";
import { errorHandler } from "./middleware/errorHandler";
import { logger } from "./utils/logger";
import UserRoutes from "./routes/user.routes";
import AuthRoutes from "./routes/auth.routes";
import { ApiError } from "./utils/apiError";
import mongoose from "mongoose";

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
    this.app.use("/users", UserRoutes);
    this.app.use("/auth", AuthRoutes);
  }

  private async connectToDatabase() {
    try {
      const conn = await mongoose.connect(config.mongoose.url);
      logger.info(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
      throw new ApiError(400, err.message);
    }
  }
}

const app = new App();
app.start();
