import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/axios";
import { FaUser, FaLock } from "react-icons/fa";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      const token = res.data.token;
      const { username, role } = res.data.user;

      if (!token) throw new Error("Token manquant dans la réponse");
      localStorage.setItem("token", token);
      alert(`Bienvenue ${username}, rôle : ${role}`);

      if (role === "admin") return navigate("/admin");

      const profileRes = await api.get("/client/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const isProfileComplete = profileRes.data.isProfileComplete;
      navigate(isProfileComplete ? "/" : "/completer-profil");
    } catch (err) {
      alert(err.response?.data?.msg || "Erreur serveur");
    }
  };

  return (
    <div className="flex min-h-screen w-screen bg-white overflow-hidden">
      
      {/* Partie gauche avec cercle WELCOME */}
      <div className="relative w-1/2 flex items-center justify-center bg-white overflow-hidden">
        {/* Grand cercle bleu avec dégradé inversé */}
        <div className="absolute w-[850px] h-[850px] bg-gradient-to-br from-[#6FB1FC] via-[#4364F7] to-[#0052D4] rounded-full 
                        left-[-300px] top-[-300px] z-0" />

        {/* Texte WELCOME dans le cercle */}
        <div className="absolute z-10 text-center px-10 text-white top-1/2 left-1/2 transform -translate-x-[80%] -translate-y-[115%]">
  <h1 className="text-4xl md:text-5xl font-bold mb-3">Bon retour</h1>
  <h2 className="text-lg font-semibold mb-2 opacity-90">Connectez-vous à votre espace</h2>
  <p className="text-sm leading-relaxed opacity-80">
    Accédez à vos commandes et profitez d’une expérience gourmande personnalisée.
  </p>
</div>


        {/* Cercles décoratifs */}
        <div className="absolute w-75 h-75 bg-gradient-to-br from-[#6FB1FC] via-[#4364F7] to-[#0052D4] rounded-full bottom-[-55px] left-[-40px] z-10 shadow-xl" />
        <div className="absolute w-50 h-50 bg-gradient-to-br from-[#6FB1FC] via-[#4364F7] to-[#0052D4] rounded-full bottom-[60px] left-[350px] z-10 shadow-lg" />
      </div>

      {/* Partie droite formulaire */}
      <div className="relative w-1/2 flex items-center justify-center bg-white">
        {/* Cercle décoratif en bas à droite */}
        <div className="absolute w-40 h-40 bg-gradient-to-br from-[#6FB1FC] via-[#4364F7] to-[#0052D4] rounded-full bottom-[-60px] right-[-60px] z-0 shadow-xl" />

        {/* Formulaire */}
        <div className="w-full max-w-md z-10 transform -translate-x-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-1">Se connecter</h2>
          <p className="text-center text-gray-500 text-sm mb-6">
            Connectez-vous pour profité de toutes les fonctionnalités disponibles
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
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="Mot de passe"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full outline-none text-sm text-gray-700 bg-transparent"
                required
              />
              <span className="text-xs text-blue-600 cursor-pointer ml-2">Voir</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Souviens-toi de moi
              </label>
              <a href="#" className="text-blue-600 hover:underline">Mot de passe oublié?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-200"
            >
              Sign In
            </button>

            <button
              type="button"
              className="w-full border border-gray-300 py-2 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition duration-200"
            >
              Sign in with other
            </button>

            <p className="text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <a href="/register" className="text-blue-600 hover:underline">Sign Up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
