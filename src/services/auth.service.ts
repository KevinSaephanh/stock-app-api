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
  if (!verifyPassword) return next(new ApiError(404, "Username and/or password is incorrect"));

  // Create tokens and set
  const { accessToken, refreshToken } = tokenService.signTokens(user!.id);
  tokenService.setRefreshToken(refreshToken, res);

  return { user, accessToken };
};

export const logout = async (res: Response) => {
  tokenService.clearTokens(res);
};

export const refreshToken = async (req: Request, next: NextFunction) => {
  const refreshToken = req.cookies["refresh_token"];
  const decoded: any = tokenService.verifyToken(refreshToken, "refresh_token");
  const user = await userRepository.getById(decoded.id);

  if (!user) return next(new ApiError(401, "Unauthenticated!"));

  const accessToken = tokenService.signAccessToken(user.id);
  return accessToken;
};

export const resetPassword = async (id: number, next: NextFunction) => {
  try {
    console.log(id);
  } catch (err) {
    return next(new ApiError(400, err));
  }
};

export const updatePassword = async (
  id: number,
  { password }: { password: string },
  next: NextFunction
) => {
  const user = await userRepository.getById(id);

  if (!user) return next(new ApiError(400, `User with id: ${id} not found`));
  else {
    user.password = password;
    await user.save();
  }
};

export const sendVerificationEmail = async (user: any, next: NextFunction) => {
  try {
    logger.info(`Sending verification email for user with ID: ${user.id}`);
  } catch (err) {
    return next(new ApiError(400, err));
  }
};

export const verifyEmail = async (token: string, next: NextFunction) => {
  try {
    console.log(token);
  } catch (err) {
    return next(new ApiError(400, err));
  }
};
