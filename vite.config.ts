import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
    ssr: 'src/entry-server.tsx',
    outDir: 'dist/client',
  },
  ssr: {
    noExternal: ['react-router-dom', 'zustand', 'i18next', 'react-i18next'],
  },
});
