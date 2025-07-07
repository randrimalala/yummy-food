import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../../components/client/PageHeader";
import api from "../../services/axios";

const SinglePost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ authorName: "", content: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postRes = await api.get(`/blog/${slug}`);
        setPost(postRes.data);

        await api.post(`/blog/${postRes.data._id}/view`);

        const commentsRes = await api.get(`/blog/${postRes.data._id}/comments`);
        setComments(commentsRes.data);
      } catch (err) {
        console.error("Erreur chargement article ou commentaires", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  const handleLikePost = async () => {
    if (!post) return;
    try {
      const res = await api.post(`/blog/${post._id}/like`);
      setPost((prev) => ({ ...prev, likes: res.data.likes }));
    } catch (err) {
      console.error("Erreur like article", err);
    }
  };

  const handleLikeComment = async (commentId) => {
    try {
      const res = await api.post(`/blog/comments/${commentId}/like`);
      setComments((prev) =>
        prev.map((c) => (c._id === commentId ? { ...c, likes: res.data.likes } : c))
      );
    } catch (err) {
      console.error("Erreur like commentaire", err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.authorName.trim() || !newComment.content.trim()) return;

    try {
      await api.post(`/blog/${post._id}/comments`, newComment);
      setNewComment({ authorName: "", content: "" });
      const res = await api.get(`/blog/${post._id}/comments`);
      setComments(res.data);
    } catch (err) {
      console.error("Erreur ajout commentaire", err);
    }
  };

  if (loading) return <div className="p-8">Chargement...</div>;
  if (!post) return <div className="p-8">Article introuvable</div>;

  return (
    <>
      <PageHeader title="Blog detail" />
      <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
        {post.image && (
          <img
            src={`http://localhost:5000${post.image}`}
            alt={post.title}
            className="w-full rounded-xl mb-6"
          />
        
        )}

        <span className="inline-block bg-[#d35400] text-white text-xs px-2 py-0.5 rounded mb-2 uppercase font-semibold">
          {post.category || "Post"}
        </span>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
          {post.title}
        </h1>

        <div className="text-sm text-gray-500 mb-4 flex items-center gap-4 flex-wrap">
          <span>📅 {new Date(post.createdAt).toLocaleDateString()}</span>
          <span>👁️ {post.views || 0} vues</span>
          <span>💬 {comments.length} commentaire(s)</span>
        </div>

        <div
          className="prose prose-p:leading-relaxed prose-img:rounded-lg prose-img:my-4 max-w-none text-justify mb-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <blockquote className="border-l-4 border-[#d35400] pl-4 italic text-lg bg-gray-50 p-4 rounded-md shadow-sm mb-8">
          “Lorem ipsum dolor sit amet consectetur. Vel vitae justo bibendum sed nulla ultricies mauris erat.”
          <footer className="mt-2 text-[#d35400] font-semibold">— Ethan Rodriguez</footer>
        </blockquote>

        <div className="mb-6 flex items-center gap-4">
          <span className="font-medium text-gray-700">👍 {post.likes || 0} j'aime</span>
          <button
            onClick={handleLikePost}
            className="px-4 py-1.5 bg-[#d35400] text-white rounded hover:bg-black transition"
          >
            J'aime cet article
          </button>
        </div>

        <hr className="my-8" />

        {/* Commentaires */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Commentaires</h2>

          <form
            onSubmit={handleCommentSubmit}
            className="mb-10 bg-gray-50 p-6 rounded-xl shadow space-y-4 max-w-lg"
          >
            <input
              type="text"
              placeholder="Votre nom"
              value={newComment.authorName}
              onChange={(e) => setNewComment({ ...newComment, authorName: e.target.value })}
              className="w-full border px-4 py-2 rounded focus:outline-[#d35400]"
              required
            />
            <textarea
              placeholder="Votre commentaire"
              value={newComment.content}
              onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
              className="w-full border px-4 py-2 rounded focus:outline-[#d35400]"
              rows={4}
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#d35400] text-white rounded hover:bg-black transition"
            >
              Envoyer
            </button>
          </form>

          <ul className="space-y-6">
            {comments.map((c) => (
              <li key={c._id} className="border p-5 rounded-xl shadow-sm bg-white">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{c.authorName}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(c.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="mb-3 text-gray-700">{c.content}</p>
                <div className="flex items-center gap-4">
                  <span>👍 {c.likes || 0}</span>
                  <button
                    onClick={() => handleLikeComment(c._id)}
                    className="text-[#d35400] hover:underline text-sm"
                  >
                    J'aime
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
};

export default SinglePost;
