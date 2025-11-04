import express from "express";
import auth from "../middleware/auth.js";
import ChatLog from "../models/chatlog.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

router.post("/", auth, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ reply: "Message is required" });

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest"  // ✅ model đúng
    });

    const result = await model.generateContent(message);
    const reply = result.response.text();

    await ChatLog.create({
      userId: req.user.id,
      message,
      reply
    });

    res.json({ reply });

  } catch (err) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ reply: "AI lỗi, thử lại sau!" });
  }
});

export default router;
