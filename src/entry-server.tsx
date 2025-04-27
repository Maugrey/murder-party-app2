import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App-ssr.js'; // Version adaptée pour le SSR

export function render(url: string) {
  try {
    // Rendu côté serveur de l'application avec StaticRouter pour gérer l'URL
    const appHtml = renderToString(
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    );
    
    return appHtml;
  } catch (error) {
    console.error('Erreur lors du rendu SSR:', error);
    return `<div id="root">
      <div class="error-container p-4 bg-red-100 text-red-700 rounded">
        <h2>Erreur de rendu côté serveur</h2>
        <pre>${error.message}</pre>
      </div>
    </div>`;
  }
}
