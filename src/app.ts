import * as express from "express";

export class App {
  public app: express.Application;
  private router: express.Router;

  constructor() {
    this.app = express();
    this.router = express.Router();
    this.config();
  }

  private config() {}

  private configureMiddleware() {}
}
