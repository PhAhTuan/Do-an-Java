const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["care_seeker", "caregiver"], default: "care_seeker" },
});

module.exports = mongoose.model("User", userSchema);
