import { create } from 'zustand';
import { persist, StorageValue } from 'zustand/middleware';
import { 
  localStorageProvider, 
  cookieStorageProvider,
  createApiStorageProvider,
  ApiStorageOptions
} from '../utils/persistence';

// Type de base sans les actions
interface GlobalStateData {
  isGameStarted: boolean;
  currentPhase: number;
  gameStartTime: number | null;
  phaseStartTime: number | null;
  conditions: Record<string, boolean>;
  cluesViewed: Record<string, boolean>;
  itemsTaken: Record<string, boolean>;
  memoriesShown: string[];
}

// Type complet avec actions
export interface GlobalState extends GlobalStateData {
  setIsGameStarted: (started: boolean) => void;
  setCurrentPhase: (phase: number) => void;
  setGameStartTime: (time: number) => void;
  setPhaseStartTime: (time: number) => void;
  setConditions: (conditions: Record<string, boolean>) => void;
  setCluesViewed: (clues: Record<string, boolean>) => void;
  setItemsTaken: (items: Record<string, boolean>) => void;
  setMemoriesShown: (memories: string[]) => void;
}

const STORAGE_KEY = 'murderparty-global';
const providerType = import.meta.env.VITE_PERSISTENCE_PROVIDER || 'localStorage';

// État initial par défaut
const initialState: GlobalStateData = {
  isGameStarted: false,
  currentPhase: 0,
  gameStartTime: null,
  phaseStartTime: null,
  conditions: {},
  cluesViewed: {},
  itemsTaken: {},
  memoriesShown: [],
};

// Configuration du storage
const storage = {
  getItem: async (name: string): Promise<StorageValue<unknown> | null> => {
    switch (providerType) {
      case 'localStorage':
        console.log('Getting from localStorage');
        return localStorageProvider.getItem(name);
      case 'cookie':
        console.log('Getting from cookie');
        return cookieStorageProvider.getItem(name);
      case 'api':
        console.log('Getting from API');
        const baseUrl = import.meta.env.VITE_PERSISTENCE_API_BASE_URL;
        if (!baseUrl) {
          console.error('API provider selected but VITE_PERSISTENCE_API_BASE_URL is not defined. Falling back to localStorage.');
          return localStorageProvider.getItem(name);
        }
        const apiOptions: ApiStorageOptions = {
          baseUrl,
          headers: {},
          authToken: import.meta.env.VITE_PERSISTENCE_API_AUTH_TOKEN
        };
        const apiProvider = createApiStorageProvider(apiOptions);
        try {
          return await apiProvider.getItem(name);
        } catch (error) {
          console.error('Error getting item from API:', error);
          return null;
        }
      default:
        console.warn(`Unknown persistence provider type: ${providerType}. Falling back to localStorage.`);
        return localStorageProvider.getItem(name);
    }
  },
  setItem: async (name: string, value: StorageValue<unknown>): Promise<void> => {
    switch (providerType) {
      case 'localStorage':
        console.log('Saving to localStorage');
        localStorageProvider.setItem(name, value);
        break;
      case 'cookie':
        console.log('Saving to cookie');
        cookieStorageProvider.setItem(name, value);
        break;
      case 'api':
        console.log('Saving to API');
        const baseUrl = import.meta.env.VITE_PERSISTENCE_API_BASE_URL;
        if (!baseUrl) {
          console.error('API provider selected but VITE_PERSISTENCE_API_BASE_URL is not defined. Falling back to localStorage.');
          localStorageProvider.setItem(name, value);
          return;
        }
        const apiOptions: ApiStorageOptions = {
          baseUrl,
          headers: {},
          authToken: import.meta.env.VITE_PERSISTENCE_API_AUTH_TOKEN
        };
        const apiProvider = createApiStorageProvider(apiOptions);
        try {
          await apiProvider.setItem(name, value);
        } catch (error) {
          console.error('Error setting item to API:', error);
        }
        break;
      default:
        console.warn(`Unknown persistence provider type: ${providerType}. Falling back to localStorage.`);
        localStorageProvider.setItem(name, value);
    }
  },
  removeItem: async (name: string): Promise<void> => {
    switch (providerType) {
      case 'localStorage':
        localStorageProvider.removeItem(name);
        break;
      case 'cookie':
        cookieStorageProvider.removeItem(name);
        break;
      case 'api':
        const baseUrl = import.meta.env.VITE_PERSISTENCE_API_BASE_URL;
        if (!baseUrl) {
          console.error('API provider selected but VITE_PERSISTENCE_API_BASE_URL is not defined. Falling back to localStorage.');
          localStorageProvider.removeItem(name);
          return;
        }
        const apiOptions: ApiStorageOptions = {
          baseUrl,
          headers: {},
          authToken: import.meta.env.VITE_PERSISTENCE_API_AUTH_TOKEN
        };
        const apiProvider = createApiStorageProvider(apiOptions);
        try {
          await apiProvider.removeItem(name);
        } catch (error) {
          console.error('Error removing item from API:', error);
        }
        break;
      default:
        console.warn(`Unknown persistence provider type: ${providerType}. Falling back to localStorage.`);
        localStorageProvider.removeItem(name);
    }
  }
};

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set) => ({
      ...initialState,
      
      // Actions
      setIsGameStarted: (isGameStarted) => 
        set({ isGameStarted }),
      
      setCurrentPhase: (currentPhase) => 
        set({ currentPhase }),
      
      setGameStartTime: (gameStartTime) => 
        set({ gameStartTime }),
      
      setPhaseStartTime: (phaseStartTime) => 
        set({ phaseStartTime }),
      
      setConditions: (conditions) => 
        set({ conditions }),
      
      setCluesViewed: (cluesViewed) => 
        set({ cluesViewed }),
      
      setItemsTaken: (itemsTaken) => 
        set({ itemsTaken }),
      
      setMemoriesShown: (memoriesShown) => 
        set({ memoriesShown }),
    }),
    {
      name: STORAGE_KEY,
      storage,
      // Ces options sont importantes pour la sélection des propriétés à persister
      partialize: (state) => ({
        isGameStarted: state.isGameStarted,
        currentPhase: state.currentPhase,
        gameStartTime: state.gameStartTime,
        phaseStartTime: state.phaseStartTime,
        conditions: state.conditions,
        cluesViewed: state.cluesViewed,
        itemsTaken: state.itemsTaken,
        memoriesShown: state.memoriesShown,
      }),
      // Callbacks pour le débogage
      onRehydrateStorage: () => {
        console.log('State hydration started');
        return (_state, error) => {
          if (error) {
            console.error('Failed to rehydrate state:', error);
          } else {
            console.log('State rehydrated successfully');
          }
        };
      }
    }
  )
);
