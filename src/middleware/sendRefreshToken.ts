import { Response } from "express";
import config from "../config/config";

export const sendRefreshToken = (refreshToken: string, res: Response) => {
  res.cookie("refresh-token", refreshToken, {
    httpOnly: true,
    secure: config.env === "production",
    path: "/",
  });
};
