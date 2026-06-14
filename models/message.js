import mongoose from "mongoose";

const massageScema = new mongoose.Schema({
  chatId: {
    type: mongoose.Schema.ObjectId,
    ref: "chats",
  },
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
  },
  text: {
    type: String,
    require: true,
  },

  read: {
    type: Boolean,
    default: false,
  },
});
export default mongoose.model("message", massageScema);
