import { useState } from "react";
import api from "../../services/axios"; // ✅ Utilise l'instance axios centralisée
import AdminBreadcrumb from "../../components/admin/AdminBreadcrumb";

export default function AddCategory() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    if (image) {
      formData.append("image", image);
    }

    try {
      await api.post("/categories", formData); // ✅ Appel via instance api
      alert("✅ Catégorie ajoutée !");
      setName("");
      setImage(null);
    } catch (err) {
      console.error("Erreur lors de l'ajout :", err);
      alert("❌ Erreur lors de l'ajout");
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="py-10 flex flex-col justify-between bg-white">
      {/* Breadcrumb d'administration */}
      <div className="px-4 md:px-10 mb-6">
        <AdminBreadcrumb
          items={[
            { label: "Dashboard", href: "/admin" },
            { label: "Catégories", href: "/admin/categories" },
            { label: "Ajouter", active: true },
          ]}
        />
      </div>

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="md:p-10 p-4 space-y-5 max-w-lg"
      >
        {/* Upload image */}
        <div>
          <p className="text-base font-medium">Image de la catégorie</p>
          <label htmlFor="image">
            <input
              accept="image/*"
              type="file"
              id="image"
              hidden
              onChange={handleImageChange}
              required
            />
            <img
              className="max-w-32 cursor-pointer border border-gray-300 rounded"
              src={
                image
                  ? URL.createObjectURL(image)
                  : "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
              }
              alt="upload preview"
              width={100}
              height={100}
            />
          </label>
        </div>

        {/* Category Name */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="category-name">
            Nom de la catégorie
          </label>
          <input
            id="category-name"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="px-8 py-2.5 bg-indigo-500 text-white font-medium rounded hover:bg-indigo-600 transition"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}
