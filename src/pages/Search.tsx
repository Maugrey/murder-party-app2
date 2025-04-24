import { useTranslation } from 'react-i18next';
import { useGlobalStore } from '../stores/globalStore';

const Search = () => {
  const { t } = useTranslation();
  const isGameStarted = useGlobalStore((s) => s.isGameStarted);

  if (!isGameStarted) {
    return <div className="text-center py-12 text-lg text-gray-500">{t('Common.notStarted')}</div>;
  }

  return (
    <div className="max-w-xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">{t('Search.title')}</h2>
      {/* TODO: Dropdown lieu, dropdown endroit, bouton fouiller, affichage indice, gestion état */}
      <div className="text-gray-400">{t('Common.todo')}</div>
    </div>
  );
};

export default Search;
