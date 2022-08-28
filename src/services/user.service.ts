import { ApiError } from "../utils/apiError";
import { logger } from "../utils/logger";

export const getUser = async (id: string): Promise<any> => {
  try {
    logger.info(`Retrieving user with id: ${id}`);
    // await User.findById(id).select("-password");
    return "asfasf";
  } catch (err) {
    throw new ApiError(400, err);
  }
};

export const updateUser = async (id: string, body: any): Promise<any> => {
  try {
    console.log(body);
    logger.info(`Updating user with id: ${id}`);
  } catch (err) {
    throw new ApiError(400, err);
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  try {
    logger.info(`Deleting user with id: ${id}`);
  } catch (err) {
    throw new ApiError(400, err);
  }
};
