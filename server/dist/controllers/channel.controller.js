import { DataStores, GenericStore } from "../datastore/generic.store.js";
const channelStore = new GenericStore(DataStores.CHANNEL, "channelName", "Channel");
const userStore = new GenericStore(DataStores.USER, "username", "User");
export const getChannels = async (req, res) => {
    try {
        const allChanels = await channelStore.readFullStore();
        res.status(200).json(allChanels);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
};
export const getChannel = async (req, res) => {
    try {
        const { channelName } = req.params;
        const allChanels = await channelStore.readFullStore();
        const channel = allChanels.find((channel) => {
            return channel.channelName === channelName;
        });
        if (!channel)
            throw new Error("No channel with that name found");
        res.status(200).json(channel);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
};
export const createChannel = async (req, res) => {
    try {
        const { channelName, owner } = req.body;
        const channel = { channelName, members: [owner], owner };
        await channelStore.createEntry(channel);
        const existingUser = await userStore.getEntry(owner);
        const newUser = {
            username: existingUser.username,
            channelsIn: [...existingUser.channelsIn, channel.channelName],
        };
        await userStore.updateEntry(existingUser.username, newUser);
        res.status(200).json(channel);
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message });
    }
};
export const updateChannel = async (req, res) => {
    try {
        const { channelName } = req.params;
        const { channel } = req.body;
        console.log(channel);
        const newChannel = await channelStore.updateEntry(channelName, channel);
        console.log(newChannel);
        res.status(200).json(newChannel);
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message });
    }
};
//# sourceMappingURL=channel.controller.js.map