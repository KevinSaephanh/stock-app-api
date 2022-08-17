import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }
  async getUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    return this.userService.getUser(req.params.id);
  }

  async updateUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    return this.userService.updateUser(req.params.id, req.body);
  }

  async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    return this.userService.deleteUser(req.params.id);
  }
}
