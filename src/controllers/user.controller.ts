import { Request, Response } from "express";
import * as userService from "../services/user.service";

export const getUser = async (req: Request, res: Response): Promise<any> => {
  const user = await userService.getUser(req.params.id);
  res.status(200).send({ user });
};

export const updateUser = async (req: Request, res: Response): Promise<any> => {
  const user = await userService.updateUser(req.params.id, req.body);
  res.status(200).send({ user });
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  await userService.deleteUser(req.params.id);
  res.status(204).send();
};
