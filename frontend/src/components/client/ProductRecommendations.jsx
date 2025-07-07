import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductRecommendations = ({ productId, mode = "similar" }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let res;
        if (mode === "popular") {
            res = await axios.get("http://localhost:5000/api/products/popular");
        } else {
            res = await axios.get(`http://localhost:5000/api/products/${productId}/similar`);
        }

        // Vérification que la réponse est un tableau
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          console.error("La réponse n'est pas un tableau:", res.data);
          setProducts([]);
        }
      } catch (err) {
        console.error("Erreur chargement recommandations", err);
        setProducts([]);
      }
    };
    fetchProducts();
  }, [productId, mode]);

  if (!Array.isArray(products) || products.length === 0) return null;

  return (
    <div className="my-10 px-4 max-w-7xl mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">
        {mode === "popular" ? "Produits populaires" : "Produits similaires"}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((prod) => (
          <div
            key={prod._id || prod.id} // clé unique
            className="bg-white border rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
          >
            <img
              src={
                prod.image
                  ? `http://localhost:5000/uploads/${prod.image}`
                  : "https://via.placeholder.com/200x150?text=No+Image"
              }
              alt={prod.name}
              className="transition-transform duration-300 hover:scale-105 max-h-40 object-contain mx-auto mb-3"
            />
            <div className="p-3">
              <h4 className="font-semibold text-gray-700 truncate">{prod.name}</h4>
              <p className="text-sm text-gray-500 mt-1">{prod.price} Ar</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductRecommendations;
