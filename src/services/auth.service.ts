import bcrypt from "bcrypt";
import config from "../config/config";
import { ApiError } from "../utils/apiError";
import { verify } from "jsonwebtoken";
import JwtPayload from "../interfaces/JwtPayload";
import { sendVerificationEmail } from "../utils/sendVerificationEmail";
import { Request, Response } from "express";
import * as tokenService from "./token.service";
import * as userService from "./user.service";
import User from "../models/user.model";

export const signup = async (body: any) => {
  const { username, email, password } = body;
  const emailExists = await User.findOne({ email });
  const usernameExists = await User.findOne({ username });

  if (emailExists || usernameExists) throw new ApiError(400, "User already exists");

  const user = new User({
    username,
    email,
    password,
  });
  await user.save();
};

export const login = async (body: any, res: Response) => {
  const { email, password } = body;
  let verifyPassword = false;
  const user = await userService.getByEmail(email);

  // Compare passwords is user exists
  if (user) verifyPassword = bcrypt.compareSync(password, user.password);

  if (!user || !verifyPassword) throw new ApiError(400, "Username and/or password is incorrect");

  if (!user.isActive) throw new ApiError(400, "Email is not verified!");

  // Create tokens and set
  const { accessToken, refreshToken } = tokenService.signTokens(user.id);
  tokenService.setRefreshToken(refreshToken, res);
  return accessToken;
};

export const logout = async (res: Response) => {
  tokenService.clearTokens(res);
};

export const refreshToken = async (req: Request) => {
  const refreshToken = req.cookies["refresh_token"];
  const decoded: any = tokenService.verifyToken(refreshToken, "refresh_token");
  const user = await userService.getById(decoded.id);
  const accessToken = tokenService.signAccessToken(user.id);
  return accessToken;
};

export const resetPassword = async (id: number) => {
  console.log(id);
  // Send email with token in params
};

export const updatePassword = async (id: number, body: any) => {
  const { token, password } = body;
  console.log(token, password, id);
  // Validate token and set new password
};

export const sendEmail = async (body: any) => {
  const { email, id } = body;
  const token = tokenService.createEmailToken(id);
  await sendVerificationEmail({ token, to: email });
};

export const verifyEmail = async (token: string, res: Response) => {
  const { id } = verify(token, config.auth.verifyEmailTokenSecret) as JwtPayload;
  const user = await userService.getById(id);

  user.isActive = true;
  await user.save();

  // Create tokens and set
  const { accessToken, refreshToken } = tokenService.signTokens(user.id);
  tokenService.setRefreshToken(refreshToken, res);

  return accessToken;
};
