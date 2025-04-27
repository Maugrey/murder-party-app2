import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGameState } from '../hooks/useGameState';

const Shop = () => {
  const { t } = useTranslation();
  const { isGameStarted } = useGameState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isGameStarted) navigate('/');
  }, [isGameStarted, navigate]);

  if (!isGameStarted) {
    return <div className="text-center py-12 text-lg text-gray-500">{t('Common.notStarted')}</div>;
  }

  return (
    <div className="max-w-xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">{t('Shop.title')}</h2>
      <div className="text-gray-400">{t('Common.todo')}</div>
    </div>
  );
};

export default Shop;
