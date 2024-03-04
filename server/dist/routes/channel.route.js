import express from "express";
import { createChannel, deleteChannel, getChannel, getChannels, updateChannel, } from "../controllers/channel.controller.js";
const ChannelRouter = express.Router();
ChannelRouter.get("/", getChannels);
ChannelRouter.get("/:channelName", getChannel);
ChannelRouter.post("/", createChannel);
ChannelRouter.put("/:channelName", updateChannel);
ChannelRouter.delete("/:channelName", deleteChannel);
export default ChannelRouter;
//# sourceMappingURL=channel.route.js.map