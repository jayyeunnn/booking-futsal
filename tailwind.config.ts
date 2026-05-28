import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // JayField Brand Colors
        primary: {
          DEFAULT: "#1B5E20",
          light: "#2E7D32",
          dark: "#0D3B12",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#212121",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#4CAF50",
          foreground: "#FFFFFF",
        },
        cta: {
          DEFAULT: "#FF6D00",
          hover: "#E65100",
          foreground: "#FFFFFF",
        },
        background: "#FAFAFA",
        surface: "#FFFFFF",
        muted: {
          DEFAULT: "#F5F5F5",
          foreground: "#616161",
        },
        border: "#E0E0E0",
        text: {
          primary: "#1A1A1A",
          secondary: "#616161",
          inverse: "#FFFFFF",
        },
        success: "#4CAF50",
        warning: "#FF9800",
        error: "#F44336",
        info: "#2196F3",
      },
      fontFamily: {
        heading: ["var(--font-montserrat)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,0.05)",
        md: "0 4px 6px rgba(0,0,0,0.07)",
        lg: "0 10px 15px rgba(0,0,0,0.1)",
        xl: "0 20px 25px rgba(0,0,0,0.15)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
