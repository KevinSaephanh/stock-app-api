import { NextFunction } from "express";

const getUserWatchlists = (userId: number, next: NextFunction) => {
  console.log(userId, next);
};
