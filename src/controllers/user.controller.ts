import { NextFunction, Request, Response } from "express";
import * as userService from "../services/user.service";
import { ApiError } from "../utils/apiError";

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.getUser(req.params.id);
    res.status(200).send(user);
  } catch (err) {
    next(new ApiError(400, err));
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(200).send(user);
  } catch (err) {
    next(new ApiError(400, err));
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(new ApiError(400, err));
  }
};
