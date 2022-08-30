import { logger } from "../utils/logger";
import bcrypt from "bcrypt";
import { createAccessToken, createRefreshToken } from "../middleware/createToken";
import { ApiError } from "../utils/apiError";
import config from "../config/config";
import { Response } from "express";
import User from "../models/user.model";
import { sendRefreshToken } from "../middleware/sendRefreshToken";

export const signup = async (body: any) => {
  try {
    const { username, email, password } = body;
    const emailExists = await User.findOne({ email });
    const usernameExists = await User.findOne({ username });

    // Throw error is user exists
    if (emailExists || usernameExists) throw new ApiError(400, "User already exists");

    // Hash password
    const hashedPassword = await bcrypt.hash(password, config.auth.saltRounds);

    // Create new user and save
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    User.create(user);
  } catch (err) {
    throw new ApiError(400, err);
  }
};

export const login = async (body: any, res: Response) => {
  try {
    const { email, password } = body;
    let verifyPassword = false;
    const user = await User.findOne({ email });

    // Compare passwords is user exists
    if (user) verifyPassword = bcrypt.compareSync(password, user.password);

    if (!user || !verifyPassword) throw new ApiError(404, "Username and/or password is incorrect");

    // Create tokens
    const accessToken = createAccessToken(user.id);
    const refreshToken = createRefreshToken(user);

    // Create secure cookie with refresh token
    sendRefreshToken(refreshToken, res);

    return { user, accessToken };
  } catch (err) {
    throw new ApiError(400, err);
  }
};

export const logout = async (id: string) => {
  try {
    logger.info(`Deleting user with id: ${id}`);
  } catch (err) {
    throw new ApiError(400, err);
  }
};

export const refreshToken = async (refreshToken: string) => {
  logger.info(`Refreshing token: ${refreshToken}`);
  try {
  } catch (err) {
    throw new ApiError(403, err);
  }
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
