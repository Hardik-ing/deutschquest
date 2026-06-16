/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 🔵 Premium Academic Palette
        premiumNavy: '#0A192F',    // Deep luxury navy blue for backgrounds/headers
        premiumCrimson: '#DC143C', // Sharp crimson red for buttons and badges
        premiumWhite: '#F8FAFC',   // Clean, off-white for crisp readability
      }
    },
  },
  plugins: []
}
