import { NextFunction, Request, Response } from "express";
import * as authService from "../services/auth.service";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  await authService.signup(req.body, next);
  res.status(201).send();
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const response = await authService.login(req.body, res, next);
  res.status(200).send(response);
};

export const logout = async (_req: Request, res: Response, next: NextFunction) => {
  await authService.logout(res);
  res.status(204).send();
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = await authService.refreshToken(req, next);
  res.status(200).send(accessToken);
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  await authService.resetPassword(req.body);
  res.status(204).send();
};

export const sendVerificationEmail = async (req: Request, res: Response, next: NextFunction) => {
  await authService.sendVerificationEmail(req.body);
  res.status(204).send();
};

export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  await authService.verifyEmail(req.body);
  res.status(204).send();
};
