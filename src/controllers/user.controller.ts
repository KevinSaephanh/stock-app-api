import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  private readonly userService = new UserService();

  getById = async (req: Request, res: Response) => {
    const user = await this.userService.getById(+req.params.id);
    res.status(200).send(user);
  };

  update = async (req: Request, res: Response) => {
    const user = await this.userService.update(+req.params.id, req.body);
    res.status(200).send(user);
  };
}
