import { defineConfig } from 'vite';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss7-compat';
import React from '@vitejs/plugin-react';
// Ajout d'une déclaration pour le module manquant
declare module '@tailwindcss/postcss7-compat';

export default defineConfig({
  plugins: [React()],
  css: {
    postcss: {
      plugins: [postcss(), tailwindcss()],
    },
  },
});
