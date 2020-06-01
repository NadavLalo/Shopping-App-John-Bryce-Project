const mongoose = require("mongoose");
const ProductSchema = mongoose.Schema({
  name: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  price: Number,
  imagePath: String
});

module.exports = mongoose.model("Product", ProductSchema);
