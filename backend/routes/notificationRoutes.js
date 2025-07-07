// routes/notificationRoutes.js
const express = require("express");
const router = express.Router();
const { notifyAdmins } = require("../utils/notification");

// Route test pour envoyer une notification manuellement
router.post("/send", (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message obligatoire" });
  }

  const notification = {
    message,
    createdAt: new Date(),
  };

  notifyAdmins(notification);
  res.json({ success: true, notification });
});

module.exports = router;
