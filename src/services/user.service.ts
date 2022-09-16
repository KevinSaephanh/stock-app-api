import { ApiError } from "../utils/apiError";
import User from "../models/user.model";

export const getAll = async () => {
  return await User.find();
};

export const getById = async (id: number) => {
  const user = await User.findById(id);
  if (!user) throw new ApiError(404, `User with id: ${id} not found`);
  return user;
};

export const getByEmail = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, `User with email: ${email} not found`);
  return user;
};

export const getByUsername = async (username: string) => {
  const user = await User.findOne({ username });
  if (!user) throw new ApiError(404, `User with username: ${username} not found`);
  return user;
};

export const update = async (id: number, body: any) => {
  const user = await getById(id);
  console.log(user, body);
};
