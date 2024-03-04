import { DataStores, GenericStore } from "../datastore/generic.store.js";
import { Request, Response } from "express";
import { Channel, User } from "../types.js";

const channelStore = new GenericStore<Channel>(
  DataStores.CHANNEL,
  "channelName",
  "Channel"
);
const userStore = new GenericStore<User>(DataStores.USER, "username", "User");

export const getChannels = async (req: Request, res: Response) => {
  try {
    const allChanels: Channel[] = await channelStore.readFullStore();
    res.status(200).json(allChanels);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const getChannel = async (req: Request, res: Response) => {
  try {
    const { channelName } = req.params;
    const allChanels: Channel[] = await channelStore.readFullStore();
    const channel = allChanels.find((channel) => {
      return channel.channelName === channelName;
    });
    if (!channel) throw new Error("No channel with that name found");
    res.status(200).json(channel);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const createChannel = async (req: Request, res: Response) => {
  try {
    const { channelName, owner } = req.body;
    const channel: Channel = { channelName, members: [owner], owner };
    await channelStore.createEntry(channel);
    const existingUser = await userStore.getEntry(owner);
    const newUser: User = {
      username: existingUser.username,
      channelsIn: [...existingUser.channelsIn, channel.channelName],
    };
    await userStore.updateEntry(existingUser.username, newUser);
    res.status(200).json(channel);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

export const updateChannel = async (req: Request, res: Response) => {
  try {
    const { channelName } = req.params;
    const { channel } = req.body;
    const newChannel = await channelStore.updateEntry(channelName, channel);
    res.status(200).json(newChannel);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

export const deleteChannel = async (req: Request, res: Response) => {
  try {
    const { channelName } = req.params;
    console.log(channelName);
    await channelStore.deleteEntry(channelName);
    res.status(200).json(true);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};
