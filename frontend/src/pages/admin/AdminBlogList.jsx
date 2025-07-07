// pages/admin/AdminBlogList.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import api from "../../services/axios"; // ✅ Import de l’instance axios centralisée

const AdminBlogList = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await api.get("/blog"); // ✅ Utilisation d'api
      setPosts(res.data);
    } catch (err) {
      console.error("Erreur récupération articles", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("❗ Voulez-vous vraiment supprimer cet article ?")) return;
    try {
      await api.delete(`/blog/${id}`); // ✅ Utilisation d'api
      setPosts(posts.filter((post) => post._id !== id));
    } catch (err) {
      console.error("Erreur suppression article", err);
      alert("❌ Erreur lors de la suppression.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Liste des Articles</h2>
        <Link
          to="/admin/blog-editor"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <PlusCircle size={18} />
          <span>Créer un article</span>
        </Link>
      </div>

      {posts.length === 0 ? (
        <p>Aucun article pour le moment.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className="border rounded p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div>
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="text-sm text-gray-500">{post.excerpt}</p>
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/admin/blog-editor/${post._id}`}
                  className="flex items-center gap-1 text-blue-600 hover:underline"
                >
                  <Pencil size={16} /> Modifier
                </Link>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="flex items-center gap-1 text-red-600 hover:underline"
                >
                  <Trash2 size={16} /> Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBlogList;
