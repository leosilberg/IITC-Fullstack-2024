/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      karla: ["Karla", "sans-serif"],
      "DM-Serif": ["DM Serif Display", "sans-serif"],
    },
    extend: {
      colors: {
        "primary-700": "hsl(256, 26%, 20%)",
        "primary-300": "hsl(216, 30%, 68%)",
        "accent-900": "hsl(270, 9%, 17%)",
        "accent-400": "hsl(273, 4%, 51%)",
        "accent-100": " hsl(0, 0%, 98%)",
      },
    },
  },
  plugins: [],
};
