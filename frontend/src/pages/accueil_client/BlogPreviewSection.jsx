import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaCommentDots } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import api from "../../services/axios"; // ✅ utilise l'instance axios personnalisée

export default function BlogPreviewSection() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/blog")
      .then((res) => setPosts(res.data))
      .catch((err) => {
        console.error("Erreur chargement articles", err);
        setPosts([]);
      });
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-left mb-10 px-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm uppercase tracking-wide text-[#d35400]">
              — Yummy food Blogs
            </span>
          </div>

          <h2 className="text-3xl font-extrabold text-gray-800 leading-tight">
            Our Dynamic{" "}
            <span className="relative text-[#d35400] inline-block">
              Recent Blogs
              <svg
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
                className="absolute bottom-[-5px] left-0 w-full h-[6px]"
              >
                <path
                  d="M10,5 Q25,10 50,5 Q75,0 90,5"
                  fill="none"
                  stroke="#d35400"
                  strokeWidth="5"
                />
              </svg>
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {posts.map((post) => (
            <div key={post._id} className="relative">
              <div className="px-4 -mx-2">
                <img
                  src={`http://localhost:5000${post.image}`}
                  alt={post.title}
                  className="rounded-2xl w-full h-64 object-cover"
                />
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 mx-4 -mt-10 relative z-10">
                <span className="bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full inline-block mb-3">
                  FOOD
                </span>

                <h3 className="text-lg font-bold text-gray-800 mb-3 leading-snug">
                  {post.title}
                </h3>

                <div className="flex items-center text-gray-500 text-sm gap-4 mb-4">
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1">
                    <FaEye className="text-[13px]" /> {post.views || 0} Views
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCommentDots className="text-[13px]" />{" "}
                    {post.comments?.length || 0} Comment
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <img
                      src="/user.jpg"
                      alt="Author"
                      className="w-7 h-7 rounded-full"
                    />
                    <span className="text-blue-600 font-medium">Robincia</span>
                    <span className="text-gray-400">— 5 Min Read</span>
                  </div>

                  <button
                    onClick={() => navigate(`/blog/${post.slug}`)}
                    className="group flex items-center gap-2 px-3 py-1.5 text-xs font-medium border border-[#d35400] text-[#d35400] rounded-md hover:bg-[#d35400] hover:text-white transition"
                  >
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#d35400] group-hover:bg-white transition">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 text-white group-hover:text-[#d35400] transition"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 17L17 7M7 7h10v10"
                        />
                      </svg>
                    </span>
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
