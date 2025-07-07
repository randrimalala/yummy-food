import { useEffect, useState } from "react";
import AdminBreadcrumb from "../../components/admin/AdminBreadcrumb";
import api from "../../services/axios"; // ✅ Remplace axios par api

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Erreur de chargement des produits", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Voulez-vous vraiment supprimer ce produit ?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((prod) => prod._id !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression du produit :", err);
      alert("❌ Erreur lors de la suppression");
    }
  };

  const handlePublish = async (id) => {
    try {
      const res = await api.post(`/products/${id}/publish`);
      alert("✅ Publication Facebook lancée !");
      console.log(res.data);
    } catch (err) {
      console.error("❌ Erreur publication Facebook :", err.response?.data || err.message);
      alert("❌ Erreur lors de la publication");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 text-gray-800">
      <AdminBreadcrumb
        items={[
          { label: "Dashboard", href: "/admin" },
          { label: "Produits", active: true },
        ]}
      />

      <h3 className="text-2xl font-bold mb-6">Liste des produits</h3>

      {products.length === 0 ? (
        <p className="text-gray-500">Aucun produit disponible.</p>
      ) : (
        <ul className="space-y-6">
          {products.map((prod) => (
            <li
              key={prod._id}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-white shadow-md rounded-xl p-4"
            >
              <img
                src={
                  prod.image
                    ? `http://localhost:5000/uploads/${prod.image}`
                    : "https://via.placeholder.com/200x150?text=No+Image"
                }
                width={100}
                alt={prod.name}
                className="rounded-lg object-cover border"
              />

              <div className="flex-1 space-y-1">
                <h4 className="text-xl font-semibold">{prod.name}</h4>
                <p className="text-gray-700">
                  <span className="font-medium">{prod.price} Ar</span> – {prod.stock} en stock
                </p>
                <p className="text-sm text-gray-500">
                  Catégorie : {prod.category?.name || "N/A"}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleDelete(prod._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Supprimer
                </button>
                <button
                  onClick={() => handlePublish(prod._id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Publier
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
