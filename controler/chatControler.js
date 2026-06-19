import express from "express";
import authMiddleWare from "../middleware/authMiddleWare.js";
import Chat from "../models/chat.js";

const router = express.Router();

router.post("/create-new-chat", authMiddleWare, async (req, res) => {
  try {
    const { members } = req.body;

    if (!members.includes(req.user.userId)) {
      members.push(req.user.userId);
    }

    const chat = new Chat({ members });
    const saveChat = await chat.save();

    res.status(201).send({
      message: "create a chat successfully",
      success: true,
      data: saveChat,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

router.get("/get-all-chats", authMiddleWare, async (req, res) => {
  try {
    const currentUserId = req.userId;
    const allChats = await Chat.find({ members: { $in: [currentUserId] } });

    res.status(200).send({
      message: "chat fetches successfully",
      success: true,
      data: allChats,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

export default router;
