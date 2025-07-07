const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }, // URL de l'image ou nom du fichier
});

module.exports = mongoose.model("Category", categorySchema);
