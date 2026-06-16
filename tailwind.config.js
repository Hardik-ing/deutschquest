export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 45px rgba(99, 102, 241, 0.18)',
      },
      backgroundImage: {
        'ambient-gradient': 'radial-gradient(circle at top, rgba(96, 165, 250, 0.2), transparent 30%), radial-gradient(circle at 20% 20%, rgba(190, 24, 93, 0.2), transparent 20%), linear-gradient(180deg, rgba(15, 23, 42, 1), rgba(15, 23, 42, 0.95))',
      },
      colors: {
        quest: {
          // Dark Mode Foundation (Organic Luxury)
          abyss: '#030C08',        // Rich, near-black Deep Forest base
          velvet: '#081D14',       // Premium Card Surface
          borderDark: '#113324',   // Deep Emerald Border outline

          // Light Mode Foundation (Academic Alabaster)
          alabaster: '#F5F5F0',    // Soft, comforting bone white base
          surfaceLight: '#FFFFFF', // Pure clean card backing
          borderLight: '#E2E2D9',  // Soft sage-tinted border

          // Elite Accents
          gold: '#D4AF37',         // Classic Metallic Gold for focus points
          goldHover: '#AA8C2C',    // Richer gold for hover states
          crimson: '#991B1B',      // Burnt Terracotta for wrong answers / retry
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
