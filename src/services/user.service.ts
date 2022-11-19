import { ApiError } from '../utils/apiError';
import User from '../models/user.model';

export class UserService {
  getAll = async () => {
    return await User.find();
  };

  getById = async (id: number) => {
    const user = await User.findById(id);
    if (!user) throw new ApiError(404, `User with id: ${id} not found`);
    return user;
  };

  getByEmail = async (email: string) => {
    const user = await User.findOne({ email });
    if (!user) throw new ApiError(404, `User with email: ${email} not found`);
    return user;
  };

  getByUsername = async (username: string) => {
    const user = await User.findOne({ username });
    if (!user) throw new ApiError(404, `User with username: ${username} not found`);
    return user;
  };

  update = async (id: number, body: any) => {
    return await User.findByIdAndUpdate(id, { ...body }, { returnDocument: 'after' });
  };
}
