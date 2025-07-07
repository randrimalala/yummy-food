// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["client", "admin"], default: "client" },

    // Champs supplémentaires
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    address: { type: String, default: "" },
    phone: { type: String, default: "" },
    birthDate: { type: Date, default: null },
  },
  { timestamps: true } // ✅ Active createdAt & updatedAt
);

module.exports = mongoose.model("User", userSchema);
