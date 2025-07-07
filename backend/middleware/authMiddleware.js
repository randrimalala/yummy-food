const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "Accès refusé. Pas de token." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ msg: "Utilisateur non trouvé." });

    req.user = user; // ✅ un vrai objet Mongoose
    next();
  } catch (err) {
    console.error("Erreur auth middleware:", err);
    res.status(401).json({ msg: "Token invalide." });
  }
};

module.exports = auth;