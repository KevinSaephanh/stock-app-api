import { User } from "src/models/user.model";
import { logger } from "../utils/logger";
import bcrypt from "bcrypt";
import config from "src/config/config";
import { SignupRequest } from "../requests/signup.request";
import { LoginRequest } from "src/requests/login.request";
import { ApiError } from "src/utils/apiError";
import { createAccessToken } from "src/middleware/createToken";
import { LoginResponse } from "src/responses/login.response";

export class AuthService {
  constructor() {}

  async signup(body: SignupRequest): Promise<void> {
    try {
      const { username, email, password } = body;
      const emailExists = await User.findOne({ email });
      const usernameExists = await User.findOne({ username });

      // Throw error is user exists
      if (emailExists || usernameExists) throw new ApiError(400, "User already exists");

      // Hash password
      const hashedPassword = await bcrypt.hash(password, config.auth.saltRounds);

      // Create new user and save
      const user = new User({
        username,
        email,
        password: hashedPassword,
      });
      User.create(user);
    } catch (err) {
      throw new ApiError(400, err);
    }
  }

  async login(body: LoginRequest): Promise<LoginResponse> {
    try {
      const { email, password } = body;
      let verifyPassword = false;
      const user = await User.findOne({ email });

      // Compare passwords is user exists
      if (user) verifyPassword = bcrypt.compareSync(password, user.password);

      if (!user || !verifyPassword)
        throw new ApiError(404, "Username and/or password is incorrect");

      const token = createAccessToken(user.id);
      return {
        user,
        token,
      };
    } catch (err) {
      throw new ApiError(400, err);
    }
  }

  async logout(id: string): Promise<void> {
    try {
      logger.info(`Deleting user with id: ${id}`);
    } catch (err) {
      throw new ApiError(400, err);
    }
  }

  async refreshToken(refreshToken: string): Promise<any> {
    logger.info(`Refreshing token: ${refreshToken}`);
  }

  async resetPassword(user: any): Promise<any> {
    try {
      logger.info(`Resetting password for user with ID: ${user.id}`);
    } catch (err) {
      throw new ApiError(400, err);
    }
  }

  async sendVerificationEmail(user: any): Promise<any> {
    try {
      logger.info(`Sending verification email for user with ID: ${user.id}`);
    } catch (err) {
      throw new ApiError(400, err);
    }
  }

  async verifyEmail(user: any): Promise<any> {
    try {
      logger.info(`Verifying email for user with ID: ${user.id}`);
    } catch (err) {
      throw new ApiError(400, err);
    }
  }
}
