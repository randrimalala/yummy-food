import { useEffect, useState } from "react";
import api from "../../services/axios"; // ✅ instance axios centralisée
import AdminBreadcrumb from "../../components/admin/AdminBreadcrumb";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    shortDesc: "",
    longDesc: "",
    stock: 0,
    price: 0,
    category: "",
  });

  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get("/categories") // ✅ remplace axios par api
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Erreur chargement catégories :", err));
  }, []);

  const handleGenerateAI = async () => {
    try {
      const res = await api.post("/ia/generate-description", {
        name: form.name,
      });

      const generated = res.data.description;
      const sentences = generated.split(".").map(s => s.trim()).filter(Boolean);

      const shortDesc = sentences[0] + ".";
      const longDesc = sentences.slice(1).join(". ").trim() + ".";

      setForm({ ...form, shortDesc, longDesc });
    } catch (err) {
      console.error("❌ Erreur IA :", err.response?.data || err.message);
      alert("Erreur lors de la génération IA.");
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (image) {
      data.append("image", image);
    }

    try {
      const res = await api.post("/products", data); // ✅ appel centralisé
      const product = res.data;
      alert("✅ Produit ajouté !");
      console.log("✅ Produit créé :", product);

      // Publication automatique Make (ne pas utiliser api ici car externe)
      if (product.image) {
        const webhookUrl = "https://g4vj84stny6hjn2e0flek1efqxg7sdyy@hook.eu2.make.com"; // 🔁 Remplace si besoin
        const payload = {
          message: `🆕 Nouveau produit : ${product.name}\n${product.shortDesc}\n💰 Prix : ${product.price} Ar`,
          image: product.image,
        };

        try {
          const fbRes = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          console.log("✅ Publié via Make :", fbRes.statusText);
        } catch (fbErr) {
          console.error("❌ Erreur Make :", fbErr.message);
        }
      }
    } catch (err) {
      console.error("❌ Erreur ajout produit :", err.response?.data || err.message);
      alert("❌ Erreur lors de l'ajout du produit");
    }
  };

  return (
    <div className="py-10 flex flex-col justify-between bg-white">
      <div className="px-4 md:px-10 mb-6">
        <AdminBreadcrumb
          items={[
            { label: "Dashboard", href: "/admin" },
            { label: "Produits", href: "/admin/products" },
            { label: "Ajouter", active: true },
          ]}
        />
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="md:p-10 p-4 space-y-5 max-w-lg">
        {/* Upload image */}
        <div>
          <p className="text-base font-medium">Product Image</p>
          <label htmlFor="image">
            <input
              accept="image/*"
              type="file"
              id="image"
              hidden
              onChange={handleImageChange}
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

        {/* Product name + IA */}
        <div className="flex flex-col gap-1 max-w-md relative">
          <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
          <div className="flex gap-2">
            <input
              id="product-name"
              type="text"
              placeholder="Type here"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 w-full"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <button
              type="button"
              className="px-3 py-2 text-sm bg-emerald-500 text-white rounded hover:bg-emerald-600 transition"
              onClick={handleGenerateAI}
              disabled={!form.name}
              title="Générer description avec IA"
            >
              Générer IA
            </button>
          </div>
        </div>

        {/* Short Description */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="short-desc">Short Description</label>
          <input
            id="short-desc"
            type="text"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            placeholder="Type here"
            value={form.shortDesc}
            onChange={(e) => setForm({ ...form, shortDesc: e.target.value })}
            required
          />
        </div>

        {/* Long Description */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-description">Long Description</label>
          <textarea
            id="product-description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
            value={form.longDesc}
            onChange={(e) => setForm({ ...form, longDesc: e.target.value })}
          />
        </div>

        {/* Category */}
        <div className="w-full flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="category">Category</label>
          <select
            id="category"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Price & Stock */}
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
            <input
              id="product-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />
          </div>
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-stock">Stock</label>
            <input
              id="product-stock"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-8 py-2.5 bg-indigo-500 text-white font-medium rounded hover:bg-indigo-600 transition"
        >
          ADD
        </button>
      </form>
    </div>
  );
}
