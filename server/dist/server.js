import { config } from "dotenv";
import express from "express";
import UserRouter from "./routes/user.route.js";
import ChannelRouter from "./routes/channel.route.js";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
const app = express();
config();
app.use(express.json());
app.use(cors({ origin: "*" }));
app.get("/", (req, res) => {
    res.json("Get Tawkie Server.");
});
app.use("/users", UserRouter);
app.use("/channels", ChannelRouter);
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});
io.on("connection", (socket) => {
    // Handle incoming audio stream
    console.log("c", socket.id);
    socket.on("audioStream", (audioData) => {
        socket.broadcast.emit("audioStream", audioData);
    });
    socket.on("disconnect", () => {
        console.log("d", socket.id);
    });
});
server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
//# sourceMappingURL=server.js.map