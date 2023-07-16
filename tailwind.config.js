/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShow: {
          '0%': { opacity: 0},
          '100%': { opacity: 1},
        },
      },
      animation: {
        overlayShow: "overlayShow 200ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 200ms ease-in-out",
      },
      borderColor:['focus'],
    },
  },
  plugins: [],
});
