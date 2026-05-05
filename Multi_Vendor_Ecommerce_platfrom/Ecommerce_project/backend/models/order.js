const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  products: Array,
  total: Number,
  userId: String,
  status: { type: String, default: "Pending" }
});

module.exports = mongoose.model("Order", orderSchema);

