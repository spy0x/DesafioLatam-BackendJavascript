import { User } from "../database/users.schema";

export const createUser = async (username: string, password: string) => {
  return await User.create({ username, password });
}

export const findUser = async (username: string) => {
  return await User.findOne({ where: { username } });
}