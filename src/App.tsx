import { Suspense, useState } from 'react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Sticky menu */}
        <header className="sticky top-0 z-10 bg-white shadow px-4 py-2 flex flex-col">
          <nav className="flex items-center w-full gap-4">
            {/* Burger menu for mobile */}
            <div 
              className="md:hidden cursor-pointer" 
              onClick={toggleMobileMenu}
            >
              ☰
            </div>
            <div className="flex-1 flex justify-center">
              <Link to="/" className="font-bold text-lg">MurderPartyApp</Link>
            </div>
            <div className="hidden md:flex gap-4">
              <Link to="/interrogate">{t('App.interrogate')}</Link>
              <Link to="/search">{t('App.search')}</Link>
              <Link to="/pensieve">{t('App.pensieve')}</Link>
              <Link to="/shop">{t('App.shop')}</Link>
              <Link to="/admin">{t('App.admin')}</Link>
            </div>
          </nav>
          
          {/* Menu mobile avec animation */}
          <div className={`md:hidden flex flex-col gap-2 overflow-hidden transition-all duration-300 ease-in-out
            ${mobileMenuOpen 
              ? 'max-h-60 opacity-100 mt-2 pb-2 pt-2 border-t' 
              : 'max-h-0 opacity-0 m-0 p-0 border-t-0'}`}
          >
            <Link to="/interrogate" className="text-center" onClick={toggleMobileMenu}>{t('App.interrogate')}</Link>
            <Link to="/search" className="text-center" onClick={toggleMobileMenu}>{t('App.search')}</Link>
            <Link to="/pensieve" className="text-center" onClick={toggleMobileMenu}>{t('App.pensieve')}</Link>
            <Link to="/shop" className="text-center" onClick={toggleMobileMenu}>{t('App.shop')}</Link>
            <Link to="/admin" className="text-center" onClick={toggleMobileMenu}>{t('App.admin')}</Link>
          </div>
          
          <div className="flex justify-center mt-2">
            <Timer />
          </div>
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
