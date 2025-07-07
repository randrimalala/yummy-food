// utils/sendOrderConfirmationEmail.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOrderConfirmationEmail = async (toEmail, username, order) => {
  const itemsList = order.items.map(
    (item) => `<li>${item.name} × ${item.quantity}</li>`
  ).join("");

  const htmlContent = `
    <h2 style="color:#333;">Bonjour ${username},</h2>
    <p>🎉 Merci pour votre commande ! Voici un récapitulatif :</p>
    <ul>${itemsList}</ul>
    <p><strong>Total :</strong> ${order.total}€</p>
    <p><strong>Méthode de paiement :</strong> ${order.paymentMethod}</p>
    <p><strong>Adresse de livraison :</strong> ${order.shippingAddress}</p>
    <hr />
    <p style="color: #888;">L'équipe Yummy Food vous remercie 🍔</p>
  `;

  const info = await transporter.sendMail({
    from: `"Yummy Food" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "🧾 Confirmation de votre commande",
    html: htmlContent,
  });

  console.log("📩 Email de commande envoyé :", info.messageId);
};

module.exports = sendOrderConfirmationEmail;
