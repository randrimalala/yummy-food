import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/client/PageHeader";
import { FiPlus, FiMinus, FiX } from "react-icons/fi";
import api from "../../services/axios"; // ✅ Utilise axios centralisé

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/cart")
      .then((res) => {
        setCartItems(Array.isArray(res.data.items) ? res.data.items : []);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement du panier", err);
        setError("❌ Vous devez être connecté pour voir le panier.");
      });
  }, []);

  const removeItem = (productId) => {
    api
      .delete(`/cart/remove/${productId}`)
      .then(() => {
        setCartItems((prev) =>
          prev.filter((item) => item.product?._id !== productId)
        );
      })
      .catch((err) => console.error("Erreur lors de la suppression", err));
  };

  const updateQuantity = (productId, newQuantity, stock) => {
    if (newQuantity < 1 || newQuantity > stock) return;
    api
      .put(`/cart/update/${productId}`, { quantity: newQuantity })
      .then((res) => setCartItems(res.data.items))
      .catch((err) =>
        console.error("Erreur lors de la mise à jour de la quantité", err)
      );
  };

  const total = cartItems.reduce((acc, item) => {
    if (!item.product) return acc;
    return acc + item.quantity * item.product.price;
  }, 0);

  if (error) {
    return <div className="p-6 text-red-500 text-center">{error}</div>;
  }

  return (
    <>
      <PageHeader title="Votre panier" />

      <main className="p-6 min-h-screen bg-white max-w-7xl mx-auto">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600 mt-10 text-lg">
            Votre panier est vide.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Produits */}
            <div className="md:col-span-2 bg-white rounded-2xl shadow p-6">
              <div className="pb-4 mb-4 font-semibold text-gray-700 grid grid-cols-[30px_1fr_1fr_1fr] text-sm gap-4">
                <span></span>
                <span>Produit</span>
                <span className="text-center">Quantité</span>
                <span className="text-right">Sous-total</span>
              </div>

              {cartItems.map((item) =>
                item.product ? (
                  <div
                    key={item._id}
                    className="grid grid-cols-[30px_1fr_1fr_1fr] items-center py-4 gap-4"
                  >
                    <button
                      onClick={() => removeItem(item.product._id)}
                      className="p-[2px] w-7 h-7 rounded-full border text-gray-400 hover:text-red-500 hover:border-red-500 flex items-center justify-center transition"
                      title="Supprimer"
                    >
                      <FiX size={18} />
                    </button>

                    <div className="flex items-center gap-3">
                      <img
                        src={
                          item.product.image
                            ? `${api.defaults.baseURL.replace("/api", "")}/uploads/${item.product.image}`
                            : "https://via.placeholder.com/100x80?text=No+Image"
                        }
                        alt={item.product.name}
                        className="w-20 h-16 object-contain"
                      />
                      <div className="font-medium text-gray-900">
                        {item.product.name}
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product._id,
                            item.quantity - 1,
                            item.product.stock
                          )
                        }
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
                      >
                        <FiMinus />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product._id,
                            item.quantity + 1,
                            item.product.stock
                          )
                        }
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
                      >
                        <FiPlus />
                      </button>
                    </div>

                    <div className="text-right font-semibold text-gray-800">
                      {(item.product.price * item.quantity).toLocaleString()} Ar
                    </div>
                  </div>
                ) : (
                  <div
                    key={item._id}
                    className="text-gray-400 italic py-4 text-center col-span-5"
                  >
                    (Produit supprimé)
                  </div>
                )
              )}

              <div className="mt-6 text-left">
                <button
                  onClick={() => navigate("/produits")}
                  className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition"
                >
                  ← Continue Shopping
                </button>
              </div>
            </div>

            {/* Résumé de la commande */}
            <div className="bg-white rounded-2xl shadow p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Order Summary
              </h2>
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>{total.toLocaleString()} Ar</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Standard Delivery</span>
                <span>5.000 Ar</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Coupon Discount</span>
                <span>-5.000 Ar</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-orange-600 pt-2">
                <span>Total</span>
                <span>{total.toLocaleString()} Ar</span>
              </div>
              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
              >
                Proceed To Checkout →
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Cart;
