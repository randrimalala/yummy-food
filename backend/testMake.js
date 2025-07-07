const axios = require('axios');

async function testMakeWebhook() {
  const webhookUrl = "https://hook.eu2.make.com/zldc5sbopxkfpe3jjsmi9s3kahj72s1w"; // Remplace par ton URL webhook

  const payload = {
    message: "🚀 Ceci est un test automatique depuis Make !",
    image: "https://via.placeholder.com/600x300.png?text=Test+Auto"
  };

  try {
    const res = await axios.post(webhookUrl, payload, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("✅ Webhook envoyé avec succès :", res.status);
  } catch (err) {
    console.error("❌ Erreur en envoyant au webhook :", err.response?.data || err.message);
  }
}

testMakeWebhook();
