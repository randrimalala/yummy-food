const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const upload = require("../middleware/upload");
const { notifyAdmins } = require("../utils/notification");
const { postToFacebook } = require("../utils/postToFacebook");

// ✅ Récupérer le nombre total de produits
router.get("/count", async (req, res) => {
  try {
    const count = await Product.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur lors du comptage des produits" });
  }
});

// ✅ Produits faibles en stock (à mettre AVANT les routes dynamiques)
router.get("/low-stock", async (req, res) => {
  try {
    const products = await Product.find({ stock: { $lte: 5 } })
      .sort({ stock: 1 })
      .limit(5);

    console.log("Produits faibles en stock :", products);
    return res.json(products);
  } catch (error) {
    console.error("Erreur backend :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ✅ Récupérer les produits les plus populaires
router.get("/popular", async (req, res) => {
  try {
    const popularProducts = await Product.find({ salesCount: { $exists: true } })
      .sort({ salesCount: -1 })
      .limit(8);

    res.json(popularProducts);
  } catch (err) {
    console.error("Erreur dans /popular :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ✅ Ajouter un produit avec une image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, shortDesc, longDesc, stock, price, category } = req.body;
    const image = req.file.filename;

    const newProduct = new Product({
      name,
      shortDesc,
      longDesc,
      stock,
      price,
      category,
      image,
    });

    await newProduct.save();

    // Notifier les admins qu'un produit a été ajouté
    notifyAdmins({
      message: `Nouveau produit ajouté : ${name}`,
      type: "new_product",
      productId: newProduct._id,
      date: new Date(),
    });

    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erreur serveur lors de l'ajout du produit" });
  }
});

// ✅ Récupérer tous les produits
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name image");
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: "Erreur serveur lors de la récupération des produits" });
  }
});

// ✅ Récupérer les produits similaires à un produit donné
router.get("/:productId/similar", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ message: "Produit introuvable" });

    const similarProducts = await Product.find({
      _id: { $ne: product._id },
      category: product.category,
    }).limit(4);

    res.json(similarProducts);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ✅ Récupérer un produit par son ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) return res.status(404).json({ message: "Produit non trouvé" });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ✅ Supprimer un produit par ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Produit non trouvé" });

    // Notifier les admins qu'un produit a été supprimé
    notifyAdmins({
      message: `Produit supprimé : ${deletedProduct.name}`,
      type: "delete_product",
      productId: deletedProduct._id,
      date: new Date(),
    });

    res.json({ message: "Produit supprimé" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.post("/:id/publish", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Produit introuvable" });

    await postToFacebook(product);

    res.json({ message: "✅ Publication Facebook lancée avec succès" });
  } catch (error) {
    console.error("❌ Erreur publication Facebook :", error);
    res.status(500).json({ message: "Erreur lors de la publication" });
  }
});

module.exports = router;
