import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async signup(req: Request, res: Response): Promise<any> {
    await this.authService.signup(req.body);
    res.status(201).send();
  }

  async login(req: Request, res: Response): Promise<any> {
    const { user, token } = await this.authService.login(req.body);
    res.status(200).send({ user, token });
  }

  async logout(req: Request, res: Response): Promise<any> {
    await this.authService.logout(req.body);
    res.status(204).send();
  }

  async refreshToken(req: Request, res: Response): Promise<any> {
    await this.authService.refreshToken(req.body);
    res.status(204).send();
  }

  async resetPassword(req: Request, res: Response): Promise<any> {
    await this.authService.resetPassword(req.body);
    res.status(204).send();
  }

  async sendVerificationEmail(req: Request, res: Response): Promise<any> {
    await this.authService.sendVerificationEmail(req.body);
    res.status(204).send();
  }

  async verifyEmail(req: Request, res: Response): Promise<any> {
    await this.authService.verifyEmail(req.body);
    res.status(204).send();
  }
}
