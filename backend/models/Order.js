const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  shippingAddress: {
    city: { type: String, required: true },
    lot: { type: String, required: true },
    postalCode: { type: String, required: true },
    email: { type: String, required: true },
  },
  payment: {
    method: {
      type: String,
      enum: ["cash", "mobile_money", "paypal", "credit_card"],
      required: true,
    },
    status: {
      type: String,
      enum: ["en attente", "payé", "échoué"],
      default: "en attente",
    },
    paidAt: { type: Date },
    transactionId: { type: String },
  },
  status: { type: String, default: "en attente" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
