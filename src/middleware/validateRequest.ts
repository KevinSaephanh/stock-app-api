import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import { ApiError } from "../utils/apiError";
import Validators from "../validators";

export const validateRequest =
  (name: string) => async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await (Validators[name as keyof typeof Validators] as Schema).validateAsync(req.body);
      next();
    } catch (err) {
      throw new ApiError(400, err.message);
    }
  };
