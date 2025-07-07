const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config(); // si nécessaire

router.post('/generate-description', async (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ error: "Nom du produit requis" });

  const prompt = `Rédige une description simple et naturelle d'un produit de fast-food appelé "${name}". Ne commence pas par un titre. Écris directement un texte fluide, sans mise en forme, comme si tu en parlais à un ami.`;

  try {
    const response = await axios.post('https://api.mistral.ai/v1/chat/completions', {
      model: 'mistral-medium', // ou mistral-small si tu veux moins puissant
      messages: [
        { role: 'system', content: 'Tu es un assistant marketing spécialisé en fast-food.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 150
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const content = response.data.choices?.[0]?.message?.content;
    res.json({ description: content });
  } catch (error) {
    console.error('Erreur génération description IA :', error?.response?.data || error.message);
    res.status(500).json({ error: "Erreur lors de la génération IA" });
  }
});

module.exports = router;
