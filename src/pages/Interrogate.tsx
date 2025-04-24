import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGlobalStore } from '../stores/globalStore';

const Interrogate = () => {
  const { t } = useTranslation();
  const isGameStarted = useGlobalStore((s) => s.isGameStarted);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isGameStarted) navigate('/');
  }, [isGameStarted, navigate]);

  if (!isGameStarted) {
    return <div className="text-center py-12 text-lg text-gray-500">{t('Common.notStarted')}</div>;
  }

  return (
    <div className="max-w-xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">{t('Interrogate.title')}</h2>
      {/* TODO: Dropdown lieu, dropdown PNJ, bouton interroger, affichage indice, gestion état */}
      <div className="text-gray-400">{t('Common.todo')}</div>
    </div>
  );
};

export default Interrogate;
