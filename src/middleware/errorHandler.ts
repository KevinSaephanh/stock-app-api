import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";
import { logger } from "../utils/logger";

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(`Encountered error: ${err}`);
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json(err.JSON);
  } else {
    return res.status(500).send(`Internal Service Error: ${err.toString()}`);
  }
};
