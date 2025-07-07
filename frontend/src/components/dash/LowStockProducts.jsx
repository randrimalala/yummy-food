import React, { useEffect, useState } from 'react';
import { fetchLowStockProducts } from '../../services/api';

const LowStockProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetchLowStockProducts();
      setProducts(res);
    };
    load();
  }, []);

  return (
    <div className="bg-white p-4 shadow rounded mb-6">
      <h2 className="text-lg font-semibold mb-2">⚠️ Produits à surveiller</h2>
      <ul>
        {products.map((p) => (
          <li key={p._id} className="border-b py-2 flex justify-between">
            <span>{p.name}</span>
            <span className="text-red-600 font-bold">{p.stock} en stock</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LowStockProducts;
