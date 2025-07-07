import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  PackagePlus,
  Eye,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  LogOut,
  Layers,
  Utensils,
  FileText, // ✅ icône blog
} from "lucide-react";

export default function AdminSidebar() {
  const location = useLocation();

  const [open, setOpen] = useState({
    categorie:
      location.pathname.includes("/admin/categories") ||
      location.pathname.includes("/admin/add-category"),
    produit:
      location.pathname.includes("/admin/products") ||
      location.pathname.includes("/admin/add-product"),
  });

  const toggle = (section) => {
    setOpen((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <aside className="fixed top-0 left-0 h-screen w-20 md:w-64 bg-white border-r border-gray-300 shadow-sm overflow-y-auto transition-all duration-300 z-50">
      <h2 className="text-center font-bold text-xl text-indigo-600 mb-6 mt-6 hidden md:block">
        Admin Panel
      </h2>

      <nav className="flex flex-col px-2">
        {/* Catégories */}
        <button
          onClick={() => toggle("categorie")}
          className="flex items-center justify-between px-2 py-3 text-gray-700 hover:bg-gray-100 rounded"
        >
          <span className="flex items-center gap-3">
            <Layers size={18} /> <span className="hidden md:inline">Catégories</span>
          </span>
          <span className="hidden md:inline">
            {open.categorie ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </span>
        </button>
        {open.categorie && (
          <div className="ml-8 flex flex-col text-sm text-gray-600">
            <Link
              to="/admin/add-category"
              className={`py-2 hover:text-indigo-500 ${
                location.pathname === "/admin/add-category"
                  ? "text-indigo-500 font-semibold"
                  : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <PackagePlus size={16} /> <span className="hidden md:inline">Ajouter</span>
              </div>
            </Link>
            <Link
              to="/admin/categories"
              className={`py-2 hover:text-indigo-500 ${
                location.pathname === "/admin/categories"
                  ? "text-indigo-500 font-semibold"
                  : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <Eye size={16} /> <span className="hidden md:inline">Voir</span>
              </div>
            </Link>
          </div>
        )}

        {/* Produits */}
        <button
          onClick={() => toggle("produit")}
          className="flex items-center justify-between px-2 py-3 text-gray-700 hover:bg-gray-100 rounded"
        >
          <span className="flex items-center gap-3">
            <Utensils size={18} /> <span className="hidden md:inline">Produits</span>
          </span>
          <span className="hidden md:inline">
            {open.produit ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </span>
        </button>
        {open.produit && (
          <div className="ml-8 flex flex-col text-sm text-gray-600">
            <Link
              to="/admin/add-product"
              className={`py-2 hover:text-indigo-500 ${
                location.pathname === "/admin/add-product"
                  ? "text-indigo-500 font-semibold"
                  : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <PackagePlus size={16} /> <span className="hidden md:inline">Ajouter</span>
              </div>
            </Link>
            <Link
              to="/admin/products"
              className={`py-2 hover:text-indigo-500 ${
                location.pathname === "/admin/products"
                  ? "text-indigo-500 font-semibold"
                  : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <Eye size={16} /> <span className="hidden md:inline">Voir</span>
              </div>
            </Link>
          </div>
        )}

        {/* Commandes */}
        <Link
          to="/admin/orders"
          className={`flex items-center py-3 px-2 gap-3 rounded transition-all duration-200 ${
            location.pathname === "/admin/orders"
              ? "bg-indigo-500/10 border-r-4 md:border-r-[6px] border-indigo-500 text-indigo-500"
              : "hover:bg-gray-100 text-gray-700"
          }`}
        >
          <ShoppingCart size={18} />
          <span className="hidden md:inline">Commandes</span>
        </Link>

        {/* ✅ Blog */}
        <Link
          to="/admin/blog"
          className={`flex items-center py-3 px-2 gap-3 rounded transition-all duration-200 ${
            location.pathname === "/admin/blog"
              ? "bg-indigo-500/10 border-r-4 md:border-r-[6px] border-indigo-500 text-indigo-500"
              : "hover:bg-gray-100 text-gray-700"
          }`}
        >
          <FileText size={18} />
          <span className="hidden md:inline">Blog</span>
        </Link>

        {/* Déconnexion */}
        <Link
          to="/"
          className="flex items-center py-3 px-2 gap-3 hover:bg-gray-100 text-gray-700 rounded"
        >
          <LogOut size={18} />
          <span className="hidden md:inline">Déconnexion</span>
        </Link>
      </nav>
    </aside>
  );
}
