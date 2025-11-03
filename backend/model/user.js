const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  provider: { type: String, default: "local" } 
});

module.exports = mongoose.model("User", UserSchema);
