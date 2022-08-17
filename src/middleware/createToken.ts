import { sign } from "jsonwebtoken";
import config from "../config/config";

export const createAccessToken = (user: any) => {
  return sign({ userId: user.id }, config.auth.accessTokenSecret, {
    expiresIn: config.auth.accessTokenExpiresIn,
  });
};

export const createRefreshToken = (user: any) => {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    config.auth.refreshTokenSecret,
    {
      expiresIn: config.auth.refreshTokenExpiresIn,
    }
  );
};
