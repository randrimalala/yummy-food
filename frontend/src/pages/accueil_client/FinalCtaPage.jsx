import React from "react";
import { useNavigate } from "react-router-dom";

const FinalCtaPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-orange-500 text-white py-16 px-6 text-center">
      <h2 className="text-4xl font-bold mb-4">Prêt à savourer nos délices ?</h2>
      <p className="text-lg mb-8 max-w-xl mx-auto">
        Commandez dès maintenant et recevez votre repas en un rien de temps !
      </p>
      <button
        onClick={() => navigate("/products")}
        className="bg-white text-orange-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition"
      >
        Voir les produits
      </button>
    </div>
  );
};

export default FinalCtaPage;
