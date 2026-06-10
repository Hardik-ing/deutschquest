export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 45px rgba(99, 102, 241, 0.18)',
      },
      backgroundImage: {
        'ambient-gradient': 'radial-gradient(circle at top, rgba(96, 165, 250, 0.2), transparent 30%), radial-gradient(circle at 20% 20%, rgba(190, 24, 93, 0.2), transparent 20%), linear-gradient(180deg, rgba(15, 23, 42, 1), rgba(15, 23, 42, 0.95))',
      },
    },
  },
  plugins: [],
};
