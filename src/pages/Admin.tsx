import { getDataLoader, DataResource } from '../utils/dataLoader';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Toggle from '../components/Toggle';
import { useDataLoaderMode } from '../utils/dataLoaderContext';
import { useGameState } from '../hooks/useGameState';

interface ConditionDef {
  id: number;
  label: string;
}

const Admin = () => {
  const { t } = useTranslation();
  const {
    setIsGameStarted,
    setCurrentPhase,
    setGameStartTime,
    setPhaseStartTime,
    setConditions,
    conditions,
    currentPhase,
    isGameStarted,
    setCluesViewed,
    setItemsTaken,
    setMemoriesShown
  } = useGameState();
  const navigate = useNavigate();
  const dataLoaderMode = useDataLoaderMode();
  const conditionsDataLoader = getDataLoader<ConditionDef[]>(dataLoaderMode);
  const [conditionDefs, setConditionDefs] = useState<ConditionDef[]>([]);

  useEffect(() => {
    conditionsDataLoader.load(DataResource.CONDITIONS).then(setConditionDefs);
  }, []);

  useEffect(() => {
    if (!isGameStarted) navigate('/');
  }, [isGameStarted, navigate]);

  const handleConditionToggle = (key: string) => {
    setConditions({ ...conditions, [key]: !conditions[key] });
  };

  const handleReset = () => {
    setIsGameStarted(false);
    setCurrentPhase(1);
    setGameStartTime(0);
    setPhaseStartTime(0);
    setConditions({});
    setCluesViewed({});
    setItemsTaken({});
    setMemoriesShown([]);
  };

  const handleNextPhase = () => {
    setCurrentPhase(currentPhase + 1);
    setPhaseStartTime(Date.now());
  };

  const handlePrevPhase = () => {
    setCurrentPhase(Math.max(1, currentPhase - 1));
    setPhaseStartTime(Date.now());
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">{t('Admin.title')}</h2>
      <div className="flex gap-4 mb-8">
        <Button variant="danger" onClick={handleReset}>{t('Admin.resetButton')}</Button>
        <Button onClick={handlePrevPhase}>{t('Admin.prevPhaseButton')}</Button>
        <Button onClick={handleNextPhase}>{t('Admin.nextPhaseButton')}</Button>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">{t('Admin.conditionsSection')}</h3>
        <ul className="space-y-2">
          {conditionDefs.map((cond) => (
            <li key={cond.id} className="flex items-center gap-4">
              <span className="flex-1">{cond.label}</span>
              <Toggle
                checked={!!conditions[cond.id]}
                onChange={() => handleConditionToggle(String(cond.id))}
                label={conditions[cond.id] ? t('Common.on') : t('Common.off')}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
