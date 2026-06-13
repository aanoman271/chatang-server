import express from "express";
import authMiddleWare from "../middleware/authMiddleWare.js";
import Chat from "../models/chat.js";

const router = express.Router();

router.post("/create-new-chat", authMiddleWare, async (req, res) => {
  try {
    const chat = new Chat(req.body);
    const saveChat = await chat.save();
    res.status(201).send({
      message: "create a chat succesfully ",
      succes: true,
      data: saveChat,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      succes: false,
    });
  }
});

export default router;
