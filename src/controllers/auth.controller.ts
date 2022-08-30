import { Request, Response } from "express";
import { LoginRequest } from "../requests/login.request";
import * as authService from "../services/auth.service";

export const signup = async (req: Request, res: Response) => {
  await authService.signup(req.body);
  res.status(201).send();
};

export const login = async (req: Request<LoginRequest>, res: Response) => {
  const response = await authService.login(req.body, res);
  res.status(200).send(response);
};

export const logout = async (req: Request, res: Response) => {
  await authService.logout(req.body);
  res.status(204).send();
};

export const refreshToken = async (req: Request, res: Response) => {
  await authService.refreshToken(req.body);
  res.status(204).send();
};

export const resetPassword = async (req: Request, res: Response) => {
  await authService.resetPassword(req.body);
  res.status(204).send();
};

export const sendVerificationEmail = async (req: Request, res: Response) => {
  await authService.sendVerificationEmail(req.body);
  res.status(204).send();
};

export const verifyEmail = async (req: Request, res: Response) => {
  await authService.verifyEmail(req.body);
  res.status(204).send();
};
