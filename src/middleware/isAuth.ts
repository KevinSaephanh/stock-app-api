import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import config from "../config/config";
import { ApiError } from "../utils/apiError";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers["authorization"];

  if (!token) return res.status(403).send({ message: "No token provided!" });

  try {
    token = token.split(" ")[1];
    verify(token, config.auth.accessTokenSecret);
    return next();
  } catch (err) {
    throw new ApiError(401, "Unauthorized!");
  }
};
