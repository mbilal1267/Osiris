import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#5A3CB0", light: "#7C5CE6", dark: "#3D1F8F" },
        "brand-dark": "#3D1F8F",
        accent: { DEFAULT: "#FFEB3B", dark: "#FDD835" },
        surface: { DEFAULT: "#F8F7F4", dark: "#1A1A1A", card: "#FFFFFF" },
        "neon-pink": "#FF006E",
        "neon-blue": "#0096FF",
        "neon-cyan": "#00D9FF",
        "neon-purple": "#B537F2",
      },
      fontFamily: {
        display: ['"DM Serif Display"', "Georgia", "serif"],
        body: ['"DM Sans"', "system-ui", "sans-serif"],
      },
      borderRadius: { xl2: "1rem", xl3: "1.5rem", xl4: "2rem" },
      backgroundImage: {
        "gradient-hero": "linear-gradient(135deg, #5A3CB0 0%, #B537F2 100%)",
        "gradient-hero-dark": "linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)",
      },
      boxShadow: {
        "card": "0 4px 16px rgba(0, 0, 0, 0.08)",
        "card-hover": "0 8px 24px rgba(0, 0, 0, 0.12)",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "fade-in-down": "fadeInDown 0.6s ease-out",
        "slide-in-left": "slideInLeft 0.6s ease-out",
        "slide-in-right": "slideInRight 0.6s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
