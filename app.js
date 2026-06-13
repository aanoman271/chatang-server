import express from "express";
import cors from "cors";
import authRouter from "./controler/authControlar.js";
import userRouter from "./controler/userControler.js";
import chatRouter from "./controler/chatControler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);

app.get("/", (req, res) => {
  res.send("Server is running");
});

export default app;
