const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: { type: String, enum: ["customer", "vendor", "admin"], default: "customer" }
});

module.exports = mongoose.model("User", userSchema);

