import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/axios";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      alert("Client inscrit avec succès !");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Erreur lors de l'inscription");
    }
  };

  return (
    <div className="flex min-h-screen w-screen bg-white overflow-hidden">
      
      {/* Partie gauche - Formulaire */}
      <div className="relative w-1/2 flex items-center justify-center bg-white">
        {/* Cercle décoratif discret derrière */}
        <div className="absolute w-40 h-40 bg-gradient-to-br from-[#6FB1FC] via-[#4364F7] to-[#0052D4] rounded-full top-[-60px] left-[-60px] z-0 opacity-30 blur-sm" />

        <div className="w-full max-w-md z-10">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-1">Sign up</h2>
          <p className="text-center text-gray-500 text-sm mb-6">
            Créez votre compte pour commander facilement
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Nom d'utilisateur"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="w-full outline-none text-sm text-gray-700 bg-transparent"
                required
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="Adresse email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full outline-none text-sm text-gray-700 bg-transparent"
                required
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="Mot de passe"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full outline-none text-sm text-gray-700 bg-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-200"
            >
              S'inscrire
            </button>

            <p className="text-center text-sm text-gray-600">
              Vous avez déjà un compte ?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Se connecter
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* Partie droite - WELCOME et cercles décoratifs */}
<div className="relative w-1/2 flex items-center justify-center bg-white overflow-hidden">
  {/* Grand cercle collé à DROITE (hors écran à droite) */}
  <div className="absolute w-[850px] h-[850px] bg-gradient-to-br from-[#6FB1FC] via-[#4364F7] to-[#0052D4] rounded-full 
                  right-[-300px] top-[-300px] z-0" />

  {/* Texte dans le cercle */}
  <div className="absolute z-10 text-center px-10 text-white top-1/2 left-1/2 transform -translate-x-[20%] -translate-y-[115%]">
    <h1 className="text-4xl md:text-5xl font-bold mb-3">BIENVENUE</h1>
    <h2 className="text-lg font-semibold mb-2 opacity-90">CREER VOTRE COMPTE</h2>
    <p className="text-sm leading-relaxed opacity-80">
      Inscrivez-vous pour découvrir notre univers culinaire
    </p>
  </div>

  {/* Cercles décoratifs alignés à droite */}
  {/* Cercles décoratifs animés */}
  <div className="absolute w-72 h-72 bg-gradient-to-br from-[#6FB1FC] via-[#4364F7] to-[#0052D4] 
     rounded-full bottom-[-60px] right-[-40px] z-10 shadow-xl animate-bounce-smooth" />

<div className="absolute w-52 h-52 bg-gradient-to-br from-[#6FB1FC] via-[#4364F7] to-[#0052D4] 
     rounded-full bottom-[70px] right-[360px] z-10 shadow-lg animate-bounce-smooth delay-[3s]" />

</div>

    </div>
  );
}
