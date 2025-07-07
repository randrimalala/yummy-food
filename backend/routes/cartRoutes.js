const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const auth = require("../middleware/authMiddleware");

// ➕ Ajouter un produit au panier
router.post("/add", auth, async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();

    // On repopule les produits pour envoyer les infos à jour
    const updatedCart = await Cart.findOne({ user: req.user.id }).populate("items.product");

    res.json({ msg: "Produit ajouté au panier", items: updatedCart.items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erreur serveur" });
  }
});

// 👁️ Voir son panier
router.get("/", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
    if (!cart) return res.json([]); // retourne un tableau vide directement
    res.json({ items: cart.items });
  } catch (err) {
    res.status(500).json({ msg: "Erreur serveur" });
  }
});

// 🗑️ Supprimer un produit du panier
router.delete("/remove/:productId", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ msg: "Panier introuvable" });

    const initialLength = cart.items.length;

    cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId);
    if (cart.items.length === initialLength) {
      return res.status(404).json({ msg: "Produit non trouvé dans le panier" });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ msg: "Erreur serveur" });
  }
});


// ❌ Vider le panier
router.delete("/clear", auth, async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user.id });
    res.json({ msg: "Panier vidé" });
  } catch (err) {
    res.status(500).json({ msg: "Erreur serveur" });
  }
});

// 🔁 Mettre à jour la quantité d'un produit dans le panier
// 🔁 Mettre à jour la quantité d'un produit dans le panier
router.put("/update/:productId", auth, async (req, res) => {
  const { quantity } = req.body;
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ msg: "Produit introuvable" });

    if (quantity > product.stock) {
      return res.status(400).json({ msg: `Stock max atteint : ${product.stock}` });
    }

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ msg: "Panier introuvable" });

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex === -1) return res.status(404).json({ msg: "Produit non trouvé dans le panier" });

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    const updatedCart = await Cart.findOne({ user: req.user.id }).populate("items.product");

    res.json({ items: updatedCart.items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erreur serveur" });
  }
});


module.exports = router;
