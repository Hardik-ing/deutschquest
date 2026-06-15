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
        brand: {
          // Dark Mode Foundation
          black: '#09090B',       // Deep Matte Jet Black
          graphite: '#18181B',    // Premium Card Surface
          borderDark: '#27272A',  // Ultra-thin Dark Border

          // Light Mode Foundation
          white: '#FAFAFA',       // Pristine Titanium White
          surfaceLight: '#FFFFFF',// Clean White Card Surface
          borderLight: '#E4E4E7', // Sharp Light Border

          // Premium Strategic Accent
          red: '#DC2626',         // Vivid Crimson Red (for errors/focus)
          redHover: '#B91C1C',    // Deeper Red for active state states
        }
      },
      fontFamily: {
        // High-end editorial interfaces look best with crisp, geometric sans-serif text
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
