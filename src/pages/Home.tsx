import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t('Home.title')}</h1>
      <button className="btn btn-primary">{t('Home.startButton')}</button>
    </div>
  );
};

export default Home;
