import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/client/PageHeader";
import { CartContext } from "../../context/CartContext";
import CartModal from "../../components/client/CartModal";
import { FiShoppingCart } from "react-icons/fi";
import api from "../../services/axios"; // ✅ Utilisation d'axios centralisé

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [showCart, setShowCart] = useState(false);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    api
      .get("/products")
      .then((res) => {
        setProducts(res.data);
        const initialQuantities = {};
        res.data.forEach((prod) => {
          initialQuantities[prod._id] = 1;
        });
        setQuantities(initialQuantities);
      })
      .catch((err) =>
        console.error("Erreur lors du chargement des produits", err)
      );
  }, []);

  const handleQuantityChange = (productId, action) => {
    setQuantities((prev) => {
      const current = prev[productId] || 1;
      const updated =
        action === "increase" ? current + 1 : Math.max(1, current - 1);
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
    <>
      {showCart && (
        <CartModal show={showCart} onClose={() => setShowCart(false)} />
      )}

      <PageHeader title="Produits" onOpenCart={() => setShowCart(true)} />
      <div className="p-6 bg-gradient-to-b from-white to-gray-50 min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((prod) => (
            <div
              key={prod._id}
              className="bg-white rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 px-6 py-6 flex flex-col items-center text-center group"
            >
              <div className="relative w-44 h-44 mb-5 flex items-center justify-center">
                <div className="absolute inset-0 z-0 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-gray-500 opacity-20 blur-2xl" />
                </div>

                <Link to={`/produits/${prod._id}`} className="z-10">
                  <img
                    src={
                      prod.image
                        ? `${api.defaults.baseURL.replace("/api", "")}/uploads/${prod.image}`
                        : "https://via.placeholder.com/200x150?text=No+Image"
                    }
                    alt={prod.name}
                    className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                  />
                </Link>
              </div>

              <h3 className="text-xl font-bold text-gray-800">{prod.name}</h3>
              <p className="text-gray-500 text-sm mt-1 mb-4 px-2">
                {prod.shortDesc ||
                  "Délicieux produit disponible dans notre menu."}
              </p>

              <div className="flex items-center justify-between w-full mt-auto gap-4">
                <div className="flex items-center shadow-sm rounded-md px-2 py-1 bg-white text-sm">
                  <button
                    onClick={() => handleQuantityChange(prod._id, "decrease")}
                    className="px-1.5 text-gray-600 hover:text-orange-500"
                  >
                    −
                  </button>
                  <span className="px-2 font-medium">
                    {quantities[prod._id]}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(prod._id, "increase")}
                    className="px-1.5 text-gray-600 hover:text-orange-500"
                  >
                    +
                  </button>
                </div>

                <p className="text-lg font-semibold text-gray-800 whitespace-nowrap">
                  {prod.price} Ar
                </p>

                <button
                  onClick={() => handleAddToCart(prod)}
                  className="p-3 bg-white text-[#d35400] hover:bg-[#d35400] hover:text-white rounded-xl transition duration-200"
                  title="Ajouter au panier"
                >
                  <FiShoppingCart size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllProducts;
