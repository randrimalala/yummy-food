// src/pages/CheckoutAddress.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/client/PageHeader";

const CheckoutAddress = () => {
  const [formData, setFormData] = useState({
    city: "",
    lot: "",
    postalCode: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("shippingAddress", JSON.stringify(formData));
    navigate("/checkout");
  };

  return (
    <>
    <PageHeader title="Validation de la commande" />
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📍 Compléter l'adresse de livraison</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="city"
          placeholder="Ville"
          value={formData.city}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="lot"
          placeholder="Lot / Adresse"
          value={formData.lot}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Code postal"
          value={formData.postalCode}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Enregistrer l'adresse
        </button>
      </form>
    </div>
    </>
  );
};

export default CheckoutAddress;
