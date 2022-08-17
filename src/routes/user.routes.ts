import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import * as express from "express";

export class UserRouter {
  public router: Router;

  private userController: UserController;

  constructor() {
    this.userController = new UserController();
    this.router = express.Router();
    this.registerRoutes();
  }

  protected registerRoutes() {
    this.router.get("/:id", this.userController.getUser);
    this.router.put("/:id", this.userController.updateUser);
    this.router.delete("/:id", this.userController.deleteUser);
  }
}
