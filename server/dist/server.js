import { config } from "dotenv";
import express from "express";
const app = express();
config();
app.get("/", (req, res) => {
    res.send("Get Tawkie Server.");
});
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
//# sourceMappingURL=server.js.map