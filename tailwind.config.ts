import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "mainPink":"#FF32AD",
      },
      screens: {
        "2xs": { min: "276px", max: "359px" }, // Fold
        xs: { min: "360px", max: "389px" }, // Mobile
        "2sm": { min: "390px", max: "559px" }, // Wide Mobile
        sm: { min: "560px", max: "667px" }, // Wide Wide Mobile - 500px
        tb: { min: "668px", max: "1023px" }, // Tablet
        lg: { min: "1024px" }, // Laptop
        xl: { min: "1280px" }, // Desktop
      },
    },
  },
  plugins: [],
};
export default config;
