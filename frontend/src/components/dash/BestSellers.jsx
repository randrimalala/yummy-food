import React, { useEffect, useState } from 'react';
import { fetchBestSellers } from "../../services/api";

const BestSellers = () => {
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    const getBestSellers = async () => {
      const data = await fetchBestSellers();
      setBestSellers(data);
    };
    getBestSellers();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Produits les plus commandés</h2>
      <ul className="list-disc pl-5">
        {bestSellers.map((product) => (
          <li key={product._id} className="text-gray-700">{product.name} - {product.totalSold} ventes</li>
        ))}
      </ul>
    </div>
  );
};

export default BestSellers;
