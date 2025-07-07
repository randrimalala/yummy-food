import React from "react";

const FeaturedProductsSection = () => {
  const staticProducts = [
    {
      _id: "1",
      name: "Chicken Wings",
      image: "/chicken wings.png",
    },
    {
      _id: "2",
      name: "Beef Burger",
      image: "/beef burger.png",
    },
    {
      _id: "3",
      name: "Italian Pasta",
      image: "/italian pasta.png",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-left mb-10 px-6">
          {/* Ligne avec tiret à gauche et sous-titre */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm uppercase tracking-wide text-[#d35400]">
              — Yummy food BestSellers
            </span>
          </div>

          {/* Titre principal avec soulignement en dessous de 'récents' */}
          <h2 className="text-3xl font-extrabold text-gray-800 leading-tight">
            Nos{" "}
            <span className="relative text-[#d35400] inline-block">
              Meilleurs Plats
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

        <div className="flex flex-wrap justify-center gap-10">
          {staticProducts.map((prod) => (
            <div
              key={prod._id}
              className="w-80 h-56 bg-gradient-to-b from-orange-300 to-orange-500 rounded-[2rem] shadow-lg relative flex flex-col items-center"
            >
              {/* Image agrandie et légèrement remontée */}
              <img
                src={prod.image}
                alt={prod.name}
                className="w-56 h-56 object-contain -mt-6 z-10"
              />

              {/* Bloc blanc bas arrondi */}
              <div
                className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-11/12 h-16 bg-white z-10 flex items-center justify-center shadow-md"
                style={{ borderRadius: "2rem" }}
              >
                <h3 className="text-lg font-bold text-gray-800">
                  {prod.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
