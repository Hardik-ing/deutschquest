import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
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
