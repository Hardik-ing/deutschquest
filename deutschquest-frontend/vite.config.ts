import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // 🟢 THE BLANK PAGE FIX: Forces assets to load from the correct directory pathing
  base: './',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 2000,
    cssCodeSplit: true,
    outDir: 'dist',
    emptyOutDir: true,
  }
});
