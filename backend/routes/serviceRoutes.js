const express = require("express");
const router = express.Router();
const Service = require("../models/Service");
const auth = require("../middleware/auth");
const checkRole = require("../middleware/checkRole");

// Lấy tất cả dịch vụ (ai cũng xem được)
router.get("/", async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Lấy chi tiết 1 dịch vụ theo ID
router.get("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Không tìm thấy dịch vụ" });
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Thêm dịch vụ mới (ADMIN)
router.post("/", auth, checkRole(["admin"]), async (req, res) => {
  try {
    const { title, subtitle, image, description, price } = req.body;
    const newService = new Service({ title, subtitle, image, description, price });
    await newService.save();
    res.json({ message: "Thêm dịch vụ thành công", service: newService });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cập nhật dịch vụ (ADMIN)
router.put("/:id", auth, checkRole(["admin"]), async (req, res) => {
  try {
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Không tìm thấy dịch vụ" });
    res.json({ message: "Cập nhật thành công", service: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Xóa dịch vụ (ADMIN)
router.delete("/:id", auth, checkRole(["admin"]), async (req, res) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Không tìm thấy dịch vụ" });
    res.json({ message: "Xóa dịch vụ thành công" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
