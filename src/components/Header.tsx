import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Timer from './Timer';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-10 bg-white shadow px-4 py-2 flex flex-col">
      <nav className="flex md:flex-col items-center w-full">
        {/* Burger menu for mobile */}
        <div 
          className="md:hidden cursor-pointer" 
          onClick={toggleMobileMenu}
        >
          ☰
        </div>
        <div className="flex-1 flex justify-center">
          <Link to="/" className="font-bold text-lg text-blue-700 hover:text-blue-900 transition">MurderPartyApp</Link>
        </div>
        <div className="hidden md:flex gap-4">
          <Link to="/interrogate" className="text-blue-600 hover:text-blue-800 font-medium transition">{t('App.interrogate')}</Link>
          <Link to="/search" className="text-blue-600 hover:text-blue-800 font-medium transition">{t('App.search')}</Link>
          <Link to="/pensieve" className="text-blue-600 hover:text-blue-800 font-medium transition">{t('App.pensieve')}</Link>
          <Link to="/shop" className="text-blue-600 hover:text-blue-800 font-medium transition">{t('App.shop')}</Link>
          <Link to="/admin" className="text-blue-600 hover:text-blue-800 font-medium transition">{t('App.admin')}</Link>
        </div>
      </nav>
      
      {/* Mobile menu with animation */}
      <div className={`md:hidden flex flex-col gap-2 overflow-hidden transition-all duration-300 ease-in-out
        ${mobileMenuOpen 
          ? 'max-h-60 opacity-100 mt-2 pb-2 pt-2 border-t' 
          : 'max-h-0 opacity-0 m-0 p-0 border-t-0'}`}
      >
        <Link to="/interrogate" className="text-center text-blue-600 hover:text-blue-800 py-1 transition" onClick={toggleMobileMenu}>{t('App.interrogate')}</Link>
        <Link to="/search" className="text-center text-blue-600 hover:text-blue-800 py-1 transition" onClick={toggleMobileMenu}>{t('App.search')}</Link>
        <Link to="/pensieve" className="text-center text-blue-600 hover:text-blue-800 py-1 transition" onClick={toggleMobileMenu}>{t('App.pensieve')}</Link>
        <Link to="/shop" className="text-center text-blue-600 hover:text-blue-800 py-1 transition" onClick={toggleMobileMenu}>{t('App.shop')}</Link>
        <Link to="/admin" className="text-center text-blue-600 hover:text-blue-800 py-1 transition" onClick={toggleMobileMenu}>{t('App.admin')}</Link>
      </div>
      
      <div className="flex justify-center mt-2">
        <Timer />
      </div>
    </header>
  );
};

export default Header;
