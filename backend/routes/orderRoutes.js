const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const auth = require("../middleware/authMiddleware"); // 👈 Assure-toi que ce chemin est correct
const isAdmin = require("../middleware/isAdmin");
const Product = require("../models/Product");
const { notifyAdmins } = require("../utils/notification");
const sendOrderConfirmationEmail = require("../utils/sendOrderConfirmationEmail");
const User = require("../models/User");
 // ou le chemin correct vers ta fonction notifyAdmins



// ➕ Créer une commande
router.post("/", auth, async (req, res) => {
  try {
    const { items, total, shippingAddress, payment } = req.body;

    if (!req.user) {
      return res.status(401).json({ msg: "Utilisateur non authentifié." });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ msg: "Aucun produit dans la commande." });
    }

    if (!payment?.method) {
      return res.status(400).json({ msg: "Le mode de paiement est requis." });
    }

    const newOrder = new Order({
      client: req.user._id,
      items,
      total,
      shippingAddress,
      payment: {
        method: payment.method,
      },
    });

    await newOrder.save();

    const user = await User.findById(req.user._id);
    await sendOrderConfirmationEmail(user.email, user.username, newOrder);

    notifyAdmins({
      message: `Nouvelle commande de ${user.username || user.email}`,
      type: "new_order",
      orderId: newOrder._id,
      date: new Date(),
    });

    res.status(201).json(newOrder);
  } catch (err) {
    console.error("❌ Erreur création commande :", err);
    res.status(500).json({ msg: "Erreur serveur", error: err.message });
  }
});


// 👁️ Voir toutes les commandes
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("client", "username email")
      .populate("items.product", "name price");
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erreur serveur" });
  }
});

router.get("/my", auth, async (req, res) => {
  try {
    const orders = await Order.find({ client: req.user._id })
      .populate("items.product", "name price")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Erreur récupération commandes :", err);
    res.status(500).json({ msg: "Erreur serveur" });
  }
});

// 🛡️ Middleware pour vérifier si l'utilisateur est admin
const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Accès réservé aux admins." });
  }
  next();
};


// 🔒 Voir toutes les commandes (admin uniquement)
router.get("/admin", auth, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.product", "name price")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: "Erreur serveur" });
  }
});
// Récupérer le nombre total de commandes
router.get("/count", async (req, res) => {
  try {
    const count = await Order.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error("Erreur dans /orders/count :", err);
    res.status(500).json({ msg: "Erreur serveur lors du comptage des commandes" });
  }
});

// 🔄 Changer le statut d'une commande
// Exemple backend Express
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ message: "Statut requis." });

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Commande introuvable." });

    order.status = status;
    await order.save();

    // Notifier les admins du changement de statut
    notifyAdmins({
      message: `Statut commande ${order._id} changé en '${status}'`,
      type: "order_status_update",
      orderId: order._id,
      date: new Date(),
    });

    res.status(200).json({ message: "Statut mis à jour." });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur." });
  }
});


// ⭐ Produits les plus commandés
// Exemple dans routes/orderRoutes.js
router.get("/best-sellers", async (req, res) => {
  try {
    const bestSellers = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.product",
          totalSold: { $sum: "$items.quantity" },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 4 }, // 👈 Limite à 4
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $project: {
          _id: "$product._id",
          name: "$product.name",
          price: "$product.price",
          shortDesc: "$product.shortDesc",
          image: "$product.image",
        },
      },
    ]);

    res.json(bestSellers);
  } catch (err) {
    console.error("Erreur best sellers :", err);
    res.status(500).json({ msg: "Erreur serveur" });
  }
});


module.exports = router;
