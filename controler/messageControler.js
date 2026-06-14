import express from "express";
import authMiddleWare from "../middleware/authMiddleWare";
import message from "../models/message";
import Chat from "../models/chat";
const router = express.Router;

router.post("/new-message", authMiddleWare, async (req, res) => {
  try {
    const newMessage = new message(req.body);
    const savedMassage = await newMessage.save();

    //update chat
    const currentChat = await Chat.findOneAndUpdate({
      _id: req.body.chatId,
      $inc: { unReadMessages: 1 },
    });
    res.status(201).send({
      message: "message send succesfully",
      succes: true,
      data: savedMassage,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      succes: false,
    });
  }
});
export default router;
