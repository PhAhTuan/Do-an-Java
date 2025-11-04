import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Thiếu email hoặc mật khẩu" });
    }

    const exist = await User.findOne({ email });
    if (exist) return res.json({ message: "Email đã tồn tại" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    res.json({ message: "Đăng ký thành công" });
  } catch (error) {
    res.json({ error: error.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.json({ message: "Sai email" });

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
      user: { name: user.name, email: user.email, role: user.role }
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

export default router;
