import { NextFunction, Request, Response } from "express";

export const asyncWrap = (fn: Function) =>
  function asyncUtilWrap(req: Request, res: Response, next: NextFunction, ...args: unknown[]) {
    const fnReturn = fn(req, res, next, ...args);
    return Promise.resolve(fnReturn).catch(next);
  };
