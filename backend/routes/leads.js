const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");
const sendWelcomeEmail = require("../utils/sendEmail");
const { notifyAdmins } = require("../utils/notification");
 // <-- importer notifyAdmins

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ msg: "Email requis" });

    // 1. Sauvegarde en base de données
    const newLead = new Lead({ email });
    await newLead.save();

    // 2. Envoi de l’email de bienvenue avec lien vers le vrai site
    await sendWelcomeEmail(email);

    // 3. Notification admin
    notifyAdmins({
      message: `Nouveau lead inscrit : ${email}`,
      type: "new_lead",
      leadId: newLead._id,
      date: new Date(),
    });

    res.status(201).json({ message: "Email enregistré et message envoyé !" });
  } catch (err) {
    console.error("Erreur lors de l'enregistrement ou de l'envoi d'email :", err);
    res.status(500).json({ msg: "Erreur serveur" });
  }
});

module.exports = router;
