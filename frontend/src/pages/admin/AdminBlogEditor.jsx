import React, { useState, useEffect } from "react";
import api from "../../services/axios"; // ✅ Utilisation de l'instance axios centralisée
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import slugify from "slugify";
import { useNavigate, useParams } from "react-router-dom";

const AdminBlogEditor = () => {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [content, setContent] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Charger l'article existant si édition
  useEffect(() => {
    if (id) {
      setIsEdit(true);
      api.get(`/blog/${id}`)
        .then(res => {
          const post = res.data;
          setTitle(post.title);
          setExcerpt(post.excerpt);
          setContent(post.content);
          setImagePreview(post.image); // URL actuelle
        })
        .catch(err => console.error("Erreur chargement article", err));
    }
  }, [id]);

  // Gestion image sélectionnée
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    const slug = slugify(title, { lower: true });

    const formData = new FormData();
    formData.append("title", title);
    formData.append("excerpt", excerpt);
    formData.append("content", content);
    formData.append("slug", slug);
    if (imageFile) formData.append("image", imageFile);

    try {
      if (isEdit) {
        await api.put(`/blog/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Article modifié !");
      } else {
        await api.post("/blog", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Article créé !");
      }
      navigate("/admin/blog");
    } catch (err) {
      console.error("Erreur soumission article", err.response?.data || err.message);
      alert("❌ Une erreur est survenue.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        {isEdit ? "✏️ Modifier" : " Nouvel"} Article
      </h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
        {/* Titre */}
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />

        {/* Image Upload */}
        <div>
          <p className="text-base font-medium mb-1">Image de l’article</p>
          <label htmlFor="image" className="cursor-pointer inline-block">
            <input
              type="file"
              accept="image/*"
              id="image"
              hidden
              onChange={handleImageChange}
              required={!isEdit}
            />
            <img
              src={
                imagePreview
                  ? imagePreview
                  : "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
              }
              alt="Aperçu"
              className="max-w-32 border rounded shadow"
            />
          </label>
        </div>

        {/* Extrait */}
        <textarea
          placeholder="Extrait (court résumé)"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={3}
          className="w-full border p-2 rounded"
        />

        {/* Contenu */}
        <ReactQuill
          value={content}
          onChange={setContent}
          theme="snow"
          placeholder="Contenu principal de l'article"
          className="bg-white"
        />

        {/* Soumission */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {isEdit ? "Modifier" : "Créer"} l'article
        </button>
      </form>
    </div>
  );
};

export default AdminBlogEditor;
