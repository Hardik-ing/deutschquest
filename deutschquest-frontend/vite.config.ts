import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // SET THIS TO AN ABSOLUTE SLASH FOR VERCEL ROOT FOLDERS
  base: '/',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 2000,
    reportCompressedSize: false,
    minify: 'esbuild',
    sourcemap: false
  }
});
