/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF7437",
        "primary-dark": "#EA580C",
        "primary-50": "#FFF7ED",
        "primary-100": "#FFEDD5",
        "primary-200": "#FED7AA",
        "primary-300": "#FDBA74",
        "primary-400": "#FB923C",
        "primary-500": "#F97316",
        "primary-600": "#EA580C",
        "primary-700": "#C2410C",
        "primary-800": "#9A3412",
        "primary-900": "#7C2D12",
        "primary-950": "#431407",
        text: "#101828",
        danger: "#D92D20",
        "danger-dark": "#B42318",
        placeholder: "#9ca3af", // gray-400
        border: "#d1d5db", // gray-300
        divider: "#e5e7eb", // gray-200
      },
    },
    fontFamily: {
      sans: ["var(--fixel-font)", "system-ui"],
    },
    aspectRatio: {
      // Needed to work with native Tailwind 'aspect-ratio' - https://github.com/tailwindlabs/tailwindcss-aspect-ratio
      auto: "auto",
      square: "1 / 1",
      video: "16 / 9",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "10",
      11: "11",
      12: "12",
      13: "13",
      14: "14",
      15: "15",
      16: "16",
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
