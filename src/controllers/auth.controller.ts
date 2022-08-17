import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async signup(req: Request, res: Response, next: NextFunction): Promise<any> {
    return this.authService.signup(req.body);
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<any> {
    return this.authService.login(req.body);
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<any> {
    return this.authService.logout(req.body);
  }

  async refreshToken(req: Request, res: Response, next: NextFunction): Promise<any> {
    return this.authService.refreshToken(req.body);
  }

  async resetPassword(req: Request, res: Response, next: NextFunction): Promise<any> {
    return this.authService.resetPassword(req.body);
  }

  async sendVerificationEmail(req: Request, res: Response, next: NextFunction): Promise<any> {
    return this.authService.sendVerificationEmail(req.body);
  }

  async verifyEmail(req: Request, res: Response, next: NextFunction): Promise<any> {
    return this.authService.verifyEmail(req.body);
  }
}
