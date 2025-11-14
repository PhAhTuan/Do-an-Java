const express = require("express");
const router = express.Router();
const Message = require("../models/mess");
const auth = require("../middleware/auth");

// Lấy lịch sử chat giữa 2 người
router.get("/:userId/:chatWith", auth, async (req, res) => {
  try {
    const { userId, chatWith } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: chatWith },
        { sender: chatWith, receiver: userId }
      ]
    }).sort({ createdAt: 1 }); 

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi tải lịch sử chat", error: err.message });
  }
});

module.exports = router;
