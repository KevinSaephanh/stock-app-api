import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  private readonly authService = new AuthService();

  signup = async (req: Request, res: Response) => {
    await this.authService.signup(req.body);
    res.status(201).send({ message: 'Email has been sent' });
  };

  login = async (req: Request, res: Response) => {
    const accessToken = await this.authService.login(req.body, res);
    res.status(200).send({ accessToken });
  };

  logout = async (_req: Request, res: Response) => {
    await this.authService.logout(res);
    res.status(204).send();
  };

  refreshToken = async (req: Request, res: Response) => {
    const accessToken = await this.authService.refreshToken(req);
    res.status(200).send({ accessToken });
  };

  resetPassword = async (req: Request, res: Response) => {
    const accessToken = await this.authService.resetPassword(req.body);
    res.status(200).send({ accessToken });
  };

  updatePassword = async (req: Request, res: Response) => {
    const updatedUser = await this.authService.updatePassword(req.params.token, req.body.password);
    res.status(200).send(updatedUser);
  };

  sendEmail = async (req: Request, res: Response) => {
    await this.authService.sendVerificationEmail(req.body);
    res.status(200).send();
  };

  verifyEmail = async (req: Request, res: Response) => {
    const accessToken = await this.authService.verifyEmail(req.params.token, req.body, res);
    res.status(200).send({ accessToken });
  };
}
