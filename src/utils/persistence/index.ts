export * from './types';
export * from './localStorage.provider';
export * from './cookie.provider';
export * from './api.provider';

import { localStorageProvider } from './localStorage.provider';
import { cookieStorageProvider } from './cookie.provider';
import { createApiStorageProvider } from './api.provider';
import { PersistenceProvider, ApiStorageOptions } from './types';

// Fonction pour sélectionner le provider en fonction de la configuration
function selectPersistenceProvider(): PersistenceProvider {
  const providerType = import.meta.env.VITE_PERSISTENCE_PROVIDER || 'localStorage';
  
  switch (providerType) {
    case 'localStorage':
      console.log('Using localStorage persistence provider');
      return localStorageProvider;
    
    case 'cookie':
      console.log('Using cookie persistence provider');
      return cookieStorageProvider;
    
    case 'api':
      console.log('Using API persistence provider');
      const baseUrl = import.meta.env.VITE_PERSISTENCE_API_BASE_URL;
      
      if (!baseUrl) {
        console.error('API provider selected but VITE_API_BASE_URL is not defined. Falling back to localStorage.');
        return localStorageProvider;
      }
      
      const apiOptions: ApiStorageOptions = {
        baseUrl,
        headers: {},
      };
      
      const authToken = import.meta.env.VITE_PERSISTENCE_API_AUTH_TOKEN;
      if (authToken) {
        apiOptions.authToken = authToken;
      }
      
      return createApiStorageProvider(apiOptions);
    
    default:
      console.warn(`Unknown persistence provider type: ${providerType}. Falling back to localStorage.`);
      return localStorageProvider;
  }
}

// Export du provider configuré par la variable d'environnement
export const persistenceProvider = selectPersistenceProvider();
