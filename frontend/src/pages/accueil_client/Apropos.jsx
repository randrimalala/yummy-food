import React from 'react';

const BurgerPromo = () => {
  return (
    <div className="w-full flex flex-col items-center px-4 py-12">
      {/* Texte introductif */}
      <p className="text-center text-gray-700 text-sm mb-6 italic">
        We offer the best burger online — get it now
      </p>

      <div className="relative flex justify-center items-center">
        {/* Image burger réduite */}
        <div className="w-[550px] max-w-full">
          <img
            src="/banner2.jpg"
            alt="Delicious Burger"
            className="w-full rounded shadow-lg object-cover"
          />
        </div>

        {/* Bloc texte décalé */}
        <div className="absolute left-[440px] bg-white p-4 rounded shadow-md w-[260px]">
          <h2 className="text-xl font-bold mb-3 text-gray-800">OUR STORY</h2>
          <p className="text-sm text-gray-700 mb-3 leading-snug">
            Known for our delicious burgers, we’ve earned our customers' trust through quality and passion.
          </p>
        
          <button className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-4 py-2 rounded transition">
            KNOW MORE
          </button>
        </div>
      </div>
    </div>
  );
};

export default BurgerPromo;
