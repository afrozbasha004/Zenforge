import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/roles/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#f0f4ff",
          100: "#dde6ff",
          200: "#c2d0ff",
          300: "#9cb0ff",
          400: "#7485fd",
          500: "#5561f5",
          600: "#4340ea",
          700: "#3830cf",
          800: "#302ba7",
          900: "#2c2a84",
          950: "#1b1950",
        },
        surface: {
          DEFAULT: "#0f0f11",
          subtle:  "#1a1a1f",
          muted:   "#26262e",
          border:  "#32323c",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      animation: {
        "fade-in":   "fadeIn 0.2s ease-in-out",
        "slide-up":  "slideUp 0.3s ease-out",
        "spin-slow": "spin 3s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%":   { transform: "translateY(8px)", opacity: "0" },
          "100%": { transform: "translateY(0)",   opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
