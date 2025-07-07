const User = require("../models/User");

const requireClientInfo = async (req, res, next) => {
  try {
    const user = req.user; // 👈 Injecté depuis le middleware auth

    if (
      !user.firstName ||
      !user.lastName ||
      !user.address ||
      !user.phone
    ) {
      return res.status(400).json({
        msg: "Veuillez compléter vos informations personnelles avant de continuer.",
      });
    }

    next();
  } catch (err) {
    console.error("Erreur vérification client info:", err);
    res.status(500).json({ msg: "Erreur serveur" });
  }
};

module.exports = requireClientInfo;
