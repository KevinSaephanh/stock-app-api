import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export const signup = async (req: Request, res: Response) => {
  await authService.signup(req.body);
  res.status(201).send();
};

export const login = async (req: Request, res: Response) => {
  const accessToken = await authService.login(req.body, res);
  res.status(200).send(accessToken);
};

export const logout = async (_req: Request, res: Response) => {
  await authService.logout(res);
};

export const refreshToken = async (req: Request, res: Response) => {
  const accessToken = await authService.refreshToken(req.body);
  res.status(200).send(accessToken);
};

export const resetPassword = async (req: Request, res: Response) => {
  await authService.resetPassword(req.body);
  res.status(204).send();
};

export const updatePassword = async (req: Request, res: Response) => {
  await authService.updatePassword(+req.params.id, req.body);
  res.status(204).send();
};

export const sendEmail = async (req: Request, res: Response) => {
  await authService.sendEmail(req.body);
  res.status(204).send();
};

export const verifyEmail = async (req: Request, res: Response) => {
  await authService.verifyEmail(req.params.token, res);
  res.status(204).send();
};
