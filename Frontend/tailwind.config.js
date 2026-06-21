/** @type {import('tailwindcss').Config} */
// Light palette inspired by the Central University of Jharkhand logo:
// soft cream backgrounds, sage/forest green, golden yellow, and a calm
// university blue accent. Existing components use blue/violet/emerald/
// amber/red utility classes, so we remap those palettes to the light
// brand tones rather than rewriting every file.

const blue = {
  50:  "#eef4fb",
  100: "#d6e6f5",
  200: "#a9c8e6",
  300: "#7aa9d4",
  400: "#4f8bc1",
  500: "#2f6fae", // university blue accent
  600: "#235690",
  700: "#1b4374",
  800: "#143257",
  900: "#0d2139",
};

const green = {
  50:  "#f1faf2",
  100: "#dcf2de",
  200: "#b8e3bd",
  300: "#8ccd95",
  400: "#5fb26b",
  500: "#3f9750", // sage / forest green
  600: "#317a3f",
  700: "#265e31",
  800: "#1b4523",
  900: "#112d17",
};

const yellow = {
  50:  "#fff9e3",
  100: "#fdefb6",
  200: "#fbe07e",
  300: "#f6cd49",
  400: "#eab92a", // golden yellow
  500: "#caa01e",
  600: "#9d7c15",
  700: "#73590f",
  800: "#4d3b09",
  900: "#2a2005",
};

const cream = {
  DEFAULT: "#fbf7ec", // page background
  2:       "#f5efdc", // cards
  3:       "#ece4c8", // raised surfaces
  4:       "#e1d6a8", // borders / dividers
};

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["Syne", "sans-serif"],
      },
      colors: {
        // Light cream surfaces.
        bg: cream,
        // Brand-aligned aliases for new components.
        brand: blue,
        gold: yellow,
        forest: green,
        cream,
        // Remap common Tailwind palettes so existing utility classes
        // automatically pick up the light logo-inspired palette.
        blue,
        indigo: blue,
        violet: green,
        emerald: green,
        green,
        amber: yellow,
        yellow,
        red: blue,

      },
      borderColor: {
        DEFAULT: "rgba(31, 51, 84, 0.10)", // subtle blue-tinted hairlines
      },
    },
  },
  plugins: [],
};
