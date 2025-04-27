// Helper d'abstraction pour la persistance (localStorage, API-ready)
// Avec compatibilité SSR

export interface PersistenceProvider {
  getItem<T>(key: string): T | null;
  setItem<T>(key: string, value: T): void;
  removeItem(key: string): void;
}

// Détection de l'environnement serveur de manière sûre
const isServer = () => typeof window === 'undefined' || typeof localStorage === 'undefined';

// Provider qui ne fait rien (pour le SSR)
class NoopProvider implements PersistenceProvider {
  getItem<T>(_key: string): T | null {
    return null;
  }
  setItem<T>(_key: string, _value: T) {}
  removeItem(_key: string) {}
}

// Provider utilisant localStorage (pour le navigateur)
class LocalStorageProvider implements PersistenceProvider {
  getItem<T>(key: string): T | null {
    try {
      if (isServer()) return null;
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch (error) {
      console.error("Erreur lors de l'accès à localStorage:", error);
      return null;
    }
  }
  
  setItem<T>(key: string, value: T) {
    try {
      if (isServer()) return;
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Erreur lors de l'écriture dans localStorage:", error);
    }
  }
  
  removeItem(key: string) {
    try {
      if (isServer()) return;
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Erreur lors de la suppression dans localStorage:", error);
    }
  }
}

// Export une fonction qui retourne le provider approprié selon l'environnement actuel
// C'est crucial pour le SSR car cette fonction ne sera évaluée qu'au moment de l'utilisation
export const getPersistenceProvider = (): PersistenceProvider => {
  return isServer() ? new NoopProvider() : new LocalStorageProvider();
};

// Pour la compatibilité avec le code existant
export const persistenceProvider = getPersistenceProvider();
