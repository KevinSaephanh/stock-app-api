import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export const signup = async (req: Request, res: Response): Promise<any> => {
  await authService.signup(req.body);
  res.status(201).send();
};

export const login = async (req: Request, res: Response): Promise<any> => {
  const { user, token } = await authService.login(req.body);
  res.status(200).send({ user, token });
};

export const logout = async (req: Request, res: Response): Promise<any> => {
  await authService.logout(req.body);
  res.status(204).send();
};

export const refreshToken = async (req: Request, res: Response): Promise<any> => {
  await authService.refreshToken(req.body);
  res.status(204).send();
};

export const resetPassword = async (req: Request, res: Response): Promise<any> => {
  await authService.resetPassword(req.body);
  res.status(204).send();
};

export const sendVerificationEmail = async (req: Request, res: Response): Promise<any> => {
  await authService.sendVerificationEmail(req.body);
  res.status(204).send();
};

export const verifyEmail = async (req: Request, res: Response): Promise<any> => {
  await authService.verifyEmail(req.body);
  res.status(204).send();
};
