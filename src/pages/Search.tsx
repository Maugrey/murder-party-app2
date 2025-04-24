import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGlobalStore } from '../stores/globalStore';
import searchCluesData from '../data/search-clues.json';

// Interface pour les données d'indices de recherche selon les specs
interface SearchClue {
  id: number;
  location: string;
  place: string;
  clue: string;
  type: 'object' | 'observation';
  start_phase: number;
  end_phase: number;
  condition: string;
}

const Search = () => {
  const { t } = useTranslation();
  const isGameStarted = useGlobalStore((s) => s.isGameStarted);
  const currentPhase = useGlobalStore((s) => s.currentPhase);
  const conditions = useGlobalStore((s) => s.conditions);
  const itemsTaken = useGlobalStore((s) => s.itemsTaken);
  const setItemsTaken = useGlobalStore((s) => s.setItemsTaken);
  const navigate = useNavigate();

  // Rediriger vers l'accueil si la partie n'a pas commencé
  useEffect(() => {
    if (!isGameStarted) navigate('/');
  }, [isGameStarted, navigate]);

  // Préparer les clues avec le bon typage
  const clues: SearchClue[] = (searchCluesData as SearchClue[]);

  // États locaux pour la sélection et l'affichage
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedPlace, setSelectedPlace] = useState<string>('');
  const [showClue, setShowClue] = useState(false);
  const [clueText, setClueText] = useState('');
  const [clueType, setClueType] = useState<'object' | 'observation' | ''>('');
  const [itemTaken, setItemTaken] = useState(false);

  // Liste des lieux disponibles pour la phase courante
  const locations = Array.from(new Set(
    clues.filter(c => 
      (!c.start_phase || c.start_phase <= currentPhase) &&
      (!c.end_phase || c.end_phase >= currentPhase) &&
      (!c.condition || (() => {
        const [condKey, condVal] = c.condition.split('=');
        if (!condKey) return true;
        return conditions[condKey] === (condVal === '1');
      })())
    ).map(c => c.location)
  ));

  // Liste des endroits disponibles pour le lieu sélectionné
  const places = Array.from(new Set(
    clues.filter(c => 
      c.location === selectedLocation &&
      (!c.start_phase || c.start_phase <= currentPhase) &&
      (!c.end_phase || c.end_phase >= currentPhase) &&
      (!c.condition || (() => {
        const [condKey, condVal] = c.condition.split('=');
        if (!condKey) return true;
        return conditions[condKey] === (condVal === '1');
      })())
    ).map(c => c.place)
  ));

  // Réinitialiser l'affichage quand on change de sélection
  useEffect(() => {
    setShowClue(false);
    setClueText('');
    setClueType('');
    setItemTaken(false);
    
    if (selectedLocation && selectedPlace) {
      // Vérifier si l'objet a déjà été pris
      const key = `${selectedLocation}|${selectedPlace}`;
      if (itemsTaken[key]) {
        setItemTaken(true);
      }
    }
  }, [selectedLocation, selectedPlace, itemsTaken]);

  // Fonction pour gérer la recherche
  const handleSearch = () => {
    // Si l'objet a déjà été pris, afficher un message approprié
    if (itemTaken) {
      setClueText(t('Search.itemAlreadyTaken'));
      setShowClue(true);
      return;
    }

    // Trouver l'indice correspondant
    const clue = clues.find(
      c => c.location === selectedLocation && c.place === selectedPlace
    );

    if (!clue) {
      setClueText(t('Search.noClue'));
      setClueType('');
    } else {
      setClueText(clue.clue);
      setClueType(clue.type);
    }
    
    setShowClue(true);
  };

  // Fonction pour garder un objet
  const handleKeepItem = () => {
    const key = `${selectedLocation}|${selectedPlace}`;
    setItemsTaken({ ...itemsTaken, [key]: true });
    setItemTaken(true);
    setClueText(t('Search.itemKept'));
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">{t('Search.title')}</h2>
      <div className="flex flex-col gap-4 mb-6">
        <select
          className="p-2 border rounded"
          value={selectedLocation}
          onChange={e => {
            setSelectedLocation(e.target.value);
            setSelectedPlace('');
          }}
        >
          <option value="">{t('Search.selectLocation')}</option>
          {locations.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
        <select
          className="p-2 border rounded"
          value={selectedPlace}
          onChange={e => setSelectedPlace(e.target.value)}
          disabled={!selectedLocation}
        >
          <option value="">{t('Search.selectPlace')}</option>
          {places.map(place => (
            <option key={place} value={place}>{place}</option>
          ))}
        </select>
        <button
          className="p-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          disabled={!selectedLocation || !selectedPlace}
          onClick={handleSearch}
        >
          {t('Search.searchButton')}
        </button>
      </div>
      
      {showClue && (
        <div className="bg-gray-100 rounded p-4 shadow text-center text-lg mt-4">
          <p>{clueText}</p>
          
          {/* Afficher le bouton "Garder l'indice" uniquement pour les objets non pris */}
          {clueType === 'object' && !itemTaken && (
            <button
              className="mt-4 p-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
              onClick={handleKeepItem}
            >
              {t('Search.keepItemButton')}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
