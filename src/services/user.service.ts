import { User } from "src/models/user.model";
import { ApiError } from "src/utils/apiError";
import { logger } from "../utils/logger";

export class UserService {
  constructor() {}

  async getUser(id: string): Promise<any> {
    try {
      logger.info(`Retrieving user with id: ${id}`);
      // await User.findById(id).select("-password");
    } catch (err) {
      throw new ApiError(400, err);
    }
  }

  async updateUser(id: string, body: any): Promise<any> {
    try {
      logger.info(`Updating user with id: ${id}`);
    } catch (err) {
      throw new ApiError(400, err);
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      logger.info(`Deleting user with id: ${id}`);
    } catch (err) {
      throw new ApiError(400, err);
    }
  }
}
