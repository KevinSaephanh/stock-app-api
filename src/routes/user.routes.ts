import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import * as express from "express";

export class UserRouter {
  public router: Router;

  private userControler: UserController;

  constructor() {
    this.userControler = new UserController();
    this.router = express.Router();
    this.registerRoutes();
  }

  protected registerRoutes() {
    this.router.post("/", this.userControler.createUser);
    this.router.get("/:id", this.userControler.getUser);
    this.router.put("/:id", this.userControler.updateUser);
    this.router.delete("/:id", this.userControler.deleteUser);
  }
}
