import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './App.css';
import './index.css';
import './i18n';
import Home from './pages/Home.tsx';
import Interrogate from './pages/Interrogate.tsx';
import Search from './pages/Search.tsx';
import Pensieve from './pages/Pensieve.tsx';
import Shop from './pages/Shop.tsx';
import Admin from './pages/Admin.tsx';
import Header from './components/Header';

function App() {
  const { t } = useTranslation();

  return (
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
  );
}

export default App;
