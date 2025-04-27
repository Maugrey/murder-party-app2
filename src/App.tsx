import React from 'react';
import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './App.css';
import './index.css';
import './i18n';
import Home from './pages/Home.js';
import Interrogate from './pages/Interrogate.js';
import Search from './pages/Search.js';
import Pensieve from './pages/Pensieve.js';
import Shop from './pages/Shop.js';
import Admin from './pages/Admin.js';
import Header from './components/Header';
import { DataLoaderModeContext } from './utils/dataLoaderContext';

const dataLoaderMode = (import.meta.env.VITE_DATA_LOADER_MODE as 'static' | 'api') || 'static';

function App() {
  const { t } = useTranslation();

  return (
    <DataLoaderModeContext.Provider value={dataLoaderMode}>
      <Router>
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
      </Router>
    </DataLoaderModeContext.Provider>
  );
}

export default App;
