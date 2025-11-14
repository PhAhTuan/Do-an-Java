const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const http = require("http");
const { Server } = require("socket.io");

// Load env & connect DB
dotenv.config();
connectDB();

// Tạo app Express
const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require("./routes/authRoutes");
const matchRoutes = require("./routes/matchRoutes");
const seekerRoutes = require("./routes/seekerRoutes");
const caregiverRoutes = require("./routes/caregiverRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const messageRoutes = require("./routes/messRoutes"); 
const Message = require("./models/mess"); 



// Đăng ký routes
app.use("/api/auth", authRoutes);
app.use("/api/seeker", seekerRoutes);
app.use("/api/caregiver", caregiverRoutes);
app.use("/api", matchRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/messages", messageRoutes); 


// Tạo HTTP server để tích hợp Socket.IO
const server = http.createServer(app);


// Cấu hình Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React
    methods: ["GET", "POST"]
  }
});

// Sự kiện Socket.IO
io.on("connection", (socket) => {
  console.log(" Người dùng đã kết nối:", socket.id);

  // Khi user tham gia chat
  socket.on("joinChat", ({ userId, chatWith }) => {
    const roomId = [userId, chatWith].sort().join("_");
    socket.join(roomId);
    console.log(` ${userId} đã vào phòng: ${roomId}`);
  });

  // Khi gửi tin nhắn
  socket.on("sendMessage", async (msg) => {
    const roomId = [msg.sender, msg.receiver].sort().join("_");

    try {
      //  Lưu tin nhắn vào MongoDB
      const newMessage = new Message(msg);
      await newMessage.save();
    } catch (err) {
      console.error(" Lỗi khi lưu tin nhắn:", err);
    }

    //  Gửi tin nhắn cho cả 2 người trong phòng
    io.to(roomId).emit("receiveMessage", msg);
    console.log(` ${msg.sender} ➜ ${msg.receiver}: ${msg.text}`);
  });

  socket.on("disconnect", () => {
    console.log(" Người dùng rời đi:", socket.id);
  });
});

// Chạy server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(` Server running on port ${PORT}`));
