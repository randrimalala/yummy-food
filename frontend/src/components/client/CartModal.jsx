import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios"; // ✅ Import Axios centralisé

const CartModal = ({ show, onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!show) return;

    api
      .get("/cart")
      .then((res) => {
        setCartItems(res.data.items || []);
      })
      .catch(() => {
        setError("❌ Vous devez être connecté pour voir le panier.");
      });
  }, [show]);

  const removeItem = (productId) => {
    api
      .delete(`/cart/remove/${productId}`)
      .then(() => {
        setCartItems((prev) =>
          prev.filter((item) => item.product._id !== productId)
        );
      })
      .catch(() => {
        setError("Erreur lors de la suppression du produit.");
      });
  };

  const updateQuantity = (productId, newQuantity, stock) => {
    if (newQuantity < 1 || newQuantity > stock) return;

    api
      .put(`/cart/update/${productId}`, { quantity: newQuantity })
      .then((res) => {
        setCartItems(res.data.items);
      })
      .catch(() => {
        setError("Erreur lors de la mise à jour de la quantité.");
      });
  };

  const total = cartItems.reduce((acc, item) => {
    if (!item.product) return acc;
    return acc + item.quantity * item.product.price;
  }, 0);

  if (!show) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white/95 shadow-2xl z-50 p-6 overflow-y-auto transition-transform duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Votre panier</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 text-xl"
          >
            ✕
          </button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {cartItems.length === 0 ? (
          <p className="text-gray-600 text-center">Votre panier est vide.</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) =>
              item.product ? (
                <div
                  key={item._id}
                  className="flex gap-4 items-center p-3 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <img
                    src={
                      item.product.image
                        ? `${api.defaults.baseURL.replace("/api", "")}/uploads/${item.product.image}`
                        : "https://via.placeholder.com/80x80?text=No+Image"
                    }
                    alt={item.product.name}
                    className="w-20 h-20 rounded-xl object-cover"
                  />

                  <div className="flex-1">
                    <h4 className="text-base font-semibold text-gray-800 mb-1">
                      {item.product.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product._id,
                            item.quantity - 1,
                            item.product.stock
                          )
                        }
                        className="px-2 py-1 bg-[#f5f5f5] text-[#d35400] hover:bg-[#d35400] hover:text-white rounded-md transition"
                      >
                        −
                      </button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product._id,
                            item.quantity + 1,
                            item.product.stock
                          )
                        }
                        className="px-2 py-1 bg-[#f5f5f5] text-[#d35400] hover:bg-[#d35400] hover:text-white rounded-md transition"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-sm font-semibold text-[#d35400] whitespace-nowrap">
                    {(item.product.price * item.quantity).toLocaleString()} Ar
                  </div>
                </div>
              ) : (
                <div
                  key={item._id}
                  className="text-gray-400 italic bg-white rounded-xl shadow-md p-3"
                >
                  (Produit supprimé)
                </div>
              )
            )}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="mt-6 space-y-3">
            <div className="text-right font-semibold text-gray-800 text-lg">
              Total : {total.toLocaleString()} Ar
            </div>

            <div className="flex justify-between items-center gap-4 mt-6">
              <button
                onClick={() => navigate("/panier")}
                className="group flex items-center gap-2 px-4 py-2 text-sm font-medium border border-[#d35400] text-[#d35400] rounded-md hover:bg-[#d35400] hover:text-white transition"
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#d35400] group-hover:bg-white transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5 text-white group-hover:text-[#d35400] transition"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </span>
                Voir le panier
              </button>

              <button
                onClick={() => navigate("/checkout")}
                className="group flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#120a04] text-white border border-[#120a04] rounded-md hover:bg-[#d35400] hover:text-white hover:border-[#d35400] transition"
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white group-hover:bg-white transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5 text-[#120a04] group-hover:text-[#d35400] transition"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </span>
                Passer à la commande
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartModal;
