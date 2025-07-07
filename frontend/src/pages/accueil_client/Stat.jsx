import React from "react";

const StatsSection = () => {
  const stats = [
    {
      value: "500+",
      label: "Order was Delivered",
    },
    {
      value: "4.9",
      label: "Our Google Score",
    },
    {
      value: "200+",
      label: "Natural Product we use",
    },
    {
      value: "60+",
      label: "Receipts we have",
    },
  ];

  return (
    <section className="bg-white py-20 px-4 my-16">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 bg-white shadow-md rounded-xl w-full lg:w-2/4 overflow-hidden lg:ml-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center px-6 py-6 ${
                index !== stats.length - 1 ? "border-r border-gray-200" : ""
              }`}
            >
              <p className="text-3xl font-bold text-gray-800">{item.value}</p>
              <p className="text-sm text-gray-500 text-center mt-1">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Image burger */}
        <div className="w-full lg:w-2/4 flex justify-center">
          <img
            src="/stats.png"
            alt="Burger"
            className="w-full max-w-sm object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
