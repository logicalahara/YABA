import { IUserProps } from "../types/interfaces";
import { Request, Response } from "express";
import { User } from '../entities/user.entity';
import { AppDataSource } from '../utils/data-source';
const postRepository = AppDataSource.getRepository(User);

const getAllUsers = async (_: Request, res: Response) => {
  const user = await postRepository.find();
  return res.status(200).json({
    data: user
  });
};

const getUser = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  return res.status(200).json({
    message: id,
  });
};

const addUser = async (req: Request, res: Response) => {
  const data: Record<string, unknown> = req.body;
  // TODO: data validation
  return res.status(200).json({
    message: "User added",
    data,
  });
};

const updateUser = async (req: Request, res: Response) => {
  const updatedUser: IUserProps = req.body;
  // TODO: data validation
  const users: IUserProps[] = [];
  const index = users.findIndex((user) => user.id === updatedUser.id);
  users.splice(index, 1, updatedUser);
  return res.status(200).json({
    message: "User updated",
    data: updatedUser,
  });
};

const deleteUser = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const users: IUserProps[] = [];
  const index = users.findIndex((user) => user.id === id);
  users.splice(index, 1);
  return res.status(200).json({
    message: "User deleted",
    data: id,
  });
};
export default { getAllUsers, getUser, addUser, updateUser, deleteUser };