import mongoose from "mongoose";

const chatScema = new mongoose.Schema(
  {
    members: {
      type: [{ type: mongoose.Schema.ObjectId, ref: "users" }],
    },
    lastMassages: {
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
export default mongoose.model("Chat", chatScema);
