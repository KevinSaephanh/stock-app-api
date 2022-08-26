import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";
import { logger } from "../utils/logger";

export const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  logger.error(err);
  return res.status(err.statusCode).json(err.JSON);
};
