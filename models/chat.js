import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    members: {
      type: [{ type: mongoose.Schema.ObjectId, ref: "users" }],
    },
    lastMessage: {
      type: mongoose.Schema.ObjectId,
      ref: "message",
    },
    unReadMessages: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Chat", chatSchema);
