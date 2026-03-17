/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./assets/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        "light-bg": "#f8fafc",
        "light-card": "#ffffff",
        "light-hover": "#f1f5f9",
        "accent-purple": "#a855f7",
        "accent-blue": "#3b82f6",
        "accent-cyan": "#06b6d4",
        "text-dark": "#1e293b",
      },
    },
  },
  plugins: [],
};
