import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";

dotenv.config();
const app = express();
console.log("ENV KEY >>", process.env.GEMINI_KEY);
app.use(cors());
app.use(express.json());

// MongoDB 
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB connected"))
  .catch(err => console.log(" MongoDB error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chatbot", chatbotRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));

