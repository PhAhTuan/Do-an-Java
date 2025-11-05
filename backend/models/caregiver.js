const mongoose = require("mongoose");

const CaregiverSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  locations: [String], 
  availability: [String],
  skills: [String],
  rating: { type: Number, default: 4.0 }
});

module.exports = mongoose.model("Caregiver", CaregiverSchema);
