import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaCommentDots } from "react-icons/fa";
import api from "../../services/axios";
import PageHeader from "../../components/client/PageHeader";

const BlogGrid = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blog");
        setBlogs(res.data);
      } catch (err) {
        console.error("Erreur de chargement des blogs :", err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <PageHeader title="Tous les articles" />
      <section className="py-12 bg-white text-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          {blogs.length === 0 ? (
            <p className="text-center text-gray-500">Aucun article disponible.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {blogs.map((post) => (
                <div
                  key={post._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
                >
                  <img
                    src={`http://localhost:5000${post.image}`}
                    alt={post.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-5 flex flex-col justify-between h-[270px]">
                    <div>
                      <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full mb-2 inline-block">
                        FOOD
                      </span>

                      <h3 className="text-lg font-bold mb-2 text-gray-800 line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                        {post.content.replace(/<[^>]+>/g, "").slice(0, 100)}...
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <FaEye className="text-xs" /> {post.views || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaCommentDots className="text-xs" /> {post.comments?.length || 0}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(`/blog/${post.slug}`)}
                      className="mt-4 text-sm text-orange-600 hover:underline font-medium"
                    >
                      Lire l'article →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogGrid;
