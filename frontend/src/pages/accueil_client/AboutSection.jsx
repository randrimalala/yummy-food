// src/components/AboutSection.jsx
import React from 'react';

const AboutSection = () => {
  return (
    <div className="flex w-full h-[600px] bg-white relative mt-12"> {/* ↑ hauteur augmentée ici */}
      {/* Demi-rectangle à gauche */}
      <div className="w-[50%] h-full bg-[#120a04] rounded-r-[250px] relative flex items-center justify-end">
        {/* Image débordante */}
        <div className="absolute right-[-80px] top-1/2 -translate-y-1/2 h-[600px] w-[600px] z-10">
          <img
            src="/ai-generated-8209597_1920-removebg-preview1.png"
            alt="About"
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      {/* Contenu texte à droite */}
      <div className="w-[60%] pl-20 pr-12 py-12 flex flex-col justify-center space-y-6">
        <p className="text-sm font-semibold text-[#d35400] uppercase">About Us</p>
        <h2 className="text-3xl font-bold text-slate-800 leading-snug max-w-xl">
          Real Delicious Food Straight To Your Table
        </h2>
        <p className="text-gray-600 max-w-2xl">
          Assertively envisioneer high-payoff architectures after interactive service.
          Collaboratively whiteboard pandemic intellectual capital without cross-platform channels.
        </p>

        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          <li>Delicious &amp; Healthy Foods</li>
          <li>Specific Family &amp; Kids Zone</li>
          <li>Best Price &amp; Offers</li>
          <li>Made By Fresh Ingredients</li>
          <li>Music &amp; Other Facilities</li>
        </ul>

        <button className="w-fit mt-4 px-6 py-3 bg-[#d35400] text-white rounded-full font-semibold shadow hover:bg-orange-600 transition">
          DISCOVER MORE
        </button>

      </div>
    </div>
  );
};

export default AboutSection;
