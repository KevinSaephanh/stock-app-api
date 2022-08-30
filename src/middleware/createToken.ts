import { sign } from "jsonwebtoken";
import config from "../config/config";

export const createAccessToken = (userId: string) => {
  return sign({ userId }, config.auth.accessTokenSecret, {
    expiresIn: config.auth.accessTokenExpiresIn,
  });
};

export const createRefreshToken = (user: any) => {
  return sign(
    { userId: user.userId, tokenVersion: user.tokenVersion },
    config.auth.refreshTokenSecret,
    {
      expiresIn: config.auth.refreshTokenExpiresIn,
    }
  );
};
