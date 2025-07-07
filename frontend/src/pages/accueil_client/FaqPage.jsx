import React, { useState } from "react";

const faqData = [
  {
    question: "Quels sont les horaires d'ouverture ?",
    answer: "Nous sommes ouverts de 10h à 22h, tous les jours de la semaine.",
  },
  {
    question: "Proposez-vous la livraison à domicile ?",
    answer: "Oui, nous livrons dans tout Antananarivo avec nos partenaires locaux.",
  },
  {
    question: "Puis-je commander en ligne ?",
    answer: "Absolument ! Vous pouvez commander directement depuis notre site.",
  },
];

const FaqPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold text-center text-orange-600 mb-12">
        Questions Fréquentes
      </h2>
      <div className="space-y-6">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-xl shadow-sm p-5 bg-white"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggle(index)}
            >
              <h3 className="font-semibold text-lg">{item.question}</h3>
              <span className="text-orange-500 text-2xl">
                {activeIndex === index ? "−" : "+"}
              </span>
            </div>
            {activeIndex === index && (
              <p className="mt-4 text-gray-600">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqPage;
