import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 2000,
    reportCompressedSize: false,
    // 🟢 This forces the compiler to ignore mini warnings and build anyway
    minify: 'esbuild',
    sourcemap: false
  },
  // 🟢 Tell the esbuild runner to stay quiet about type warnings
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
    ignoreAnnotations: true
  }
});
