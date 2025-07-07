import React from 'react';

const BurgerPromo = () => {
  return (
    <div
    className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center gap-12 px-6 py-16"
    style={{
      backgroundImage: 'linear-gradient(to right, #120a04, #3e1f12)',
      color: 'white',
    }}
  >
  
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl gap-12">
        
        {/* Texte à gauche */}
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-white">Double Burger</h1>
          <h2 className="text-3xl font-semibold text-yellow-300">30% de réduction chaque Vendredi</h2>
          <p className="text-lg text-[#f0e7e2]">
            Découvrez notre délicieux double burger, parfait pour vos envies gourmandes du week-end. Savoureux, généreux et maintenant en promotion chaque vendredi !
          </p>
          <button className="mt-4 px-8 py-3 bg-white text-[#2e1f12] hover:bg-[#f5eade] font-bold rounded-full transition">
            Commander Maintenant
          </button>
        </div>

        {/* Image du burger à droite */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/burgers.png"
            alt="Double Burger"
            className="w-[420px] md:w-[480px] h-auto object-contain drop-shadow-xl"
          />
        </div>

      </div>
    </div>
  );
};

export default BurgerPromo;
