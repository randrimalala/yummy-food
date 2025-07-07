import React, { useEffect, useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FiEdit2, FiX } from "react-icons/fi";
import api from "../../services/axios"; // ✅ Utilise l'instance personnalisée

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    authorName: "",
    rating: 5,
    content: "",
  });
  const [success, setSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const res = await api.get(`/products/${productId}/reviews`);
      setReviews(res.data);
    } catch (err) {
      console.error("❌ Erreur récupération avis", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.authorName || !newReview.content) return;

    try {
      await api.post(`/products/${productId}/reviews`, newReview);
      setNewReview({ authorName: "", rating: 5, content: "" });
      setSuccess(true);
      fetchReviews();
      setTimeout(() => {
        setSuccess(false);
        setShowForm(false);
      }, 2000);
    } catch (err) {
      console.error("❌ Erreur ajout avis", err);
    }
  };

  return (
    <div className="mt-12 relative">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Avis des clients ({reviews.length})
      </h2>

      {reviews.length === 0 ? (
        <p className="text-gray-500 mb-6">Aucun avis pour ce produit.</p>
      ) : (
        <ul className="space-y-6 mb-10">
          {reviews.map((r) => (
            <li
              key={r._id}
              className="bg-white shadow-md rounded-xl p-5 border border-gray-100"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-base font-semibold text-gray-800">
                  {r.authorName}
                </span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) =>
                    i < r.rating ? (
                      <FaStar key={i} className="text-yellow-400" />
                    ) : (
                      <FaRegStar key={i} className="text-gray-300" />
                    )
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {r.content}
              </p>
            </li>
          ))}
        </ul>
      )}

      {/* Bouton d'ouverture du formulaire */}
      <button
        onClick={() => setShowForm(true)}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        <FiEdit2 />
        Rédiger un avis
      </button>

      {/* Toast form flottant */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="w-full max-w-md bg-white/80 shadow-2xl backdrop-blur-md rounded-xl p-6 relative">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800">
                Laisser un avis
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-red-500"
              >
                <FiX size={20} />
              </button>
            </div>

            {success && (
              <p className="text-green-600 mb-3 text-sm">
                ✅ Merci ! Votre avis sera visible après validation.
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Votre nom"
                className="w-full bg-gray-50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={newReview.authorName}
                onChange={(e) =>
                  setNewReview({ ...newReview, authorName: e.target.value })
                }
                required
              />

              <select
                className="w-full bg-gray-50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={newReview.rating}
                onChange={(e) =>
                  setNewReview({
                    ...newReview,
                    rating: parseInt(e.target.value),
                  })
                }
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {n} étoile{n > 1 && "s"}
                  </option>
                ))}
              </select>

              <textarea
                placeholder="Votre avis"
                rows={4}
                className="w-full bg-gray-50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={newReview.content}
                onChange={(e) =>
                  setNewReview({ ...newReview, content: e.target.value })
                }
                required
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Envoyer l'avis
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
