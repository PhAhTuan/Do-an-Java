const express = require("express");
const router = express.Router();
const Caregiver = require("../models/Caregiver");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const cloudinary = require("../utils/cloudinary");
const checkRole = require("../middleware/checkRole");

// Tạo hồ sơ 
router.post("/", auth, checkRole("caregiver"), async (req, res) => {
  try {
    const existing = await Caregiver.findOne({ userId: req.user.id });
    if (existing) return res.json({ message: "Caregiver đã tồn tại" });

    const caregiver = new Caregiver({ userId: req.user.id, ...req.body });
    await caregiver.save();

    res.json({ message: "Tạo hồ sơ caregiver thành công", caregiver });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cập nhật hồ sơ 
router.put("/", auth, checkRole("caregiver"), async (req, res) => {
  try {
    const caregiver = await Caregiver.findOneAndUpdate(
      { userId: req.user.id },
      { ...req.body },
      { new: true, upsert: true }
    );
    res.json(caregiver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Lấy hồ sơ 
router.get("/me", auth, checkRole("caregiver"),async (req, res) => {
  try {
    const caregiver = await Caregiver.findOne({ userId: req.user.id });
    if (!caregiver) return res.status(404).json({ message: "Chưa có hồ sơ caregiver" });
    res.json(caregiver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upload avatar 
router.post("/upload-avatar", auth, checkRole("caregiver"),upload.single("avatar"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Chưa có file" });

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;
    const uploadRes = await cloudinary.uploader.upload(dataURI, { folder: "caregiver_avatars" });

    const updated = await Caregiver.findOneAndUpdate(
      { userId: req.user.id },
      { avatar: uploadRes.secure_url },
      { new: true }
    );

    res.json({ message: "Upload avatar thành công", avatar: uploadRes.secure_url, caregiver: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
