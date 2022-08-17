import { logger } from "../utils/logger";

export class AuthService {
  constructor() {}

  async signup(body: any): Promise<void> {
    try {
    } catch (err) {
      logger.error(new Error(err));
    }
  }

  async login(body: any): Promise<any> {
    try {
    } catch (err) {
      logger.error(new Error(err));
    }
  }

  async logout(id: string): Promise<void> {
    try {
      logger.info(`Deleting user with id: ${id}`);
    } catch (err) {
      logger.error(new Error(err));
    }
  }

  async refreshToken(refreshToken: string): Promise<any> {
    logger.info(`Refreshing token: ${refreshToken}`);
  }

  async resetPassword(user: any): Promise<any> {
    try {
      logger.info(`Resetting password for user with ID: ${user.id}`);
    } catch (err) {
      logger.error(new Error(err));
    }
  }

  async sendVerificationEmail(user: any): Promise<any> {
    try {
      logger.info(`Sending verification email for user with ID: ${user.id}`);
    } catch (err) {
      logger.error(new Error(err));
    }
  }

  async verifyEmail(user: any): Promise<any> {
    try {
      logger.info(`Verifying email for user with ID: ${user.id}`);
    } catch (err) {
      logger.error(new Error(err));
    }
  }
}
