import authMiddleWare from "../middleware/authMiddleWare.js";
import User from "../models/users.js";
import express from "express";
const router = express.Router();
router.get("/get-logged-user", authMiddleWare, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId });

    if (user) {
      user.password = undefined;
    }

    return res.send({
      message: "user fetches successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});
// get all user
router.get("/get-all-user", authMiddleWare, async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);
    const allUsers = await User.find({ _id: { $ne: userId } });

    return res.send({
      message: "all users fetches successfully",
      success: true,
      data: allUsers,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});
export default router;
