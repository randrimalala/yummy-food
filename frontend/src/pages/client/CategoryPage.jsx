import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function CategoryPage() {
  const { id } = useParams(); // ID de la catégorie dans l'URL
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/categories/${id}`)
      .then((res) => {
        setCategory(res.data.category);
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement :", err);
      });
  }, [id]);

  if (!category) {
    return <div className="p-6">Chargement...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Produits dans la catégorie : {category.name}
      </h2>

      {products.length === 0 ? (
        <p className="text-gray-500">Aucun produit trouvé.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((prod) => (
            <div
              key={prod._id}
              className="border border-gray-300 rounded-md px-4 py-3 bg-white w-full flex flex-col"
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

              <h3 className="text-gray-800 font-medium text-lg truncate">{prod.name}</h3>
              <p className="text-gray-600 text-sm mt-1 truncate">{prod.shortDesc}</p>
              <p className="text-indigo-600 font-semibold text-lg mt-2">
                {prod.price} Ar
              </p>

              <Link
                to={`/produits/${prod._id}`}
                className="mt-3 text-sm text-blue-600 hover:underline"
              >
                Voir détails
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
