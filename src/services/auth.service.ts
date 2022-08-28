import { logger } from "../utils/logger";
import bcrypt from "bcrypt";
import { SignupRequest } from "../requests/signup.request";
import { createAccessToken } from "../middleware/createToken";
import { User } from "../models/user.model";
import { LoginRequest } from "../requests/login.request";
import { LoginResponse } from "../responses/login.response";
import { ApiError } from "../utils/apiError";
import config from "../config/config";

export const signup = async (body: SignupRequest): Promise<void> => {
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

export const login = async (body: LoginRequest): Promise<LoginResponse> => {
  try {
    const { email, password } = body;
    let verifyPassword = false;
    const user = await User.findOne({ email });

    // Compare passwords is user exists
    if (user) verifyPassword = bcrypt.compareSync(password, user.password);

    if (!user || !verifyPassword) throw new ApiError(404, "Username and/or password is incorrect");

    const token = createAccessToken(user.id);
    return {
      user,
      token,
    };
  } catch (err) {
    throw new ApiError(400, err);
  }
};

export const logout = async (id: string): Promise<void> => {
  try {
    logger.info(`Deleting user with id: ${id}`);
  } catch (err) {
    throw new ApiError(400, err);
  }
};

export const refreshToken = async (refreshToken: string): Promise<any> => {
  logger.info(`Refreshing token: ${refreshToken}`);
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
