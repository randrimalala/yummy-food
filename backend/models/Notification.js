const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    type: { type: String, enum: ["order", "stock", "general"], default: "general" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
