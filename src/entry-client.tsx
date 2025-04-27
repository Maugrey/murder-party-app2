import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Attendre que le DOM soit chargé pour l'hydratation
document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root') || document.body;
  
  hydrateRoot(
    rootElement,
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});
