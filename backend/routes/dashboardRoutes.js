const express = require("express");
const router = express.Router();

const {
  getCategoriesCount,
  getProductsCount,
  getUsersCount,
  getOrdersStats,
} = require("../controllers/dashboardController");

// Routes du tableau de bord (dashboard)
router.get("/categories/count", getCategoriesCount);
router.get("/products/count", getProductsCount);
router.get("/users/count", getUsersCount);
router.get("/orders/stats", getOrdersStats);

module.exports = router;
