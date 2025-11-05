const express = require("express");
const router = express.Router();
const Seeker = require("../models/Seeker");
const auth = require("../middleware/auth");

// tạo hồ sơ seeker
router.post("/seeker", auth, async (req, res) => {
  try {
    const {
      avatar,
      fullName,
      phone,
      address,
      cccd,
      healthCondition,
      freeTime,
      servicesNeeded
    } = req.body;

    // check nếu seeker đã tồn tại
    const existed = await Seeker.findOne({ userId: req.user.id });
    if (existed) return res.json({ message: "Seeker đã tồn tại" });

    const seeker = new Seeker({
      userId: req.user.id,
      avatar,
      fullName,
      phone,
      address,
      cccd,
      healthCondition,
      freeTime,
      servicesNeeded
    });

    await seeker.save();
    res.json({
      message: "Tạo hồ sơ seeker thành công",
      seeker
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//  update hồ sơ 
router.put("/", auth, async (req, res) => {
  try {
    const seeker = await Seeker.findOneAndUpdate(
      { userId: req.user.id },
      { ...req.body },
      { new: true, upsert: true } 
    );

    res.json(seeker);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// lấy hồ sơ của seeker từ login user
router.get("/me", auth, async (req, res) => {
  try {
    const seeker = await Seeker.findOne({ userId: req.user.id });

    if (!seeker) {
      return res.status(404).json({ message: "Seeker profile not found" });
    }

    res.json(seeker);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// upload ảnh cho seeker
const cloudinary = require("../utils/cloudinary");
const upload = require("../middleware/upload");

router.post("/upload-avatar", auth, upload.single("avatar"), async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    const uploadRes = await cloudinary.uploader.upload(dataURI, {
      folder: "seeker_avatars",
    });

    res.json({
      message: "Upload avatar thành công",
      url: uploadRes.secure_url,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
