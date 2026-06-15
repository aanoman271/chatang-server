import express from "express";
import message from "../models/message.js";
import Chat from "../models/chat.js";
import authMiddleWare from "../middleware/authMiddleWare.js";
import chat from "../models/chat.js";

const router = express.Router();

router.post("/new-message", authMiddleWare, async (req, res) => {
  try {
    const newMessage = new message(req.body);
    const savedMessage = await newMessage.save();
    // Update chat metadata
    const currentChat = await Chat.findOneAndUpdate(
      { _id: req.body.chatId },
      {
        lastMessage: savedMessage._id,
        $inc: { unReadMessages: 1 },
      },
      { new: true },
    );

    res.status(201).send({
      message: "Message sent successfully",
      success: true,
      data: savedMessage,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

// get all messages
router.get("/get-all-messages/:chatId", authMiddleWare, async (req, res) => {
  try {
    const { chatId } = req.params;

    if (!chatId) {
      return res.status(400).send({
        message: "chatId is required in query parameters",
        success: false,
      });
    }

    const allMessages = await message
      .find({ chatId: chatId })
      .sort({ createdAt: 1 });

    res.status(200).send({
      message: "All messages fetched successfully",
      success: true,
      data: allMessages,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

export default router;
