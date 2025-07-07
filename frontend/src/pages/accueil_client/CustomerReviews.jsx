import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CustomerReviewSection = () => {
  const reviews = [
    {
      name: "Sarah Johnson",
      role: "Customer",
      text: `Consistency is key, and this place nails it every time. 
        Whether it's a quick lunch or a late-night snack, the quality is consistently top-notch.`,
      img: "/t_1.png",
    },
    {
      name: "David Smith",
      role: "Client régulier",
      text: `The service is amazing and the food always arrives hot and fresh. Highly recommended!`,
      img: "/t_2.png",
    },
    {
      name: "Emily Brown",
      role: "Fidèle cliente",
      text: `Je suis impressionnée par la rapidité de livraison et la qualité constante des plats.`,
      img: "/t_3.png",
    },
  ];

  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const review = reviews[current];

  return (
    <section className="bg-gradient-to-b bg-white py-16">
      <div className="flex flex-col lg:flex-row relative">
        {/* Bloc orange gauche */}
        <div className="bg-gradient-to-br from-[#d35400] to-[#e67e22] text-white rounded-tr-[60px] rounded-br-[60px] w-full lg:w-[45%] px-10 py-16 flex flex-col justify-center">
          <span className="text-sm uppercase tracking-wide mb-2">
            — Rave Reviews Here
          </span>
          <h2 className="text-4xl font-extrabold leading-tight mb-4">
            What Our <br /> Customers Say
          </h2>
          <p className="text-sm text-white/80 max-w-md">
            Lorem ipsum dolor sit amet consectetur. Congue purus cursus ac
            aliquet eget enim est. Nunc.
          </p>
        </div>

       {/* Carte d'avis à droite */}
<div className="relative w-full lg:w-[55%] flex justify-start items-center mt-[-40px] z-10 px-4">
  <div
    key={review.name}  // 🔥 Ajout de la clé dynamique ici
    className="bg-white rounded-2xl shadow-xl p-6 max-w-xl w-full relative z-10 -ml-10 transition-opacity duration-300"
  >
    {/* Image et contenu alignés horizontalement */}
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
      {/* Image normale sans cercle */}
      <div className="w-24 h-24 overflow-hidden shrink-0">
        <img
          src={review.img}
          alt={review.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Texte d'avis */}
      <div className="text-sm text-gray-700 italic">
        <p className="mb-4">"{review.text}"</p>
        <p className="text-gray-800 font-bold not-italic">
          {review.name}
          <span className="text-gray-500 font-normal"> | {review.role}</span>
        </p>
      </div>
    </div>

    {/* Flèches carousel */}
    <div className="absolute bottom-4 right-4 flex gap-3">
      <button
        onClick={handlePrev}
        className="w-8 h-8 border border-orange-400 text-orange-400 rounded-md flex items-center justify-center hover:bg-orange-400 hover:text-white transition"
      >
        <FaChevronLeft size={12} />
      </button>
      <button
        onClick={handleNext}
        className="w-8 h-8 border border-orange-400 text-orange-400 rounded-md flex items-center justify-center hover:bg-orange-400 hover:text-white transition"
      >
        <FaChevronRight size={12} />
      </button>
    </div>
  </div>


          {/* Guillemet décoratif */}
          <div className="absolute top-0 right-12 text-[100px] text-gray-200 z-0 leading-none">
  ❞
</div>


        </div>
      </div>
    </section>
  );
};

export default CustomerReviewSection;
