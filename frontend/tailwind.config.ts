import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        "main-white" : "#f7fcf7",
        "main-blue" : "#0e416b",
        "main-red" : "#d14945",
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)'],
      }
    },
  },
  plugins: [],
};
export default config;
