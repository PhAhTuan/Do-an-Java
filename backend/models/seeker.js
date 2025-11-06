const mongoose = require("mongoose");

const SeekerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  avatar: String,
  fullName: String,
  phone: String,
  address: String,
  cccd: String,
  healthCondition: String, 
  freeTime: [String],
  servicesNeeded: [String], 

}, { timestamps: true });


module.exports = mongoose.model("Seeker", SeekerSchema);



