const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const auth = require("../middleware/auth");

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Thiếu email hoặc mật khẩu" });
    }

    
    const allowedRoles = ["seeker", "caregiver", "admin"];
    if (role && !allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Vai trò không hợp lệ" });
    }

    
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({ message: "Email đã tồn tại" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name || "",
      email,
      password: hashedPassword,
      scamPassword: password,
      role: role || "seeker",
    });

    await newUser.save();

    res.json({
      message: "Đăng ký thành công",
      user: {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: error.message });
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

   
    const user = await User.findOne({ email, role });
    if (!user) return res.json({ message: "Tài khoản không tồn tại hoặc sai vai trò" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ message: "Sai mật khẩu" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Đăng nhập thành công",
      token,
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});


// GET USER
router.get("/me", auth, async (req, res) => {
  try {
    const userData = await User.findById(req.user.id).select("-password");
    res.json(userData);
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;