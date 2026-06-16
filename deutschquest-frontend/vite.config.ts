import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  // Set the project root to the parent directory where index.html and src/ live
  root: path.resolve(__dirname, '..'),
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      // Ensure the '@' alias also points to the correct src directory
      '@': path.resolve(__dirname, '../src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 2000,
    cssCodeSplit: true,
    // Ensure the output is placed in 'deutschquest-frontend/dist'
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
  }
});