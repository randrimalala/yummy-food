import React from "react";

const HeroSection = () => {
  return (
    <div className="h-[600px] flex flex-col items-start justify-center px-4 text-left bg-transparent w-full max-w-5xl mx-auto">

      <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#d35400]">
        Savourez l’instant 
      </h1>
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#d35400]">
        fastfood
      </h1>
      <p className="max-w-xl mt-4 px-0 text-white text-base md:text-lg">
        Un tunnel de vente rapide, intuitif et savoureux pour booster vos commandes.
      </p>

      <div className="flex flex-col sm:flex-row items-start gap-4 pt-5">
        <button className="px-7 py-3 rounded bg-[#d35400] hover:bg-[#FFAE03] text-white font-bold transition">
          Commander Maintenant
        </button>
        <button className="group px-7 py-2.5 flex items-center gap-2 font-medium text-[#d35400] hover:text-[#FF9D00] transition">
          En savoir plus
          <svg
            className="group-hover:translate-x-1 transition pt-0.5"
            width="12"
            height="9"
            viewBox="0 0 12 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5"
              stroke="#d35400"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
