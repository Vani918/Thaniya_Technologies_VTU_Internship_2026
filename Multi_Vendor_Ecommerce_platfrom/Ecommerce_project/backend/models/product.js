const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  vendorId: String
});

module.exports = mongoose.model("Product", productSchema);


