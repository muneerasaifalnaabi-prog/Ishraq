import React from 'react';
import { Bell, Search, Sun, Moon, Palette, Menu } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Header = () => {
  const { t, theme, language, updateProfile, setIsMobileMenuOpen } = useAppContext();

  const handleThemeChange = () => {
    const next = theme === 'vibrant' ? 'calm' : theme === 'calm' ? 'elegant' : 'vibrant';
    updateProfile({ theme: next });
  };

  const currentThemeIcon = theme === 'vibrant' ? <Palette className="w-5 h-5 text-pink-500" /> : theme === 'calm' ? <Sun className="w-5 h-5 text-teal-600" /> : <Moon className="w-5 h-5 text-yellow-400" />;

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between py-4 mb-4 gap-4">
      <div className="flex items-center justify-between w-full md:w-auto">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-1">{t('hello')}</h1>
          <p className="text-sm text-foreground/60 font-medium">{t('quote')}</p>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(prev => !prev)}
          className="lg:hidden p-3 bg-secondary/50 hover:bg-primary/10 rounded-2xl transition-colors border border-secondary text-primary"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden lg:block group">
          <Search className="w-4 h-4 absolute top-1/2 -translate-y-1/2 left-4 text-foreground/40 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-10 pr-4 py-2.5 rounded-full bg-secondary/50 border border-secondary hover:border-primary/30 focus:border-primary/50 focus:bg-white text-sm outline-none w-64 transition-all duration-300"
          />
        </div>

        {/* Theme Toggler */}
        <button 
          onClick={handleThemeChange} 
          className="p-3 bg-secondary/50 hover:bg-primary/10 rounded-full transition-colors flex items-center justify-center cursor-pointer shadow-sm border border-secondary"
          title={t(theme)}
        >
          {currentThemeIcon}
        </button>
        
        {/* Language Toggler */}
        <button 
          onClick={() => updateProfile({ language: language === 'ar' ? 'en' : 'ar' })} 
          className="px-4 py-2 bg-secondary/50 hover:bg-primary/10 rounded-full text-sm font-semibold transition-colors shadow-sm border border-secondary disabled:opacity-50"
        >
          {language === 'ar' ? 'EN' : 'عربي'}
        </button>

        {/* Notifs */}
        <button className="relative p-3 hidden md:block bg-secondary/50 hover:bg-primary/10 rounded-full transition-colors shadow-sm border border-secondary">
          <Bell className="w-5 h-5 text-foreground/70" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-400 rounded-full border-2 border-white"></span>
        </button>
        
        {/* Profile */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-accent p-[2px] shadow-md cursor-pointer hover:scale-105 transition-transform flex-shrink-0">
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
            <img src="/avatar.png" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
