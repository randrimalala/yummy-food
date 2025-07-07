import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ClientCategorySection() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchCategoriesWithCounts = async () => {
      const response = await axios.get("http://localhost:5000/api/categories");
      const categoriesData = await Promise.all(
        response.data.map(async (cat) => {
          const res = await axios.get(`http://localhost:5000/api/categories/${cat._id}`);
          return { ...cat, productCount: res.data.products.length };
        })
      );
      setCategories(categoriesData);
    };
  
    fetchCategoriesWithCounts();
  }, []);
  

  const goToCategory = async (id) => {
    setSelectedCategory(id);
    try {
      const response = await axios.get(`http://localhost:5000/api/categories/${id}`);
      setProducts(response.data.products);
    } catch (err) {
      console.error("Erreur lors de la récupération des produits :", err);
      setProducts([]);
    }
  };

  const scroll = (direction) => {
    const container = carouselRef.current;
    const scrollAmount = 300;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="py-16 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="text-left mb-10 px-6">
  {/* Ligne avec tiret à gauche et sous-titre */}
  <div className="flex items-center gap-2 mb-2">
    <span className="text-sm uppercase tracking-wide text-[#d35400]">
      — Yummy food Catégorie
    </span>
  </div>

  {/* Titre principal avec soulignement en dessous de 'récents' */}
  <h2 className="text-3xl font-extrabold text-gray-800 leading-tight">
    Explore{" "}
    <span className="relative text-[#d35400] inline-block">
      Nos categories
      {/* Soulignement comme dans l’image */}
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

      <div
        className="relative px-6 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          onClick={() => scroll("left")}
          className={`absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10 transition-opacity ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={() => scroll("right")}
          className={`absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10 transition-opacity ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <ChevronRight size={24} />
        </button>

        <div
          ref={carouselRef}
          className="flex space-x-6 overflow-x-auto scrollbar-hide w-full transition-all duration-300"
        >
        {categories.map((cat) => (
  <button
    key={cat._id}
    onClick={() => goToCategory(cat._id)}
    className="min-w-[180px] sm:min-w-[200px] md:min-w-[220px] bg-transparent transition-all duration-300 p-6 flex flex-col items-center"
  >
    <div className="w-36 h-36 mb-4">
      <img
        src={`http://localhost:5000/uploads/${cat.image}`}
        alt={cat.name}
        className="w-full h-full object-cover"
      />
    </div>
    <span className="text-gray-800 font-semibold text-base text-center">
      {cat.name}
    </span>
    <span className="text-gray-500 text-sm mt-1">
      {cat.productCount || 0} produit{cat.productCount > 1 ? "s" : ""}
    </span>
  </button>
))}



        </div>
      </div>

      {selectedCategory && (
        <div className="mt-12 px-6">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="border border-gray-300 rounded-md px-4 py-3 bg-white w-full flex flex-col relative"
                >
                  <img
                    src={
                      product.image
                        ? `http://localhost:5000/uploads/${product.image}`
                        : "https://via.placeholder.com/200x150?text=No+Image"
                    }
                    alt={product.name}
                    className="transition-transform duration-300 hover:scale-105 max-h-40 object-contain mx-auto mb-3"
                  />
                  <h4 className="text-gray-800 font-medium text-lg truncate">{product.name}</h4>
                  <p className="text-gray-600 text-sm mt-1 truncate">{product.description}</p>
                  <p className="text-orange-500 font-semibold text-lg mt-2">
                    {product.price} Ar
                  </p>
                  <Link
                    to={`/produits/${product._id}`}
                    className="mt-3 text-sm text-blue-600 hover:underline"
                  >
                    Voir détails
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Aucun produit disponible pour cette catégorie.</p>
          )}
        </div>
      )}
    </div>
  );
}
