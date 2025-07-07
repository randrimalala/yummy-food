const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendWelcomeEmail = require("../utils/sendWelcomeEmail"); 

const register = async (req, res) => {
  const { username,email, password } = req.body;

  const userExists = await User.findOne({ $or: [{ username }, { email }] });
  if (userExists) return res.status(400).json({ msg: "Username or email already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username,email, password: hashedPassword, role: "client" }); // Forcer client
  await newUser.save();
  
  try {
    await sendWelcomeEmail(email);
  } catch (err) {
    console.error("Erreur lors de l'envoi de l'email :", err);
    // Tu peux continuer l'exécution même si l'email échoue
  }

  res.status(201).json({ msg: "Client registered successfully" });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Cherche l'utilisateur par nom d'utilisateur
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Utilisateur introuvable" });
    }

    // Vérifie le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    // Génère le token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Envoie le cookie et le token dans la réponse JSON
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 jour
      })
      .json({
        token, // ✅ maintenant le frontend peut l'utiliser
        user: {
          id: user._id,
          username: user.username,
          role: user.role,
        },
      });
  } catch (err) {
    console.error("Erreur lors de la connexion :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};


module.exports = { register, login };
