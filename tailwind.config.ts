import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "320px",
      sm: "420px",
      md: "768px",
      lg: "1128px",
      xl: "1440px",
    },
    fontFamily: {
      cinzel: ["Cinzel", "serif"],
    },
  },
  plugins: [],
};
export default config;
