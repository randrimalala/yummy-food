import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PageHeader from "../../components/client/PageHeader";
import ProductRecommendations from "../../components/client/ProductRecommendations";
import { CartContext } from "../../context/CartContext";
import ProductReviews from "./ProductReviews";
import { FiShoppingCart, FiPlus, FiMinus } from "react-icons/fi";

const DetailProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("❌ Erreur chargement produit", err));
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token || token === "true") {
      alert("Veuillez vous connecter pour ajouter un produit au panier.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/cart/add",
        { productId: product._id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      addToCart({ ...product, quantity });
      setMessage("✅ Produit ajouté au panier !");
    } catch (error) {
      alert("Erreur lors de l'ajout au panier.");
    }
  };

  const changeQuantity = (type) => {
    setQuantity((prev) => {
      if (type === "decrease" && prev > 1) return prev - 1;
      if (type === "increase") return prev + 1;
      return prev;
    });
  };

  if (!product) {
    return <div className="text-center mt-10 text-gray-500">Chargement...</div>;
  }

  return (
    <>
      <PageHeader title="Détail produit" />
      <div className="p-6 bg-gradient-to-b from-white to-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-md px-8 py-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* IMAGE AVEC REFLET */}
          <div className="relative w-full flex items-center justify-center">
            <div className="absolute w-72 h-72 bg-gray-500 opacity-20 blur-2xl rounded-full z-0" />
            <img
              src={
                product.image
                  ? `http://localhost:5000/uploads/${product.image}`
                  : "https://via.placeholder.com/300x300?text=No+Image"
              }
              alt={product.name}
              className="relative z-10 w-full max-h-[400px] object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* DETAILS */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-sm text-gray-500 mb-1">
              Catégorie :{" "}
              <span className="font-semibold text-gray-700">
                {product.category?.name || "Non défini"}
              </span>
            </p>
            <p className="text-gray-600 mt-2">{product.shortDesc}</p>
            <p className="text-gray-700 mt-3">{product.longDesc}</p>
            <p className="text-[#d35400] text-2xl font-bold mt-4 mb-4">
              {product.price} Ar
            </p>

            {/* BLOC QUANTITÉ */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => changeQuantity("decrease")}
                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-200 transition"
              >
                <FiMinus className="text-gray-700" />
              </button>
              <span className="text-lg font-semibold text-gray-800">{quantity}</span>
              <button
                onClick={() => changeQuantity("increase")}
                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-200 transition"
              >
                <FiPlus className="text-gray-700" />
              </button>
            </div>

            {/* BOUTON PANIER */}
            <button
              onClick={handleAddToCart}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#d35400] border border-[#d35400] hover:bg-[#d35400] hover:text-white transition-colors duration-300"
            >
              <FiShoppingCart size={20} />
              Ajouter au panier
            </button>

            {message && (
              <p className="mt-4 text-sm font-medium text-green-600">{message}</p>
            )}
          </div>
        </div>

        <ProductRecommendations productId={product._id} mode="similar" />

        <div className="mt-12">
          <ProductReviews productId={product._id} />
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
