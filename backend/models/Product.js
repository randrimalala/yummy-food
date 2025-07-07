const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortDesc: { type: String, required: true },
  longDesc: { type: String, required: true },
  stock: { type: Number, required: true },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  image: { type: String, required: true }

});

module.exports = mongoose.model("Product", productSchema);
