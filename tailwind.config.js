/* eslint-disable @typescript-eslint/no-require-imports */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // extend: {},
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    }

  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "corporate", "synthwave", "lofi"],
  },
};
