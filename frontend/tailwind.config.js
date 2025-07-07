// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        'slide-in': 'slideIn 0.3s ease-out forwards',
        'bounce-smooth': 'bounceSmooth 3s ease-in-out infinite',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        bounceSmooth: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};
