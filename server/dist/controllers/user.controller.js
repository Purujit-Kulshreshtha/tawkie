import { DataStores, GenericStore } from "../datastore/generic.store.js";
const userStore = new GenericStore(DataStores.USER, "username", "User");
export const getUsers = async (res) => {
    try {
        const allUsers = await userStore.readFullStore();
        res.status(200).json(allUsers);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
};
export const getUser = async (req, res) => {
    try {
        const { username } = req.params;
        const allUsers = await userStore.readFullStore();
        const user = allUsers.find((user) => user.username === username);
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
};
export const createUser = async (req, res) => {
    try {
        const { username } = req.body;
        const user = { username, channelsIn: [] };
        await userStore.createEntry(user);
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
export const updateUser = async (req, res) => {
    try {
        const { username } = req.params;
        const { user } = req.body;
        const newUser = await userStore.updateEntry(username, user);
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message });
    }
};
//# sourceMappingURL=user.controller.js.map