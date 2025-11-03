const express = require("express");
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "Email đã tồn tại" });

    const hashed = await bcrypt.hash(password, 10);

    user = new User({ email, password: hashed });
    await user.save();

    res.json({ msg: "Đăng ký thành công" });
  } catch (e) {
    res.status(500).json({ msg: "Lỗi server" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Sai email hoặc mật khẩu" });

    const check = await bcrypt.compare(password, user.password);
    if (!check) return res.status(400).json({ msg: "Sai email hoặc mật khẩu" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ msg: "Đăng nhập thành công", token });
  } catch (e) {
    res.status(500).json({ msg: "Lỗi server" });
  }
});

module.exports = router;
