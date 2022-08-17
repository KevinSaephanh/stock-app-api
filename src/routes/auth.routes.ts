import { Router } from "express";
import * as express from "express";
import { AuthController } from "../controllers/auth.controller";

export class AuthRouter {
  public router: Router;

  private authController: AuthController;

  constructor() {
    this.authController = new AuthController();
    this.router = express.Router();
    this.registerRoutes();
  }

  protected registerRoutes() {
    this.router.get("/signup", this.authController.signup);
    this.router.put("/login", this.authController.login);
    this.router.delete("/logout", this.authController.logout);
    this.router.get("/refresh-token", this.authController.refreshToken);
    this.router.put("/reset-password", this.authController.resetPassword);
    this.router.delete("/send-verification-email", this.authController.sendVerificationEmail);
    this.router.delete("/verify-email", this.authController.verifyEmail);
  }
}
