import { config } from "dotenv";
import express from "express";
import UserRouter from "./routes/user.route.js";
import ChannelRouter from "./routes/channel.route.js";
import cors from "cors";
const app = express();
config();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.send("Get Tawkie Server.");
});
app.use("/users", UserRouter);
app.use("/channels", ChannelRouter);
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
//# sourceMappingURL=server.js.map