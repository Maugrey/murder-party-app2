import { useTranslation } from 'react-i18next';
import { useGlobalStore } from '../stores/globalStore';
import { useEffect, useState } from 'react';
import conditionsData from '../data/conditions.json';
import { useNavigate } from 'react-router-dom';

interface ConditionDef {
  id: number;
  label: string;
}

const Admin = () => {
  const { t } = useTranslation();
  const setIsGameStarted = useGlobalStore((s) => s.setIsGameStarted);
  const setCurrentPhase = useGlobalStore((s) => s.setCurrentPhase);
  const setGameStartTime = useGlobalStore((s) => s.setGameStartTime);
  const setPhaseStartTime = useGlobalStore((s) => s.setPhaseStartTime);
  const currentPhase = useGlobalStore((s) => s.currentPhase);
  const setConditions = useGlobalStore((s) => s.setConditions);
  const conditions = useGlobalStore((s) => s.conditions);
  const [conditionDefs, setConditionDefs] = useState<ConditionDef[]>([]);
  const isGameStarted = useGlobalStore((s) => s.isGameStarted);
  const navigate = useNavigate();

  useEffect(() => {
    setConditionDefs(conditionsData as ConditionDef[]);
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
    setGameStartTime(null);
    setPhaseStartTime(null);
    setConditions({});
    useGlobalStore.getState().setCluesViewed({});
    useGlobalStore.getState().setItemsTaken({});
    useGlobalStore.getState().setMemoriesShown([]);
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
        <button className="btn bg-red-600 text-white" onClick={handleReset}>{t('Admin.reset')}</button>
        <button className="btn" onClick={handlePrevPhase}>{t('Admin.prevPhase')}</button>
        <button className="btn" onClick={handleNextPhase}>{t('Admin.nextPhase')}</button>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">{t('Admin.conditionsSection')}</h3>
        <ul className="space-y-2">
          {conditionDefs.map((cond) => (
            <li key={cond.id} className="flex items-center gap-4">
              <span className="flex-1">{cond.label}</span>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={!!conditions[cond.id]}
                  onChange={() => handleConditionToggle(String(cond.id))}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-blue-600 transition"></div>
                <span className="ml-2 text-sm">{conditions[cond.id] ? t('Common.on') : t('Common.off')}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
