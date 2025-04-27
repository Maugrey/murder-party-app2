import React from 'react';
import { StrictMode } from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'
import './i18n';

// Détecte si la page a été rendue côté serveur
const rootElement = document.getElementById('root');
const hasSSRContent = rootElement && rootElement.innerHTML.trim().length > 0;

if (hasSSRContent) {
  // Hydrate le contenu existant si c'est du SSR
  hydrateRoot(
    rootElement!,
    <StrictMode>
      <App />
    </StrictMode>,
  );
} else {
  // Sinon, crée un nouvel arbre DOM (comportement classique SPA)
  createRoot(rootElement!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
