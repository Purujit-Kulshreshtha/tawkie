import { DataStores, GenericStore } from "../datastore/generic.store.js";
import { User } from "../types.js";
import { Request, Response } from "express";

const userStore = new GenericStore<User>(DataStores.USER, "username", "User");

export const getUsers = async (req: Request, res: Response) => {
  try {
    const allUsers: User[] = await userStore.readFullStore();
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const allUsers: User[] = await userStore.readFullStore();
    const user = allUsers.find((user) => user.username === username);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    const user: User = { username, channelsIn: [] };
    await userStore.createEntry(user);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const { user } = req.body;
    const newUser = await userStore.updateEntry(username, user);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};
