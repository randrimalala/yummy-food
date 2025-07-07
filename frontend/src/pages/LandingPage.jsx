import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../services/axios";
import { CartContext } from "../context/CartContext";
import { FiShoppingCart } from "react-icons/fi";
import { MailCheck } from "lucide-react";
import { ShoppingCart, Tag, Award } from 'lucide-react';
import {  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin } from 'lucide-react'; // Si vous utilisez lucide-react


export default function LandingPageHero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const { addToCart } = useContext(CartContext);

  // Gestion du formulaire d'email
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/leads", { email });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("❌ Une erreur est survenue. Veuillez réessayer.");
    }
  };

  // Récupérer les 3 derniers produits
  useEffect(() => {
    api
      .get("/products")
      .then((res) => {
        const lastThree = res.data.slice(-3).reverse(); // Récupère les 3 derniers produits
        setProducts(lastThree);

        const initialQuantities = {};
        lastThree.forEach((prod) => {
          initialQuantities[prod._id] = 1;
        });
        setQuantities(initialQuantities);
      })
      .catch((err) => console.error("Erreur lors du chargement des produits", err));
  }, []);

  // Gérer l'ajout au panier
  const handleQuantityChange = (productId, action) => {
    setQuantities((prev) => {
      const current = prev[productId] || 1;
      const updated = action === "increase" ? current + 1 : Math.max(1, current - 1);
      return { ...prev, [productId]: updated };
    });
  };

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");

    if (!token || token === "true") {
      alert("Veuillez vous connecter pour ajouter un produit au panier.");
      return;
    }

    try {
      const quantity = quantities[product._id] || 1;
      await api.post(
        "/cart/add",
        { productId: product._id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      addToCart({ ...product, quantity });
      alert("✅ Produit ajouté au panier !");
    } catch (error) {
      alert("Erreur lors de l'ajout au panier.");
      console.error(error);
    }
  };

  return (
    <div>
      {/* Section Hero */}
      <section
        className="min-h-screen flex flex-col items-center justify-center px-4 relative bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/main1.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />
        <div className="relative z-10 text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 drop-shadow-lg">
            Découvrez le goût de l’exclusivité
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-6">
            Recevez nos offres fastfood premium en avant-première.
          </p>

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-full p-1 pl-4 flex items-center shadow-lg max-w-md mx-auto"
            >
              <input
                type="email"
                required
                placeholder="Entrez votre email"
                className="flex-1 text-sm text-gray-700 bg-transparent py-2 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="bg-[#d35400] hover:bg-black text-white px-6 py-2 text-sm font-semibold rounded-full transition"
              >
                Go !
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-2 bg-white/20 p-3 rounded-full text-white font-semibold text-md">
              <MailCheck className="w-5 h-5" />
              Merci ! Vérifiez votre boîte mail 📩
            </div>
          )}
        </div>
      </section>

      {/* Section Produits phares */}
      {/* Section Produits phares */}
<section className="py-16 bg-white">
  <div className="max-w-6xl mx-auto px-4 text-center">
  <div className="text-left mb-10 px-6">
          {/* Ligne avec tiret à gauche et sous-titre */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm uppercase tracking-wide text-[#d35400]">
              — Yummy food BestSellers
            </span>
          </div>

          {/* Titre principal avec soulignement en dessous de 'récents' */}
          <h2 className="text-3xl font-extrabold text-gray-800 leading-tight">
            Nos{" "}
            <span className="relative text-[#d35400] inline-block">
              Meilleurs Plats
              {/* Soulignement comme dans l’image */}
              <svg
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
                className="absolute bottom-[-5px] left-0 w-full h-[6px]" 
              >
                <path
                  d="M10,5 Q25,10 50,5 Q75,0 90,5" 
                  fill="none"
                  stroke="#d35400"
                  strokeWidth="5"  
                />
              </svg>
            </span>
          </h2>
        </div>


    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {[{
        _id: "1",
        name: "Burger Royal",
        shortDesc: "Un burger juteux avec fromage, salade et sauce spéciale.",
        image: "/list_img_1.png",
        price: 12000,
      }, {
        _id: "2",
        name: "Burger Cheddar Deluxe",
        shortDesc: "Un burger avec du cheddar fondant, bacon et oignons caramélisés.",
        image: "/list_img_2.png",
        price: 15000,
      }, {
        _id: "3",
        name: "Burger BBQ Poulet",
        shortDesc: "Un burger épicé au poulet mariné et sauce barbecue.",
        image: "/list_img_4.png",
        price: 13000,
      }, {
        _id: "4",
        name: "Burger Veggie",
        shortDesc: "Burger végétarien avec légumes grillés et sauce crémeuse.",
        image: "/p_2.png",
        price: 11000,
      }].map((prod) => (
        <div
          key={prod._id}
          className="bg-white max-w-xs w-full mx-auto rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 px-5 py-5 flex flex-col items-center text-center"
        >
          {/* Image avec effet gris */}
          <div className="relative w-56 h-56 mb-6 flex items-center justify-center">
            <div className="absolute inset-0 z-0 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-gray-400/20 blur-2xl scale-110" />
            </div>

            <div className="z-10">
              <img
                src={prod.image}
                alt={prod.name}
                className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-800">{prod.name}</h3>
          <p className="text-sm text-gray-500 mt-1 mb-4 px-2">{prod.shortDesc}</p>

          <div className="flex items-center justify-between w-full gap-4 mt-auto">
            <div className="flex items-center shadow-sm rounded-md px-2 py-1 bg-white text-sm">
              <button className="px-1.5 text-gray-600 hover:text-orange-500">−</button>
              <span className="px-2 font-medium">1</span>
              <button className="px-1.5 text-gray-600 hover:text-orange-500">+</button>
            </div>

            <p className="text-md font-semibold text-gray-800 whitespace-nowrap">
              {prod.price.toLocaleString()} Ar
            </p>

            <button
              className="p-3 bg-white text-[#d35400] hover:bg-[#d35400] hover:text-white rounded-xl transition duration-200"
              title="Ajouter au panier"
            >
              <FiShoppingCart size={22} />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


     {/* Section Avantages Clients */}
<section
  className="py-24 bg-gray-50 relative"
  style={{
    backgroundImage: `url('/element-7.png'), url('/element-9.png')`,
    backgroundPosition: "top left, bottom right",
    backgroundSize: "150px 150px, 150px 150px",
    backgroundRepeat: "no-repeat, no-repeat",
  }}
>
  <div className="max-w-6xl mx-auto px-4 text-center">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      <div className="bg-[#d35400] p-8 rounded-lg shadow-lg text-white">
        <div className="flex items-center justify-center mb-5">
          <ShoppingCart className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-4">Livraison Gratuite</h3>
        <p className="text-white">
          Profitez de la livraison gratuite sur toutes vos commandes à partir de 50 000 Ar.
        </p>
      </div>

      <div className="bg-[#d35400] p-8 rounded-lg shadow-lg text-white">
        <div className="flex items-center justify-center mb-5">
          <Tag className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-4">Offres Exclusives</h3>
        <p className="text-white">
          Recevez des offres et réductions spéciales en tant que membre, directement dans votre boîte mail.
        </p>
      </div>

      <div className="bg-[#d35400] p-8 rounded-lg shadow-lg text-white">
        <div className="flex items-center justify-center mb-5">
          <Award className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-4">Programmes de Fidélité</h3>
        <p className="text-white">
          Accumulez des points à chaque commande et bénéficiez de réductions sur vos prochaines commandes.
        </p>
      </div>

    </div>
  </div>
</section>


      {/* Section Témoignages (modernisée) */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="text-left mb-10 px-6">
          {/* Ligne avec tiret à gauche et sous-titre */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm uppercase tracking-wide text-[#d35400]">
              — Yummy food Témoignages
            </span>
          </div>

          {/* Titre principal avec soulignement en dessous de 'récents' */}
          <h2 className="text-3xl font-extrabold text-gray-800 leading-tight">
            Nos{" "}
            <span className="relative text-[#d35400] inline-block">
              Critiques élogieuses
              {/* Soulignement comme dans l’image */}
              <svg
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
                className="absolute bottom-[-5px] left-0 w-full h-[6px]" 
              >
                <path
                  d="M10,5 Q25,10 50,5 Q75,0 90,5" 
                  fill="none"
                  stroke="#d35400"
                  strokeWidth="5"  
                />
              </svg>
            </span>
          </h2>
        </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Témoignages */}
            {[
              { name: "Aina R.", location: "Antananarivo", message: "Les burgers sont incroyablement savoureux et la commande en ligne est super facile !", image: "/t_1.png" },
              { name: "Mickaël T.", location: "Toamasina", message: "Service rapide, interface claire et livraison pile à l’heure. Je recommande à 100% !", image: "/t_2.png" },
              { name: "Farah N.", location: "Mahajanga", message: "Le meilleur fastfood digital de la région. Les tacos sont juste !", image: "/t_3.png" },
            ].map((testi, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img
                      src={testi.image}
                      alt={testi.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <p className="text-lg font-medium text-gray-800 mb-4">{testi.message}</p>
                <h4 className="text-sm font-semibold text-gray-600">
                  - {testi.name}, {testi.location}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>
{/* Section À propos */}
<section className="py-20 bg-gray-100 px-6">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between">
          {/* Image à gauche */}
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <img
              src="/about-img-1.png" // Remplacer par votre image
              alt="Yummy Food"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Texte à droite */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              À propos de Yummy Food
            </h2>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              Chez <span className="text-[#d35400] font-semibold">Yummy Food</span>, nous vous offrons une expérience culinaire rapide et savoureuse. Des recettes traditionnelles et modernes, adaptées à toutes vos envies : burgers, tacos, snacks gourmands et bien plus encore.
            </p>
            <p className="text-md text-gray-600">
              Commandez facilement où que vous soyez et profitez d'ingrédients de qualité.
            </p>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-[#120a04] text-gray-300 pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-y-10 gap-x-8">
          {/* Branding */}
          <div>
  <img 
    src="/logo.png" 
    alt="Yummy Food Logo" 
    className="w-40 h-auto mb-4" 
  />
  <p className="text-sm text-gray-400 leading-relaxed">
    Une expérience de commande <br /> simple, rapide et savoureuse.
  </p>
</div>


          {/* Navigation */}
          <nav aria-label="Navigation principale">
            <h4 className="text-lg font-semibold text-white mb-3">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-[#d35400] transition">Accueil</Link></li>
              <li><Link to="/produits" className="hover:text-[#d35400] transition">Produits</Link></li>
              <li><Link to="/panier" className="hover:text-[#d35400] transition">Panier</Link></li>
              <li><Link to="/contact" className="hover:text-[#d35400] transition">Contact</Link></li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#d35400]" />
                <span>+261 34 12 345 67</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#d35400]" />
                <span>contact@montunnel.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#d35400]" />
                <span>Antananarivo, Madagascar</span>
              </li>
            </ul>
          </div>

          {/* Réseaux sociaux */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Suivez-nous</h4>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="hover:text-[#d35400] transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-[#d35400] transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-[#d35400] transition">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} <span className="text-white">YummyFood</span>. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}
