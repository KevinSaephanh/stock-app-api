import { logger } from "../utils/logger";
import bcrypt from "bcrypt";
import { ApiError } from "../utils/apiError";
import { Request, NextFunction, Response } from "express";
import User from "../models/user.model";
import * as tokenService from "./token.service";
import * as userRepository from "../repositories/user.repository";

export const signup = async (body: any, next: NextFunction) => {
  const { username, email, password } = body;
  const emailExists = await userRepository.getByEmail(email);
  const usernameExists = await userRepository.getByUsername(username);

  if (emailExists || usernameExists) return next(new ApiError(400, "User already exists"));

  const user = new User({
    username,
    email,
    password,
  });
  await user.save();
};

export const login = async (body: any, res: Response, next: NextFunction) => {
  const { email, password } = body;
  let verifyPassword = false;
  const user = await userRepository.getByEmail(email);

  // Compare passwords is user exists
  if (user) verifyPassword = bcrypt.compareSync(password, user.password);

  if (!user || !verifyPassword)
    return next(new ApiError(404, "Username and/or password is incorrect"));

  // Create tokens and set
  const { accessToken, refreshToken } = tokenService.signTokens(user.id);
  tokenService.setRefreshToken(refreshToken, res);

  return { user, accessToken };
};

export const logout = async (res: Response) => {
  try {
    tokenService.clearTokens(res);
  } catch (err) {
    throw new ApiError(400, err);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies["refresh_token"];
  const decoded: any = tokenService.verifyToken(refreshToken, "refresh_token");
  const user = await userRepository.getById(decoded.id);

  if (!user) return next(new ApiError(401, "Unauthenticated!"));

  const accessToken = tokenService.signAccessToken(user.id);
  res.status(200).send(accessToken);
};

export const resetPassword = async (user: any): Promise<any> => {
  try {
    logger.info(`Resetting password for user with ID: ${user.id}`);
  } catch (err) {
    throw new ApiError(400, err);
  }
};

export const sendVerificationEmail = async (user: any): Promise<any> => {
  try {
    logger.info(`Sending verification email for user with ID: ${user.id}`);
  } catch (err) {
    throw new ApiError(400, err);
  }
};

export const verifyEmail = async (user: any): Promise<any> => {
  try {
    logger.info(`Verifying email for user with ID: ${user.id}`);
  } catch (err) {
    throw new ApiError(400, err);
  }
};
