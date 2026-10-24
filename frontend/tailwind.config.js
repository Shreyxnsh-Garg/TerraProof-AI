/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#F7F6F0",
        surface: "#FFFFFF",
        stone: "#EFEEE7",
        forest: "#174B38",
        forestDark: "#103528",
        ink: "#202822",
        muted: "#69736B",
        borderLine: "#E2E2D9",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        serif: ["'DM Serif Display'", "Georgia", "serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
}
