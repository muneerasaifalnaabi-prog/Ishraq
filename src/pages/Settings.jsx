import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, User, Palette, Globe, Volume2, Shield, Save, Camera, Check } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Settings = () => {
  const { t, language, theme, setTheme, setLanguage, userName, avatarIndex, updateProfile } = useAppContext();
  
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const [localName, setLocalName] = useState(userName);
  const [isEditingName, setIsEditingName] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const avatars = [
    '/avatar.png',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=Lily&backgroundColor=b6e3f4',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=Maya&backgroundColor=ffdfbf'
  ];

  const cycleAvatar = () => {
    const nextIndex = (avatarIndex + 1) % avatars.length;
    updateProfile({ avatarIndex: nextIndex });
  };

  const handleSaveName = async () => {
    if (isEditingName) {
      await updateProfile({ userName: localName });
    }
    setIsEditingName(!isEditingName);
  };

  useEffect(() => {
    setLocalName(userName);
  }, [userName]);

  return (
    <div className={`flex-1 w-full flex flex-col relative transition-all duration-1000 ease-out ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      
      {/* Ambient Background */}
      <div className="absolute top-[20%] left-[50%] w-[50rem] h-[50rem] bg-gradient-to-br from-primary/10 via-purple-400/5 to-transparent rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none mix-blend-multiply dark:mix-blend-screen"></div>
      
      {/* Elegant Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 relative z-10 px-2 md:px-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-foreground/90 flex items-center gap-4 mb-3">
            {t('settings')}
            <SettingsIcon className="w-8 h-8 text-primary opacity-80" />
          </h2>
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-foreground/40 font-bold ml-1">
             {language === 'ar' ? 'تخصيص تجربتك' : 'Customize your experience'}
          </p>
        </div>
        
        <div className="flex items-center gap-3 bg-white/40 dark:bg-card/40 backdrop-blur-2xl px-6 py-3 rounded-full border border-white/60 shadow-sm">
           <Shield className="w-4 h-4 text-emerald-500" />
           <span className="text-[10px] font-bold text-foreground/70 uppercase tracking-widest">Version 1.0.5</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 relative z-10 px-2 md:px-6 mb-12">
        
        {/* Avatar & Profile Customizer (Spans 5 cols) */}
        <section className="lg:col-span-5 bg-gradient-to-br from-white/70 to-white/30 dark:from-card/70 dark:to-card/30 p-10 rounded-[3rem] border border-white/60 shadow-[0_32px_64px_rgba(0,0,0,0.06)] backdrop-blur-3xl flex flex-col items-center text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-primary/20 transition-colors duration-1000"></div>
          
          <h3 className="w-full font-serif text-2xl mb-12 flex items-center justify-center gap-3 text-foreground/90 tracking-tight">
             {language === 'ar' ? 'الملف الشخصي' : 'Profile'}
          </h3>
          
          <div 
            onClick={cycleAvatar}
            className="w-56 h-56 rounded-full border-[12px] border-white/80 p-1 mb-12 relative group/avatar overflow-hidden bg-gradient-to-tr from-primary/20 to-accent/20 cursor-pointer shadow-[0_16px_48px_rgba(0,0,0,0.1)] hover:scale-105 transition-all duration-700 ease-out"
          >
            <img src={avatars[avatarIndex]} alt="Avatar" className="w-full h-full object-cover rounded-full" />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md flex flex-col items-center justify-center text-white opacity-0 group-hover/avatar:opacity-100 transition-all duration-500">
              <Camera className="w-10 h-10 mb-3" />
              <span className="font-bold text-[10px] tracking-[0.2em] uppercase">{language === 'ar' ? 'تغيير المظهر' : 'Change Look'}</span>
            </div>
          </div>

          <div className="w-full space-y-8 relative z-10">
             <div className="flex flex-col gap-4 text-left rtl:text-right">
                <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-foreground/40 pl-2 rtl:pl-0 rtl:pr-2">{language === 'ar' ? 'الاسم المستخدم' : 'Display Name'}</label>
                <div className="flex gap-3">
                   <input 
                      type="text" 
                      value={localName}
                      disabled={!isEditingName}
                      onChange={(e) => setLocalName(e.target.value)}
                      className={`flex-1 bg-white/40 dark:bg-black/20 px-6 py-4 rounded-[1.5rem] border transition-all duration-500 font-serif text-xl outline-none 
                        ${isEditingName 
                          ? 'border-primary bg-white shadow-[0_8px_30px_rgba(var(--primary-rgb),0.2)]' 
                          : 'border-white/50 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]'}`}
                   />
                   <button 
                      onClick={handleSaveName}
                      className={`px-8 rounded-[1.5rem] transition-all duration-500 font-bold text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:-translate-y-1 
                        ${isEditingName 
                          ? 'bg-primary text-white shadow-[0_8px_20px_rgba(var(--primary-rgb),0.3)]' 
                          : 'bg-white/60 dark:bg-black/20 border border-white/50 text-foreground/60 shadow-sm'}`}
                   >
                      {isEditingName ? (language === 'ar' ? 'حفظ' : 'SAVE') : (language === 'ar' ? 'تعديل' : 'EDIT')}
                   </button>
                </div>
             </div>

             <div className="pt-8 border-t border-black/5 dark:border-white/5 grid grid-cols-2 gap-4">
                <div className="bg-white/40 dark:bg-black/20 border border-white/50 p-6 rounded-[2rem] text-center shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] hover:bg-white hover:shadow-lg transition-all duration-300">
                   <span className="block text-[8px] font-bold uppercase tracking-[0.3em] text-primary mb-2">Level</span>
                   <span className="text-4xl font-serif text-foreground/90">5</span>
                </div>
                <div className="bg-white/40 dark:bg-black/20 border border-white/50 p-6 rounded-[2rem] text-center shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] hover:bg-white hover:shadow-lg transition-all duration-300">
                   <span className="block text-[8px] font-bold uppercase tracking-[0.3em] text-orange-500 mb-2">Shine Points</span>
                   <span className="text-4xl font-serif text-foreground/90">1,250</span>
                </div>
             </div>
          </div>
        </section>

        {/* General Settings (Spans 7 cols) */}
        <section className="lg:col-span-7 space-y-6">
          <div className="bg-gradient-to-br from-white/70 to-white/30 dark:from-card/70 dark:to-card/30 p-8 md:p-10 rounded-[3rem] border border-white/60 shadow-[0_32px_64px_rgba(0,0,0,0.06)] backdrop-blur-3xl h-full flex flex-col">
            
            <h3 className="font-serif text-2xl mb-10 flex items-center gap-3 text-foreground/90 tracking-tight">
               {language === 'ar' ? 'تخصيص التجربة' : 'Preferences'}
            </h3>

            <div className="space-y-6 flex-1">
              
              {/* Theme Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white/60 dark:bg-black/20 rounded-[2rem] border border-white/50 shadow-sm group hover:border-white hover:shadow-md transition-all duration-300 gap-4 sm:gap-0">
                <div className="flex items-center gap-5">
                   <div className="w-12 h-12 flex items-center justify-center bg-white/80 dark:bg-card border border-white rounded-full shadow-sm">
                      <Palette className="w-5 h-5 text-primary"/>
                   </div>
                   <span className="font-serif text-xl text-foreground/90 tracking-tight">{language === 'ar' ? 'السمة' : 'Theme'}</span>
                </div>
                <select 
                   value={theme === 'dark' || theme === 'elegant' ? 'dark' : 'light'}
                   onChange={(e) => updateProfile({ theme: e.target.value })}
                   className="bg-white/80 dark:bg-card rounded-full px-6 py-3 outline-none text-[10px] font-bold uppercase tracking-[0.2em] border border-white/60 focus:ring-2 focus:ring-primary/20 cursor-pointer shadow-sm text-center appearance-none"
                >
                  <option value="light">{language === 'ar' ? 'مضيء (خزفي)' : 'Light (Porcelain)'}</option>
                  <option value="dark">{language === 'ar' ? 'داكن (أوبسيديان)' : 'Dark (Obsidian)'}</option>
                </select>
              </div>

              {/* Language Toggle */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white/60 dark:bg-black/20 rounded-[2rem] border border-white/50 shadow-sm group hover:border-white hover:shadow-md transition-all duration-300 gap-4 sm:gap-0">
                <div className="flex items-center gap-5">
                   <div className="w-12 h-12 flex items-center justify-center bg-white/80 dark:bg-card border border-white rounded-full shadow-sm">
                      <Globe className="w-5 h-5 text-primary"/>
                   </div>
                   <span className="font-serif text-xl text-foreground/90 tracking-tight">{language === 'ar' ? 'اللغة' : 'Language'}</span>
                </div>
                <div className="flex bg-white/40 dark:bg-black/40 p-1.5 rounded-full border border-white/50 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]">
                  <button onClick={() => updateProfile({ language: 'ar' })} className={`px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 ${language==='ar' ? 'bg-white shadow-[0_4px_15px_rgba(0,0,0,0.08)] text-primary':'text-foreground/40 hover:text-foreground'}`}>العربية</button>
                  <button onClick={() => updateProfile({ language: 'en' })} className={`px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 ${language==='en' ? 'bg-white shadow-[0_4px_15px_rgba(0,0,0,0.08)] text-primary':'text-foreground/40 hover:text-foreground'}`}>English</button>
                </div>
              </div>

              {/* Sound Switch */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white/60 dark:bg-black/20 rounded-[2rem] border border-white/50 shadow-sm group hover:border-white hover:shadow-md transition-all duration-300 gap-4 sm:gap-0">
                <div className="flex items-center gap-5">
                   <div className="w-12 h-12 flex items-center justify-center bg-white/80 dark:bg-card border border-white rounded-full shadow-sm">
                      <Volume2 className="w-5 h-5 text-primary"/>
                   </div>
                   <span className="font-serif text-xl text-foreground/90 tracking-tight">{language === 'ar' ? 'المؤثرات الصوتية' : 'Sound Effects'}</span>
                </div>
                
                {/* Premium Toggle */}
                <button 
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`w-[4.5rem] h-8 rounded-full relative transition-all duration-500 border shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)] self-start sm:self-auto
                    ${soundEnabled ? 'bg-emerald-400 border-emerald-500' : 'bg-white/40 dark:bg-black/40 border-white/50'}`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full absolute top-[3px] transition-all duration-500 shadow-[0_2px_5px_rgba(0,0,0,0.2)] flex items-center justify-center
                    ${soundEnabled 
                      ? (language === 'ar' ? 'right-[2.5rem]' : 'left-[2.5rem]') 
                      : (language === 'ar' ? 'right-1' : 'left-1')}`}
                  >
                  </div>
                </button>
              </div>

            </div>
            
            {/* Security Status - Bottom area */}
            <div className="mt-8 pt-8 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <Shield className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="flex flex-col text-left rtl:text-right">
                    <span className="font-bold text-[9px] text-foreground/40 uppercase tracking-[0.3em] mb-1">{language === 'ar' ? 'حالة الحساب' : 'Account Status'}</span>
                    <span className="text-xs font-serif italic text-emerald-600/80">{language === 'ar' ? 'محمي ومشفر بالكامل' : 'Protected & Encrypted'}</span>
                </div>
              </div>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
