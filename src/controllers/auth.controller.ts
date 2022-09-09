import { NextFunction, Request, Response } from "express";
import * as authService from "../services/auth.service";
import { ApiError } from "../utils/apiError";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await authService.signup(req.body, next);
    res.status(201).send();
  } catch (err) {
    next(new ApiError(400, err));
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = await authService.login(req.body, res, next);
    res.status(200).send(accessToken);
  } catch (err) {
    next(new ApiError(400, err));
  }
};

export const logout = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    await authService.logout(res);
  } catch (err) {
    next(new ApiError(400, err));
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = await authService.refreshToken(req.body, next);
    res.status(200).send(accessToken);
  } catch (err) {
    next(new ApiError(400, err));
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await authService.resetPassword(req.body, next);
    res.status(204).send();
  } catch (err) {
    next(new ApiError(400, err));
  }
};

export const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await authService.updatePassword(+req.params.id, req.body, next);
    res.status(204).send();
  } catch (err) {
    next(new ApiError(400, err));
  }
};

export const sendEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await authService.sendVerificationEmail(req.body, next);
    res.status(204).send();
  } catch (err) {
    next(new ApiError(400, err));
  }
};

export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await authService.verifyEmail(req.params.token, next);
    res.status(204).send();
  } catch (err) {
    next(new ApiError(400, err));
  }
};
