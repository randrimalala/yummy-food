import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CompleterProfil() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    birthDate: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Token introuvable. Veuillez vous reconnecter.");
        return navigate("/login");
      }

      await axios.post("http://localhost:5000/api/client", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Profil complété avec succès !");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Erreur lors de l'enregistrement");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-20 bg-white p-8 rounded-2xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Compléter votre profil
      </h2>

      <input
        name="firstName"
        placeholder="Prénom"
        value={form.firstName}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      />

      <input
        name="lastName"
        placeholder="Nom"
        value={form.lastName}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      />

      <input
        name="address"
        placeholder="Adresse"
        value={form.address}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      />

      <input
        name="phone"
        placeholder="Téléphone"
        value={form.phone}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      />

      <input
        name="birthDate"
        type="date"
        value={form.birthDate}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      />

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg"
      >
        Enregistrer
      </button>
    </form>
  );
}
