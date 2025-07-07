import React, { useEffect, useState } from "react";
import PageHeader from "../../components/client/PageHeader";
import api from "../../services/axios"; // ✅ Instance axios personnalisée

const CompleterProfil = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    birthDate: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/client/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data;
        setForm({
          username: data.username || "",
          email: data.email || "",
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          phone: data.phone || "",
          address: data.address || "",
          birthDate: data.birthDate ? data.birthDate.substring(0, 10) : "",
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement du profil.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) return <p className="text-center text-gray-500">Chargement...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      <PageHeader title="Profil" />
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Mon Profil</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-600 mb-1">Nom d'utilisateur</label>
            <input
              name="username"
              value={form.username}
              readOnly
              className="w-full border bg-gray-100 p-2 rounded focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              name="email"
              value={form.email}
              readOnly
              className="w-full border bg-gray-100 p-2 rounded focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Prénom</label>
            <input
              name="firstName"
              value={form.firstName}
              readOnly
              className="w-full border bg-gray-100 p-2 rounded focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Nom</label>
            <input
              name="lastName"
              value={form.lastName}
              readOnly
              className="w-full border bg-gray-100 p-2 rounded focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Téléphone</label>
            <input
              name="phone"
              value={form.phone}
              readOnly
              className="w-full border bg-gray-100 p-2 rounded focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Adresse</label>
            <input
              name="address"
              value={form.address}
              readOnly
              className="w-full border bg-gray-100 p-2 rounded focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Date de naissance</label>
            <input
              type="date"
              name="birthDate"
              value={form.birthDate}
              readOnly
              className="w-full border bg-gray-100 p-2 rounded focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => alert("Redirection vers la page de modification")}
          >
            Modifier le profil
          </button>
        </div>
      </div>
    </>
  );
};

export default CompleterProfil;
