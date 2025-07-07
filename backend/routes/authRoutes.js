// routes/authRoutes.js
const express = require("express");
const { register, login } = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");
const User = require("../models/User");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", auth, isAdmin, (req, res) => {
  res.json({
    id: req.user._id,
    username: req.user.username,
    role: req.user.role,
    avatarUrl: req.user.avatarUrl || "",
  });
});
// ✅ Récupérer les 5 utilisateurs les plus récents
router.get("/recent", async (req, res) => {
  try {
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("username email role createdAt"); // Attention, pas "password" !
    res.json(recentUsers); // ✅ Bien renvoyer un tableau
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs récents :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});


module.exports = router;
