const mongoose = require("mongoose");

const CaregiverSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  avatar: String,
  fullName: String,
  phone: String,
  address: String,
  cccd: String,
  experience: String,
  skills: [String],
  localActivities: [String],
  rating: {type: Number, default: 0},
  
}, { timestamps: true });

module.exports = mongoose.model("Caregiver", CaregiverSchema);
