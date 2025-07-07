const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  authorName: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  content: { type: String },
  createdAt: { type: Date, default: Date.now },
  approved: { type: Boolean, default: false }
});

module.exports = mongoose.model("Review", ReviewSchema);
