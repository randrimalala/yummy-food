const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendWelcomeEmail = async (toEmail) => {
  const info = await transporter.sendMail({
    from: `"Ton entreprise" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "🎉 Bienvenue sur notre tunnel de vente",
    html: `
      <p>Merci pour votre inscription !</p>
      <p>👉 <a href="https://love-dramatically-modeling-manhattan.trycloudflare.com ">Cliquez ici pour découvrir nos offres</a></p>
      <p>À bientôt,<br>L'équipe</p>
    `,
    headers: {
      "X-Priority": "1",
      "X-MSMail-Priority": "High",
    },
  });

  console.log("Email envoyé :", info.messageId);
};

module.exports = sendWelcomeEmail;
