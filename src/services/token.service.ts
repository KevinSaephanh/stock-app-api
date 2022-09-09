import { Response } from "express";
import { sign, verify } from "jsonwebtoken";
import config from "../config/config";
import { ApiError } from "../utils/apiError";

export const signAccessToken = (id: number) => {
  return sign({ id }, config.auth.accessTokenSecret, {
    expiresIn: config.auth.accessTokenExpiresIn,
  });
};

export const signRefreshToken = (id: number) => {
  return sign({ id }, config.auth.refreshTokenSecret, {
    expiresIn: config.auth.refreshTokenExpiresIn,
  });
};

export const signTokens = (id: number) => {
  const accessToken = signAccessToken(id);
  const refreshToken = signRefreshToken(id);

  return { accessToken, refreshToken };
};

export const setRefreshToken = (token: string, res: Response) => {
  res.cookie("refresh_token", token, {
    httpOnly: true,
    secure: config.env === "production",
    path: "/",
  });
};

export const verifyToken = (token: string, name: "access_token" | "refresh_token") => {
  try {
    let decoded;
    if (name === "access_token") decoded = verify(token, config.auth.accessTokenSecret);
    else decoded = verify(token, config.auth.refreshTokenSecret);
    return decoded;
  } catch (err) {
    throw new ApiError(401, "Unauthorized!");
  }
};

export const createEmailToken = (id: string) => {
  return sign({ id }, config.auth.verifyEmailTokenSecret, {
    expiresIn: config.auth.verifyEmailTokenExpiresIn,
  });
};

export const clearTokens = (res: Response) => {
  res.cookie("access_token", "", { maxAge: 1 });
  res.cookie("refresh_token", "", { maxAge: 1 });
};
