import mongoose from "mongoose";
import { ApiError } from "../utils/apiError";
import { logger } from "../utils/logger";
import config from "./config";

export const connect = async () => {
  try {
    await mongoose.connect(config.mongoose.url);
    logger.info("Connected to MongoDB");
  } catch (err) {
    throw new ApiError(400, err.message);
  }
};
