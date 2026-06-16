import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 🟢 Links "@" directly to your frontend src folder
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 2000,
    cssCodeSplit: true,
    outDir: 'dist',
    emptyOutDir: true,
  }
});
