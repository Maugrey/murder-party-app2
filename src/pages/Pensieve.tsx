import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGameState } from '../hooks/useGameState';
import { getDataLoader, DataResource } from '../utils/dataLoader';
import { useDataLoaderMode } from '../utils/dataLoaderContext';
import { DevOnly } from '../utils/devTools';

// Interface pour les données de souvenirs de la pensine
interface PensieveMemory {
  id: number;
  location: string;
  type: 'clue' | 'false-lead' | 'useless';
  phase: number;
  memory: string;
  condition: string;
}

const Pensieve = () => {
  const { t } = useTranslation();
  const {
    isGameStarted,
    currentPhase,
    conditions,
    memoriesShown,
    setMemoriesShown
  } = useGameState();
  const navigate = useNavigate();
  const dataLoaderMode = useDataLoaderMode();
  const pensieveDataLoader = getDataLoader<PensieveMemory[]>(dataLoaderMode);

  // Rediriger vers l'accueil si la partie n'a pas commencé
  useEffect(() => {
    if (!isGameStarted) navigate('/');
  }, [isGameStarted, navigate]);

  // États locaux pour l'affichage
  const [showMemory, setShowMemory] = useState(false);
  const [memoryText, setMemoryText] = useState('');
  const [memoryType, setMemoryType] = useState<'clue' | 'false-lead' | 'useless' | ''>('');
  const [memoryLocation, setMemoryLocation] = useState('');
  const [memories, setMemories] = useState<PensieveMemory[]>([]);

  useEffect(() => {
    pensieveDataLoader.load(DataResource.PENSIEVE).then(setMemories);
  }, []);

  // Fonction utilitaire pour choisir un type de souvenir selon la phase
  const pickMemoryTypeForPhase = (phase: number): 'clue' | 'false-lead' | 'useless' => {
    // Probabilities by phase (can be easily edited)
    if (phase <= 2) {
      // 1/3 each
      const r = Math.random();
      if (r < 1/3) return 'useless';
      if (r < 2/3) return 'false-lead';
      return 'clue';
    } else if (phase === 3) {
      // 1/9 useless, 2/9 false-lead, 2/3 clue
      const r = Math.random();
      if (r < 1/9) return 'useless';
      if (r < 3/9) return 'false-lead';
      return 'clue';
    } else {
      // phase >= 4: only clue
      return 'clue';
    }
  };

  // Fonction pour plonger dans la pensine
  const handleDiveIntoPensieve = () => {
    // Filtrer les souvenirs disponibles pour la phase courante
    const availableMemories = memories.filter(m => 
      m.phase <= currentPhase &&
      (!m.condition || (() => {
        const [condKey, condVal] = m.condition.split('=');
        if (!condKey) return true;
        return conditions[condKey] === (condVal === '1');
      })())
    );

    // Filtrer les souvenirs déjà vus
    const unseenMemories = availableMemories.filter(m => !memoriesShown.includes(String(m.id)));

    if (unseenMemories.length === 0) {
      setMemoryText(t('Pensieve.noMemory'));
      setMemoryType('');
      setMemoryLocation('');
    } else {
      // Appliquer la règle de tirage par type
      let chosenType = pickMemoryTypeForPhase(currentPhase);
      let typePool = unseenMemories.filter(m => m.type === chosenType);

      if (typePool.length === 0 && currentPhase >= 4) {
        // Si phase >= 4 et pas de souvenir de ce type, afficher qu'il n'y a pas de souvenir

        setMemoryText(t('Pensieve.noMemory'));
        setMemoryType('');
        setMemoryLocation('');
      } else {
        if (typePool.length === 0) {
          // Si aucun souvenir de ce type, prendre n'importe lequel
          typePool = unseenMemories;
        }
        // Sélectionner un souvenir au hasard dans le pool
        const randomMemory = typePool[Math.floor(Math.random() * typePool.length)];
  
        setMemoryText(randomMemory.memory);
        setMemoryType(randomMemory.type);
        setMemoryLocation(randomMemory.location);
  
        // Marquer ce souvenir comme vu s'il ne l'était pas déjà
        if (!memoriesShown.includes(String(randomMemory.id))) {
          setMemoriesShown([...memoriesShown, String(randomMemory.id)]);
        }
      }
    }
    setShowMemory(true);
  };

  // Fonction pour obtenir la classe CSS en fonction du type de souvenir
  const getMemoryTypeClass = (type: string) => {
    switch (type) {
      case 'clue':
        return 'bg-blue-100 border-blue-300';
      case 'false-lead':
        return 'bg-yellow-100 border-yellow-300';
      case 'useless':
        return 'bg-gray-100 border-gray-300';
      default:
        return 'bg-gray-100 border-gray-300';
    }
  };

  // Fonction pour obtenir le texte du type de souvenir
  const getMemoryTypeText = (type: string) => {
    switch (type) {
      case 'clue':
        return t('Pensieve.clueType');
      case 'false-lead':
        return t('Pensieve.falseLeadType');
      case 'useless':
        return t('Pensieve.uselessType');
      default:
        return '';
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">{t('Pensieve.title')}</h2>
      <div className="mb-6">
        <p className="text-gray-700 mb-4">{t('Pensieve.description')}</p>
      </div>
      
      <div className="flex justify-center mb-6">
        <button
          className="p-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition text-lg font-medium"
          onClick={handleDiveIntoPensieve}
        >
          {t('Pensieve.diveButton')}
        </button>
      </div>
      
      {showMemory && (
        <div className={`rounded p-4 shadow text-center text-lg mt-4 border ${getMemoryTypeClass(memoryType)}`}>
          {memoryLocation && (
            <div className="font-semibold mb-2 text-gray-700">
              {t('Pensieve.location')}: {memoryLocation}
            </div>
          )}
          <p className="mb-4">{memoryText}</p>
          <DevOnly>
            <p className="mb-4">{getMemoryTypeText(memoryType)}</p>
          </DevOnly>
        </div>
      )}
    </div>
  );
};

export default Pensieve;
