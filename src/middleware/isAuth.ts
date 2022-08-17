import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];

  if (!token) return res.status(403).send({ message: "No token provided!" });

  verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, decoded) => {
    if (err) return res.status(401).send({ message: "Unauthorized!" });

    req.userId = decoded.id;
    next();
  });
};
