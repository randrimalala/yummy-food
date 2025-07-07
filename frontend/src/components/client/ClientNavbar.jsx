import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import CartModal from "./CartModal";

const ClientNavbar = () => {
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // 👈 Ajout de l’état utilisateur
  const { showCartModal, setShowCartModal } = useContext(CartContext); // ✅ à la place
  const navigate = useNavigate();
  const { cartCount } = useContext(CartContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
  
    if (userData) {
      const parsedUser = JSON.parse(userData);
      console.log("User loaded:", parsedUser); // Vérifiez ici
      setUser(parsedUser);
    }
  
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // 👈 on nettoie aussi user
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  // Fonction pour obtenir la première lettre du nom d'utilisateur
  const getUserInitial = () => {
    if (user && user.username) {
      return user.username.trim().charAt(0).toUpperCase(); // Première lettre du username
    }
    return 'U'; // Si aucun username n'est défini, afficher 'U'
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 bg-gradient-to-b from-[#120a04] to-transparent relative transition-all">


      <Link to="/">
        <img className="h-9" src="/logo.png" alt="dummyLogoColored" />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8 text-white">
        <Link to="/" className="hover:text-[text-white] transition">Accueil</Link>
        <Link to="/produits" className="hover:text-[text-white] transition">Produits</Link>
        <Link to="/orders" className="hover:text-[text-white] transition">Commande</Link>
        <Link to="/blogs" className="hover:text-[text-white] transition">Blogue</Link>
        <Link to="/contact" className="hover:text-[text-white] transition">Contact</Link>

        <button
  className="hidden lg:flex items-center text-white hover:text-orange-400 transition"
  title="Recherche"
>
  <svg
    width="18"
    height="18"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.836 10.615L15 14.695"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      clipRule="evenodd"
      d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</button>




        <button
            onClick={() => setShowCartModal(true)}
            className="relative cursor-pointer"
            title="Voir le panier"
          >
            <img src="/basket.png" alt="Panier" className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 text-xs text-white bg-[#d74e09] w-[18px] h-[18px] rounded-full text-center leading-[18px]">
                {cartCount}
              </span>
            )}
          </button>

        {!isAuthenticated ? (
          <>
            <Link
              to="/login"
              className="cursor-pointer px-6 py-2 bg-[#e36414] hover:bg-[#d74e09] transition text-white rounded-full"
            >
              Connexion
            </Link>
            <Link
              to="/register"
              className="cursor-pointer px-6 py-2 bg-[#fffcf2] hover:bg-[#ccc5b9] transition text-white rounded-full"
            >
              Inscription
            </Link>
          </>
        ) : (
          <div className="relative">
            <button onClick={() => setOpen(!open)} className="focus:outline-none flex items-center">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#d35400] text-white font-bold uppercase border border-[#ccc5b9]">
                {getUserInitial()} {/* Utilisation de la fonction ici */}
              </div>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-[#ccc5b9] rounded shadow-lg z-50">
                <Link
                  to="/profil"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 text-[#403d39] hover:bg-[#fffcf2]"
                >
                  Mon profil
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-[#403d39] hover:bg-[#fffcf2]"
                >
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Button */}
      <button onClick={() => setOpen(!open)} aria-label="Menu" className="sm:hidden">
        <svg width="21" height="15" viewBox="0 0 21 15" fill="none">
          <rect width="21" height="1.5" rx=".75" fill="white" />
          <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="white" />
          <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="white" />
        </svg>
      </button>

      {/* Mobile Menu */}
      <div className={`${open ? "flex" : "hidden"} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
        <Link to="/" className="block text-white hover:text-[text-white]">Accueil</Link>
        <Link to="/produits" className="block text-white hover:text-[text-white]">Produits</Link>
        <Link to="/orders" className="hover:text-[text-white] transition">Commande</Link>
        <Link to="/blogs" className="hover:text-[text-white] transition">Blogue</Link>
        <Link to="/contact" className="block text-white hover:text-[text-white]">Contact</Link>

        {!isAuthenticated ? (
          <>
            <Link to="/login" className="px-6 py-2 bg-[#e36414] hover:bg-[#d74e09] text-white rounded-full text-sm mt-2">
              Connexion
            </Link>
            <Link to="/register" className="px-6 py-2 bg-[#fffcf2] hover:bg-[#ccc5b9] text-white rounded-full text-sm mt-2">
              Inscription
            </Link>
          </>
        ) : (
          <>
            <Link to="/profil" className="px-6 py-2 bg-[#ccc5b9] hover:bg-[#fb8b24] text-white rounded-full text-sm mt-2">
              Profil
            </Link>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-[#d74e09] hover:bg-[text-white] text-white rounded-full text-sm mt-2"
            >
              Déconnexion
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default ClientNavbar;
