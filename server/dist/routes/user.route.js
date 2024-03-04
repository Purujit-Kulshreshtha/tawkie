import express from "express";
import { createUser, getUser, getUsers, updateUser, } from "../controllers/user.controller.js";
const UserRouter = express.Router();
UserRouter.get("/", getUsers);
UserRouter.get("/:username", getUser);
UserRouter.post("/", createUser);
UserRouter.put("/:username", updateUser);
export default UserRouter;
//# sourceMappingURL=user.route.js.map