import { Request, Response } from "express";
import * as userService from "../services/user.service";

export const getUser = async (req: Request, res: Response) => {
  const user = await userService.getById(+req.params.id);
  res.status(200).send(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const user = await userService.update(+req.params.id, req.body);
  res.status(200).send(user);
};
