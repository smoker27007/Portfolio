/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0C1821",
        foreground: "#F2EDE8",
        accent: "#4A9EFF",
        "accent-warm": "#E8724A",
        "accent-gold": "#C9A96E",
        "text-secondary": "#7A8B9A",
        "text-muted": "#4A5B6E",
        "text-dark": "#1A2332",
        "text-light-secondary": "#6B5E52",
        "bg-light": "#F5F0EB",
        "bg-light-alt": "#EDE7E0",
        "bg-card": "#FDFAF7",
      },
      fontFamily: {
        display: ["'Outfit'", "sans-serif"],
        body: ["'Inter'", "system-ui", "-apple-system", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};