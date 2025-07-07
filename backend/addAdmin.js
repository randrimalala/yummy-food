// backend/addAdmin.js

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

async function createAdmin() {
  const username = "admin";
  const email = "admin@example.com";
  const plainPassword = "admin123";

  try {
    await mongoose.connect(process.env.MONGO_URI);
    const existingAdmin = await User.findOne({ username });

    if (existingAdmin) {
      console.log("❌ Un admin avec ce nom existe déjà.");
      return process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const admin = new User({
      username,
      email,
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();
    console.log("✅ Admin créé avec succès !");
  } catch (err) {
    console.error("Erreur lors de la création de l'admin :", err.message);
  } finally {
    mongoose.connection.close();
  }
}

createAdmin();
