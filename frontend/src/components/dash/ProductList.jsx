import React, { useEffect, useState } from 'react';
import { fetchProducts } from "../../services/api";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    getProducts();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Produits</h2>
      <ul className="list-disc pl-5">
        {products.map((product) => (
          <li key={product._id} className="text-gray-700">{product.name} - {product.price}€</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
