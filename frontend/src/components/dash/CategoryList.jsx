import React, { useEffect, useState } from 'react';
import { fetchCategories } from "../../services/api";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    getCategories();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Catégories</h2>
      <ul className="list-disc pl-5">
        {categories.map((category) => (
          <li key={category._id} className="text-gray-700">{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
