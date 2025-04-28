import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    // ...existing code...
  },
  build: {
    // ...existing code...
    sourcemap: true,
  },
  optimizeDeps: {
    esbuildOptions: {
      sourcemap: true
    }
  }
});
