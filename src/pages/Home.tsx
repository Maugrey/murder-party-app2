import { useTranslation } from 'react-i18next';
import { useGlobalStore } from '../stores/globalStore';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isGameStarted = useGlobalStore((s) => s.isGameStarted);
  const setIsGameStarted = useGlobalStore((s) => s.setIsGameStarted);
  const setGameStartTime = useGlobalStore((s) => s.setGameStartTime);
  const setPhaseStartTime = useGlobalStore((s) => s.setPhaseStartTime);
  const setCurrentPhase = useGlobalStore((s) => s.setCurrentPhase);

  const handleStart = () => {
    setIsGameStarted(true);
    setGameStartTime(Date.now());
    setPhaseStartTime(Date.now());
    setCurrentPhase(1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
      <h1 className="text-3xl font-bold mb-4">{t('Home.title')}</h1>
      {!isGameStarted ? (
        <button
          className="px-6 py-3 rounded bg-blue-600 text-white text-lg shadow hover:bg-blue-700 transition"
          onClick={handleStart}
        >
          {t('Home.startButton')}
        </button>
      ) : (
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <button className="btn" onClick={() => navigate('/interrogate')}>{t('Home.interrogateButton')}</button>
          <button className="btn" onClick={() => navigate('/search')}>{t('Home.searchButton')}</button>
          <button className="btn" onClick={() => navigate('/shop')}>{t('Home.shopButton')}</button>
          <button className="btn" onClick={() => navigate('/pensieve')}>{t('Home.pensieveButton')}</button>
        </div>
      )}
    </div>
  );
};

export default Home;
