const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
   title: String,
  subtitle: String,
  image: String,
  description: String,
  price: String
});

module.exports = mongoose.model("Service", ServiceSchema);
