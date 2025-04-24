import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
import Timer from './components/Timer.tsx';

function App() {
  const { t } = useTranslation();

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Sticky menu */}
        <header className="sticky top-0 z-10 bg-white shadow flex items-center justify-between px-4 py-2">
          <nav className="flex-1 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="font-bold text-lg">MurderPartyApp</Link>
              <div className="hidden md:flex gap-4">
                <Link to="/interrogate">{t('App.interrogate')}</Link>
                <Link to="/search">{t('App.search')}</Link>
                <Link to="/pensieve">{t('App.pensieve')}</Link>
                <Link to="/shop">{t('App.shop')}</Link>
                <Link to="/admin">{t('App.admin')}</Link>
              </div>
            </div>
            {/* Burger menu for mobile (non-fonctionnel, à compléter plus tard) */}
            <div className="md:hidden">☰</div>
          </nav>
          <Timer />
        </header>
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
