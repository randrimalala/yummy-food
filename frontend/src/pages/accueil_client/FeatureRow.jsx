// src/components/FeatureRow.jsx
import React, { useState } from 'react';

const features = [
  {
    icon: '/etiq_d.png',
    hoverIcon: '/etiq_b.png',
    title: 'Discount Voucher',
    description: 'Competently orchestrate integrated schema for quickly create.'
  },
  {
    icon: '/burger_i.png',
    hoverIcon: '/burg.png',
    title: 'Fresh Healthy Foods',
    description: 'Quantimanes orchestrate integrated schema for quickly Taken.'
  },
  {
    icon: '/plat_i.png',
    hoverIcon: '/plat.png',
    title: 'Fast Serve On Table',
    description: 'Mansikatils orchestrate integrated schema for quickly Harbest.'
  }
];

const FeatureRow = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="flex justify-center items-start gap-10 py-10">
      {features.map((feature, index) => (
        <React.Fragment key={index}>
          <div
            className="flex items-start gap-10 max-w-xs cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className={`flex items-center justify-center rounded-full transition duration-300 ${
                hoveredIndex === index ? 'bg-[#d35400]' : ''
              }`}
              style={{
                width: '80px',
                height: '80px',
                minWidth: '80px', // éviter le rétrécissement
              }}
            >
              <img
                src={hoveredIndex === index ? feature.hoverIcon : feature.icon}
                alt={feature.title}
                className="w-16 h-16 object-contain"
              />
            </div>
            <div className="pt-1">
              <h3 className="text-lg font-semibold text-slate-800">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </div>
          </div>

          {index < features.length - 1 && (
            <div className="border-l border-dashed border-gray-300 h-20 mx-2"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default FeatureRow;
