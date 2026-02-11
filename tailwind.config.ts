import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#6C3CE1", light: "#8B5CF6", dark: "#5521C4" },
        accent: { DEFAULT: "#D4E157", dark: "#C0CA33" },
        surface: { DEFAULT: "#F5F3EE", dark: "#1A1A1A", card: "#FFFFFF" },
      },
      fontFamily: {
        display: ['"DM Serif Display"', "Georgia", "serif"],
        body: ['"DM Sans"', "system-ui", "sans-serif"],
      },
      borderRadius: { xl2: "1rem", xl3: "1.5rem", xl4: "2rem" },
    },
  },
  plugins: [],
};
export default config;
