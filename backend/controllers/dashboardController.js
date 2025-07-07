const Category = require("../models/Category");
const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");

exports.getCategoriesCount = async (req, res) => {
  try {
    const count = await Category.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error("Erreur getCategoriesCount:", err);
    res.status(500).json({ error: "Erreur lors du comptage des catégories" });
  }
};

exports.getProductsCount = async (req, res) => {
  try {
    const count = await Product.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error("Erreur getProductsCount:", err);
    res.status(500).json({ error: "Erreur lors du comptage des produits" });
  }
};

exports.getUsersCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error("Erreur getUsersCount:", err);
    res.status(500).json({ error: "Erreur lors du comptage des utilisateurs" });
  }
};

exports.getOrdersStats = async (req, res) => {
  try {
    const stats = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const months = [
      "", "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];

    const formatted = stats.map(item => ({
      month: months[item._id] || "Inconnu",
      total: item.total,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Erreur getOrdersStats:", err);
    res.status(500).json({ error: "Erreur lors du calcul des statistiques" });
  }
};
