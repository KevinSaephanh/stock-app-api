import { logger } from "../utils/logger";

export class UserService {
  constructor() {}

  async createUser(user: any) {
    try {
      logger.info(`Creating user with data: ${user}`);
    } catch (err) {
      logger.error(new Error(err));
    }
  }

  async getUser(id: string) {
    try {
      logger.info(`Retrieving user with id: ${id}`);
    } catch (err) {
      logger.error(new Error(err));
    }
  }

  async updateUser(id: string, body: any) {
    try {
      logger.info(`Updating user with id: ${id}`);
    } catch (err) {
      logger.error(new Error(err));
    }
  }

  async deleteUser(id: string) {
    try {
      logger.info(`Deleting user with id: ${id}`);
    } catch (err) {
      logger.error(new Error(err));
    }
  }
}
