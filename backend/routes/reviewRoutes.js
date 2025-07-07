const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

// Ajouter un avis pour un produit
router.post("/:productId/reviews", async (req, res) => {
  const { authorName, rating, content } = req.body;
  try {
    const review = new Review({
      product: req.params.productId,
      authorName,
      rating,
      content,
      approved: true, // modération possible
    });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: "Erreur ajout avis" });
  }
});

// Récupérer les avis d’un produit
router.get("/:productId/reviews", async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId, approved: true });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
