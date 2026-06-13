import express from "express";
import User from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

// ==================== SIGNUP API ====================
router.post("/signup", async (req, res) => {
  try {
    console.log("Req Body Data:", req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Email and password are required", success: false });
    }

    const user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(400)
        .send({ message: "user already exists", success: false });
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashPassword;
    const newUser = new User(req.body);
    await newUser.save();
    return res.status(201).send({
      message: "account created successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
      success: false,
    });
  }
});

// ==================== LOGIN (SIGNIN) API ====================
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Email and password are required", success: false });
    }

    // user existing check
    const user = await User.findOne({ email: email }).select("+password");
    if (!user) {
      return res.status(404).send({
        message: "user does not exist",
        success: false,
      });
    }

    // password validation
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).send({
        message: "wrong password",
        success: false,
      });
    }

    // ৫. JWT toeken
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // succes response
    return res.status(200).send({
      message: "user login successfully",
      success: true,
      token: token,
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
      success: false,
    });
  }
});

export default router;
