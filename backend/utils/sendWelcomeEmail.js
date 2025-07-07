const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendWelcomeEmail = async (toEmail, username) => {
  const info = await transporter.sendMail({
    from: `"Yummy Food" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `🎉 Bienvenue ${username} sur Yummy Food !`,
    html: `
      <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 20px; border-radius: 8px;">
        <div style="text-align: center;">
          <img src="https://i.imgur.com/UkQeB0C.png" alt="Logo Yummy Food" width="100" style="margin-bottom: 20px;" />
          <h2 style="color: #ff6347;">Bienvenue ${username} !</h2>
          <p>Merci de rejoindre notre tunnel de vente chez <strong>Yummy Food</strong>.</p>
          <p>Nous sommes ravis de vous compter parmi nous 🍔🍟</p>
          <p style="margin-top: 30px;">À très bientôt,<br>L'équipe Yummy Food</p>
        </div>
      </div>
    `,
    headers: {
      "X-Priority": "1",
      "X-MSMail-Priority": "High",
    },
  });

  console.log("Email envoyé :", info.messageId);
};

module.exports = sendWelcomeEmail;
