import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }
  async getUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    const user = await this.userService.getUser(req.params.id);
    res.status(200).send({ user });
  }

  async updateUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    const user = await this.userService.updateUser(req.params.id, req.body);
    res.status(200).send({ user });
  }

  async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    await this.userService.deleteUser(req.params.id);
    res.status(204).send();
  }
}
