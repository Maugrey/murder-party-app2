import { useTranslation } from 'react-i18next';
import { useGameState } from '../hooks/useGameState';
import NavigationButton from '../components/NavigationButton';
import Button from '../components/Button';

const Home = () => {
  const { t } = useTranslation();
  const { isGameStarted, setIsGameStarted, setGameStartTime, setPhaseStartTime, setCurrentPhase } = useGameState();

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
        <Button
          variant="primary"
          className="px-6 py-3 text-lg shadow"
          onClick={handleStart}
        >
          {t('Home.startButton')}
        </Button>
      ) : (
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <NavigationButton to="/interrogate">
            {t('Home.interrogateButton')}
          </NavigationButton>
          
          <NavigationButton to="/search">
            {t('Home.searchButton')}
          </NavigationButton>
          
          <NavigationButton to="/shop">
            {t('Home.shopButton')}
          </NavigationButton>
          
          <NavigationButton to="/pensieve">
            {t('Home.pensieveButton')}
          </NavigationButton>
        </div>
      )}
    </div>
  );
};

export default Home;
