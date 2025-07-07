import React from "react";
import ClientNavbar from "./ClientNavbar";

const PageHeader = ({ title, onOpenCart }) => {

  return (
    <>
      <div className="relative h-[45vh] overflow-hidden">
        {/* Image de fond inversée */}
        <div className="absolute inset-0 bg-[url('/main3.jpg')] bg-cover bg-center transform scale-x-[-1] brightness-[0.4] z-0" />

        {/* Dégradé qui commence dès le haut */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#120a04] via-[#120a04]/90 to-transparent z-10"
          style={{ height: "160px" }}
        />

        {/* Contenu au-dessus */}
        <div className="relative z-20">
        <ClientNavbar onOpenCart={onOpenCart} />
          <div className="h-[25vh] flex flex-col items-center justify-center text-[#d35400]">
            <h1 className="text-4xl md:text-5xl font-extrabold uppercase">{title}</h1>

            <div className="mt-2 text-sm text-white">
              <span className="hover:underline cursor-pointer">
                <a href="/">Home</a>
              </span>
              <span className="mx-1">/</span>
              <span className="text-[#d35400] font-semibold">{title}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ligne horizontale fine en dessous du header */}
      <div className="h-[5px] w-full bg-[#d35400]" />
    </>
  );
};

export default PageHeader;
