import User from "../models/user.model";

export const getAll = async () => {
  return await User.find();
};

export const getById = async (id: number) => {
  return await User.findById(id);
};

export const getByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export const getByUsername = async (username: string) => {
  return await User.findOne({ username });
};
