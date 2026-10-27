/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#F5F2EC",
          50: "#FAF9F6",
          100: "#F5F2EC",
          200: "#ECE7DE",
          300: "#DFD8CB",
        },
        porcelain: "#FAF9F6",
        charcoal: {
          DEFAULT: "#292824",
          light: "#3A3934",
          dark: "#1A1916",
          muted: "#525049",
        },
        studio: {
          DEFAULT: "#1A1916",
          card: "#22211D",
          border: "#33312C",
        },
        stone: {
          beige: "#C9BDAA",
          light: "#D8CFC0",
          dark: "#A39783",
        },
        terracotta: {
          DEFAULT: "#A76F55",
          hover: "#8E5B43",
          light: "#C5937C",
        },
        olive: {
          DEFAULT: "#77786B",
          dark: "#5E5F53",
          light: "#9A9B8F",
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Manrope"', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      letterSpacing: {
        architectural: "0.2em",
        editorial: "0.08em",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.25, 1, 0.5, 1)",
      },
    },
  },
  plugins: [],
};
