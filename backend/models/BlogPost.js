const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  image: String,
  excerpt: String,
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },

  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
