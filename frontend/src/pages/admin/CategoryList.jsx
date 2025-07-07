import { useEffect, useState } from "react";
import AdminBreadcrumb from "../../components/admin/AdminBreadcrumb";
import api from "../../services/axios"; // ✅ import de l'instance axios centralisée

export default function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get("/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error("Erreur récupération catégories :", err);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 md:px-10 text-gray-800">
      {/* Breadcrumb */}
      <AdminBreadcrumb
        items={[
          { label: "Dashboard", href: "/admin" },
          { label: "Catégories", active: true },
        ]}
      />

      {categories.length === 0 ? (
        <p className="text-gray-500">Aucune catégorie trouvée.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <li
              key={cat._id}
              className="flex items-center gap-6 p-4 bg-white rounded-lg"
            >
              <img
                src={`http://localhost:5000/uploads/${cat.image}`}
                alt={cat.name}
                className="w-20 h-20 object-cover rounded-full"
                style={{ border: "none", boxShadow: "none" }}
              />
              <div>
                <span className="text-lg font-semibold text-gray-800 block">
                  {cat.name}
                </span>
                <span className="text-sm text-gray-500">
                  {cat.products?.length || 0} produit
                  {cat.products?.length > 1 ? "s" : ""}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
