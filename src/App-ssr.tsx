import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// Imports sans extension .tsx pour compatibilité SSR
import Home from './pages/Home.js';
import Interrogate from './pages/Interrogate.js';
import Search from './pages/Search.js';
import Pensieve from './pages/Pensieve.js';
import Shop from './pages/Shop.js';
import Admin from './pages/Admin.js';
import Header from './components/Header.js';
import { DataLoaderModeContext } from './utils/dataLoaderContext.js';

// Note: StaticRouter sera fourni par le fichier entry-server.tsx
// Utilisation d'une valeur par défaut pour le SSR
const dataLoaderMode = 'static';

function App() {
  const { t } = useTranslation();

  return (
    <DataLoaderModeContext.Provider value={dataLoaderMode}>
      {/* Pas de Router ici - StaticRouter est utilisé dans entry-server.tsx */}
      <div className="flex flex-col min-h-screen">
        {/* Sticky menu */}
        <Header />
        {/* Main content */}
        <main className="flex-1 p-4">
          <Suspense fallback={<div>{t('Common.loading')}</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/interrogate" element={<Interrogate />} />
              <Route path="/search" element={<Search />} />
              <Route path="/pensieve" element={<Pensieve />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </DataLoaderModeContext.Provider>
  );
}

export default App;