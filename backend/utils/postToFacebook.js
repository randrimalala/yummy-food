const axios = require("axios");

const postToFacebook = async (product) => {
  const webhookUrl = "https://hook.eu2.make.com/zldc5sbopxkfpe3jjsmi9s3kahj72s1w"; // ⚠️ Remplace par ton vrai lien Make

  const fullImageUrl = `https://picture-digital-repair-opens.trycloudflare.com/uploads/${product.image}`;

  const payload = {
    message: `🆕 Nouveau produit : ${product.name}\n${product.shortDesc}\n💰 Prix : ${product.price} Ar`,
    image: fullImageUrl,
  };

  try {
    await axios.post(webhookUrl, payload, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("✅ Publication Facebook déclenchée via Make");
  } catch (err) {
    console.error("❌ Erreur publication Make :", err.response?.data || err.message);
  }
};

module.exports = { postToFacebook };
