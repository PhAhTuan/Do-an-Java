
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");
const checkRole = require("../middleware/checkRole");

// Route chọn caregiver ngẫu nhiên
router.get("/match/random-caregiver", auth, checkRole(["seeker"]), async (req, res) => {
  try {
    const caregivers = await User.find({ role: "caregiver" });
    if (caregivers.length === 0) {
      return res.status(404).json({ message: "Không có nhân viên nào sẵn sàng." });
    }

    const randomCaregiver = caregivers[Math.floor(Math.random() * caregivers.length)];

    res.json({
      message: "Đã chọn caregiver ngẫu nhiên thành công",
      caregiver: {
        id: randomCaregiver._id,
        name: randomCaregiver.name,
        email: randomCaregiver.email,
      },
    });
  } catch (err) {
    console.error("❌ Lỗi khi random caregiver:", err);
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
});

module.exports = router;
