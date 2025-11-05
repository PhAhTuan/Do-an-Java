const express = require("express");
const router = express.Router();
const Caregiver = require("../models/Caregiver");
const auth = require("../middleware/auth");


router.post("/", auth, async (req, res) => {
  try {
    const { userId, locations, availability, skills, rating } = req.body;

    const caregiver = await Caregiver.findOneAndUpdate(
      { userId },
      { locations, availability, skills, rating },
      { new: true, upsert: true }
    );

    res.json(caregiver);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
