import bcrypt, { hash } from 'bcrypt';
import config from '../config/config';
import { ApiError } from '../utils/apiError';
import { Request, Response } from 'express';
import User from '../models/user.model';
import { TokenService } from './token.service';
import { UserService } from './user.service';
import { MailerService } from './mailer.service';
import { JwtPayload } from 'jsonwebtoken';

export class AuthService {
  private readonly userService = new UserService();
  private readonly tokenService = new TokenService();
  private readonly mailerService = new MailerService();

  signup = async (body: any) => {
    const { username, email, password } = body;
    const emailExists = await User.findOne({ email });
    const usernameExists = await User.findOne({ username });

    if (emailExists || usernameExists) throw new ApiError(400, 'User already exists');

    await User.create({
      username,
      email,
      password,
    });
    await this.sendVerificationEmail({ email });
  };

  login = async (body: any, res: Response) => {
    const { email, password } = body;
    let verifyPassword = false;
    const user = await this.userService.getByEmail(email);

    // Compare passwords is user exists
    if (user) verifyPassword = bcrypt.compareSync(password, user.password);

    if (!user || !verifyPassword) throw new ApiError(400, 'Username and/or password is incorrect');

    if (!user.isActive) throw new ApiError(400, 'Email is not verified!');

    // Create tokens and set
    const { accessToken } = this.tokenService.signTokens(user.id, res);
    return accessToken;
  };

  logout = async (res: Response) => {
    this.tokenService.clearTokens(res);
  };

  refreshToken = async (req: Request) => {
    const refreshToken = req.cookies['refresh_token'];
    const decoded: any = this.tokenService.verifyToken(refreshToken, 'refresh');
    const user = await this.userService.getById(decoded.id);
    const accessToken = this.tokenService.signAccessToken(user.id);
    return accessToken;
  };

  resetPassword = async ({ email }: { email: string }) => {
    const user = await User.findOne({ email });
    if (!user) throw new ApiError(404, `User with email: ${email} does not exist`);
    const token = this.tokenService.createEmailToken(user.id);
    return token;
  };

  updatePassword = async (token: string, password: string) => {
    let { id } = (await this.tokenService.verifyToken(token, 'email')) as JwtPayload;
    const hashedPassword = await hash(password, config.auth.saltRounds);
    return await this.userService.update(id, { password: hashedPassword });
  };

  sendVerificationEmail = async ({ email }: { email: string }) => {
    const user = await this.userService.getByEmail(email);
    const token = this.tokenService.createEmailToken(user.id);
    await this.mailerService.sendVerificationEmail(email, user.username, token);
  };

  verifyEmail = async (token: string, { password }: { password: string }, res: Response) => {
    const user = await this.updatePassword(token, password);
    await this.userService.update(user?.id, { isActive: true });
    const { accessToken } = this.tokenService.signTokens(user?.id, res);
    return accessToken;
  };
}
