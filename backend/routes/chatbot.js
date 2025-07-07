const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config(); // Charger les variables d'environnement

router.post("/", async (req, res) => {
  const { prompt } = req.body;

  try {
    const mistralRes = await axios.post(
      "https://api.mistral.ai/v1/chat/completions",
      {
        model: "mistral-medium", // ou mistral-medium, mistral-large selon ta clé
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = mistralRes.data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error("Erreur Mistral", err.response?.data || err.message);
    res.status(500).json({ message: "Erreur du chatbot Mistral" });
  }
});

module.exports = router;
