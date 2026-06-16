import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // 🟢 THE PERMANENT BLANK PAGE FIX: Root absolute pathing for Vercel
  base: '/',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 2000,
    cssCodeSplit: true,
    outDir: 'dist',
    emptyOutDir: true,
  }
});
