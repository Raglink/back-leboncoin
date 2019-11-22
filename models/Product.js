const mongoose = require("mongoose");

const Product = mongoose.model("Product", {
  title: String,
  description: String,
  price: Number,
  picture: [],
  User: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = Product;
