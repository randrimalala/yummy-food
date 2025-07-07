// routes/clientInfoRoute.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const User = require("../models/User");

// Enregistrer les infos supplémentaires
router.post("/", auth, async (req, res) => {
  try {
    const { firstName, lastName, address, phone, birthDate } = req.body;

    if (!req.user || req.user.role !== "client") {
      return res.status(401).json({ msg: "Non autorisé" });
    }

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ msg: "Utilisateur introuvable" });

    user.firstName = firstName;
    user.lastName = lastName;
    user.address = address;
    user.phone = phone;
    user.birthDate = birthDate;

    await user.save();
    res.status(200).json({ msg: "Informations enregistrées avec succès" });
  } catch (error) {
    console.error("Erreur enregistrement infos :", error);
    res.status(500).json({ msg: "Erreur serveur", error: error.message });
  }
});

// Obtenir le profil utilisateur
router.get("/profile", auth, async (req, res) => {
  try {
    const user = req.user;

    const isProfileComplete =
      user.firstName &&
      user.lastName &&
      user.address &&
      user.phone &&
      user.birthDate;

    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      phone: user.phone,
      birthDate: user.birthDate,
      role: user.role,
      isProfileComplete: Boolean(isProfileComplete),
    });
  } catch (error) {
    console.error("Erreur récupération profil:", error);
    res.status(500).json({ msg: "Erreur serveur" });
  }
});

module.exports = router;
