const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const Category = require("../models/Category");
const Product = require("../models/Product");
const { notifyAdmins } = require("../utils/notification");
 // <-- import

// Ajouter une catégorie avec image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!name || !image) return res.status(400).json({ msg: "Nom ou image manquant" });

    const newCategory = new Category({ name, image });
    await newCategory.save();

    // Notification admin
    notifyAdmins({
      message: `Nouvelle catégorie ajoutée : ${name}`,
      type: "new_category",
      categoryId: newCategory._id,
      date: new Date(),
    });

    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ msg: "Erreur serveur" });
  }
});

// Voir le nombre de catégories
router.get("/count", async (req, res) => {
  try {
    const count = await Category.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error("Erreur dans /count :", err);
    res.status(500).json({ msg: "Erreur serveur lors du comptage des catégories" });
  }
});

// Voir toutes les catégories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ msg: "Erreur serveur" });
  }
});

// Voir une catégorie + ses produits
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ msg: "Catégorie introuvable" });

    const products = await Product.find({ category: req.params.id });
    res.json({ category, products });
  } catch (err) {
    res.status(500).json({ msg: "Erreur serveur" });
  }
});


module.exports = router;
