import { config } from "dotenv";
import express, { Request, Response } from "express";

const app = express();
config();
app.get("/", (req: Request, res: Response) => {
  res.send("Get Tawkie Server.");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
