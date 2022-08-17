import * as express from "express";
import config from "./config/config";
import { routes } from "./routes";
import { logger } from "./utils/logger";

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
    routes(this.app);
  }

  private connectToDatabase() {}
}

const app = new App();
app.start();
