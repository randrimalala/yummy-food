const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: "BlogPost", required: true }, // article lié
  authorName: { type: String, required: true },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  approved: { type: Boolean, default: false }, // pour modération si besoin
});

module.exports = mongoose.model("Comment", commentSchema);
