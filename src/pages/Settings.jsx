import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, User, Palette, Globe, Volume2, Shield, Camera, Check, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

// Import all local avatar images
import av0 from '../assets/avatar/uifaces-cartoon-avatar.jpg';
import av1 from '../assets/avatar/uifaces-cartoon-avatar (1).jpg';
import av2 from '../assets/avatar/uifaces-cartoon-avatar (2).jpg';
import av3 from '../assets/avatar/uifaces-cartoon-avatar (3).jpg';
import av4 from '../assets/avatar/uifaces-cartoon-avatar (4).jpg';
import av5 from '../assets/avatar/uifaces-cartoon-avatar (5).jpg';
import av6 from '../assets/avatar/uifaces-cartoon-avatar (6).jpg';
import av7 from '../assets/avatar/uifaces-cartoon-avatar (7).jpg';
import av8 from '../assets/avatar/uifaces-cartoon-avatar (8).jpg';
import av9 from '../assets/avatar/uifaces-cartoon-avatar (9).jpg';
import av10 from '../assets/avatar/uifaces-cartoon-avatar (10).jpg';

const AVATARS = [av0, av1, av2, av3, av4, av5, av6, av7, av8, av9, av10];

const Settings = () => {
  const { t, language, theme, setTheme, setLanguage, userName, avatarIndex, updateProfile } = useAppContext();

  const [animateIn, setAnimateIn] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [localName, setLocalName] = useState(userName);
  const [isEditingName, setIsEditingName] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setLocalName(userName);
  }, [userName]);

  const handleSaveName = async () => {
    if (isEditingName) {
      await updateProfile({ userName: localName });
    }
    setIsEditingName(!isEditingName);
  };

  const selectAvatar = (index) => {
    updateProfile({ avatarIndex: index });
    setShowAvatarPicker(false);
  };

  return (
    <div className={`flex-1 w-full flex flex-col relative transition-all duration-1000 ease-out ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

      {/* Ambient glows */}
      <div className="absolute top-[10%] left-[30%] w-[40vw] h-[40vw] bg-[hsl(var(--glow-1))] rounded-full blur-[160px] opacity-20 pointer-events-none animate-[float_12s_ease-in-out_infinite]" />

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 relative z-10 px-2 md:px-6">
        <div>
          <h1 className="text-5xl md:text-6xl font-serif tracking-tight text-foreground flex items-center gap-6 mb-4">
            {t('settings')}
            <SettingsIcon className="w-10 h-10 text-primary" />
          </h1>
          <p className="text-[11px] md:text-xs uppercase tracking-[0.5em] text-foreground/50 font-bold">
            {language === 'ar' ? 'تخصيص تجربتك' : 'Customize your experience'}
          </p>
        </div>

        <div className="flex items-center gap-3 glass px-6 py-3 rounded-full">
           <Shield className="w-4 h-4 text-primary" />
           <span className="text-[10px] font-bold text-foreground/70 uppercase tracking-[0.3em]">Version 1.0.5</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 relative z-10 px-2 md:px-6 mb-12">

        {/* ── Avatar & Profile (5 cols) ── */}
        <section className="lg:col-span-5 glass-premium p-10 rounded-[3rem] flex flex-col items-center text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[hsl(var(--glow-1))] opacity-10 rounded-full blur-[60px] pointer-events-none" />

          <h3 className="w-full font-serif text-3xl mb-14 text-foreground tracking-tight">
            {language === 'ar' ? 'الملف الشخصي' : 'Profile'}
          </h3>

          {/* Avatar — click to open picker */}
          <div
            onClick={() => setShowAvatarPicker(true)}
            className="w-56 h-56 rounded-full border-[10px] border-background shadow-[0_24px_64px_rgba(0,0,0,0.15)] mb-12 relative group/avatar overflow-hidden cursor-pointer hover:scale-105 transition-all duration-700 ease-out"
          >
            <img
              src={AVATARS[avatarIndex ?? 0]}
              alt="Avatar"
              className="w-full h-full object-cover rounded-full"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm flex flex-col items-center justify-center text-background opacity-0 group-hover/avatar:opacity-100 transition-all duration-500 rounded-full">
              <Camera className="w-10 h-10 mb-3" />
              <span className="font-bold text-[10px] tracking-[0.3em] uppercase">
                {language === 'ar' ? 'تغيير الصورة' : 'Change Avatar'}
              </span>
            </div>
          </div>

          {/* Avatars strip preview */}
          <div className="flex gap-3 mb-12">
            {AVATARS.slice(0, 5).map((src, i) => (
              <button
                key={i}
                onClick={() => selectAvatar(i)}
                className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all duration-300 hover:scale-110 ${(avatarIndex ?? 0) === i ? 'border-primary shadow-[0_4px_16px_rgba(0,0,0,0.2)] scale-110' : 'border-secondary opacity-60 hover:opacity-100'}`}
              >
                <img src={src} alt={`avatar ${i}`} className="w-full h-full object-cover" />
              </button>
            ))}
            <button
              onClick={() => setShowAvatarPicker(true)}
              className="w-12 h-12 rounded-full border-2 border-dashed border-secondary flex items-center justify-center text-foreground/40 hover:text-primary hover:border-primary transition-all duration-300 text-xs font-bold"
            >
              +{AVATARS.length - 5}
            </button>
          </div>

          <div className="w-full space-y-8 relative z-10">
            {/* Name Editor */}
            <div className="flex flex-col gap-4 text-left rtl:text-right">
               <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/50 pl-2 rtl:pl-0 rtl:pr-2">
                 {language === 'ar' ? 'الاسم المستخدم' : 'Display Name'}
               </label>
               <div className="flex gap-3">
                  <input
                     type="text"
                     value={localName}
                     disabled={!isEditingName}
                     onChange={(e) => setLocalName(e.target.value)}
                     className={`flex-1 px-6 py-4 rounded-[1.5rem] border transition-all duration-500 font-serif text-xl outline-none bg-background/50
                       ${isEditingName
                         ? 'border-primary shadow-[0_4px_20px_rgba(0,0,0,0.1)]'
                         : 'border-secondary'}`}
                  />
                  <button
                     onClick={handleSaveName}
                     className={`px-8 rounded-[1.5rem] transition-all duration-500 font-bold text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:-translate-y-1
                       ${isEditingName
                         ? 'bg-primary text-primary-foreground shadow-[0_8px_24px_rgba(0,0,0,0.15)]'
                         : 'bg-secondary border border-secondary text-foreground/60'}`}
                  >
                     {isEditingName ? <Check className="w-4 h-4" /> : (language === 'ar' ? 'تعديل' : 'EDIT')}
                  </button>
               </div>
            </div>

            {/* Stats */}
            <div className="pt-8 border-t border-secondary grid grid-cols-2 gap-4">
               <div className="bg-background/50 border border-secondary p-6 rounded-[2rem] text-center hover:border-primary/20 hover:shadow-md transition-all duration-300">
                  <span className="block text-[9px] font-bold uppercase tracking-[0.3em] text-primary mb-2">Level</span>
                  <span className="text-5xl font-serif text-foreground">5</span>
               </div>
               <div className="bg-background/50 border border-secondary p-6 rounded-[2rem] text-center hover:border-primary/20 hover:shadow-md transition-all duration-300">
                  <span className="block text-[9px] font-bold uppercase tracking-[0.3em] text-primary mb-2">Shine Pts</span>
                  <span className="text-4xl font-serif text-foreground">1,250</span>
               </div>
            </div>
          </div>
        </section>

        {/* ── Preferences (7 cols) ── */}
        <section className="lg:col-span-7 space-y-6">
          <div className="glass-premium p-10 md:p-12 rounded-[3rem] h-full flex flex-col">

            <h3 className="font-serif text-3xl mb-12 text-foreground tracking-tight">
               {language === 'ar' ? 'تخصيص التجربة' : 'Preferences'}
            </h3>

            <div className="space-y-5 flex-1">

              {/* Theme */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-7 bg-background/50 rounded-[2rem] border border-secondary hover:border-primary/20 hover:shadow-md transition-all duration-300 gap-4 sm:gap-0">
                <div className="flex items-center gap-5">
                   <div className="w-12 h-12 flex items-center justify-center bg-secondary rounded-full border border-secondary">
                      <Palette className="w-5 h-5 text-primary"/>
                   </div>
                   <span className="font-serif text-xl text-foreground tracking-tight">
                     {language === 'ar' ? 'السمة' : 'Theme'}
                   </span>
                </div>
                <div className="flex bg-background/50 p-1.5 rounded-full border border-secondary">
                  <button
                    onClick={() => updateProfile({ theme: 'light' })}
                    className={`px-7 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 ${theme !== 'dark' ? 'bg-foreground text-background shadow-sm' : 'text-foreground/40 hover:text-foreground'}`}
                  >
                    {language === 'ar' ? 'فاتح' : 'Light'}
                  </button>
                  <button
                    onClick={() => updateProfile({ theme: 'dark' })}
                    className={`px-7 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 ${theme === 'dark' ? 'bg-foreground text-background shadow-sm' : 'text-foreground/40 hover:text-foreground'}`}
                  >
                    {language === 'ar' ? 'داكن' : 'Dark'}
                  </button>
                </div>
              </div>

              {/* Language */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-7 bg-background/50 rounded-[2rem] border border-secondary hover:border-primary/20 hover:shadow-md transition-all duration-300 gap-4 sm:gap-0">
                <div className="flex items-center gap-5">
                   <div className="w-12 h-12 flex items-center justify-center bg-secondary rounded-full border border-secondary">
                      <Globe className="w-5 h-5 text-primary"/>
                   </div>
                   <span className="font-serif text-xl text-foreground tracking-tight">
                     {language === 'ar' ? 'اللغة' : 'Language'}
                   </span>
                </div>
                <div className="flex bg-background/50 p-1.5 rounded-full border border-secondary">
                  <button onClick={() => updateProfile({ language: 'ar' })} className={`px-7 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 ${language==='ar' ? 'bg-foreground text-background shadow-sm':'text-foreground/40 hover:text-foreground'}`}>العربية</button>
                  <button onClick={() => updateProfile({ language: 'en' })} className={`px-7 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 ${language==='en' ? 'bg-foreground text-background shadow-sm':'text-foreground/40 hover:text-foreground'}`}>English</button>
                </div>
              </div>

              {/* Sound */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-7 bg-background/50 rounded-[2rem] border border-secondary hover:border-primary/20 hover:shadow-md transition-all duration-300 gap-4 sm:gap-0">
                <div className="flex items-center gap-5">
                   <div className="w-12 h-12 flex items-center justify-center bg-secondary rounded-full border border-secondary">
                      <Volume2 className="w-5 h-5 text-primary"/>
                   </div>
                   <span className="font-serif text-xl text-foreground tracking-tight">
                     {language === 'ar' ? 'المؤثرات الصوتية' : 'Sound Effects'}
                   </span>
                </div>
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`w-[4.5rem] h-8 rounded-full relative transition-all duration-500 border self-start sm:self-auto
                    ${soundEnabled ? 'bg-primary border-primary shadow-[0_4px_12px_rgba(0,0,0,0.15)]' : 'bg-secondary border-secondary'}`}
                >
                  <div className={`w-6 h-6 bg-background rounded-full absolute top-[3px] transition-all duration-500 shadow-md
                    ${soundEnabled
                      ? (language === 'ar' ? 'right-[2.5rem]' : 'left-[2.5rem]')
                      : (language === 'ar' ? 'right-1' : 'left-1')}`}
                  />
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-10 pt-8 border-t border-secondary flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <div className="flex flex-col text-left rtl:text-right">
                    <span className="font-bold text-[9px] text-foreground/50 uppercase tracking-[0.3em] mb-1">
                      {language === 'ar' ? 'حالة الحساب' : 'Account Status'}
                    </span>
                    <span className="text-sm font-serif italic text-foreground/70">
                      {language === 'ar' ? 'محمي ومشفر بالكامل' : 'Protected & Encrypted'}
                    </span>
                </div>
              </div>
              <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(0,0,0,0.2)]" />
            </div>
          </div>
        </section>
      </div>

      {/* ══ Avatar Picker Modal ══ */}
      {showAvatarPicker && (
        <div className="fixed inset-0 bg-background/60 backdrop-blur-3xl z-[100] flex items-center justify-center p-4 animate-in fade-in duration-500">
          <div className="glass-premium w-full max-w-2xl rounded-[3rem] p-12 shadow-[0_40px_80px_rgba(0,0,0,0.2)] relative animate-in zoom-in-95 duration-500">
            <button
              onClick={() => setShowAvatarPicker(false)}
              className="absolute top-8 right-8 p-4 hover:bg-secondary rounded-full transition-colors group"
            >
              <X className="w-6 h-6 text-foreground/50 group-hover:text-foreground transition-colors"/>
            </button>

            <div className="text-center mb-12">
              <span className="block text-[11px] font-bold uppercase tracking-[0.4em] text-primary mb-4">
                {language === 'ar' ? 'اختاري صورتك' : 'Choose Your Avatar'}
              </span>
              <h3 className="text-4xl font-serif tracking-tight text-foreground">
                {language === 'ar' ? 'صورة الملف الشخصي' : 'Profile Picture'}
              </h3>
            </div>

            <div className="grid grid-cols-4 gap-5">
              {AVATARS.map((src, i) => (
                <button
                  key={i}
                  onClick={() => selectAvatar(i)}
                  className={`relative group/av aspect-square rounded-[1.5rem] overflow-hidden border-4 transition-all duration-400 hover:scale-105
                    ${(avatarIndex ?? 0) === i
                      ? 'border-primary shadow-[0_8px_32px_rgba(0,0,0,0.2)] scale-105'
                      : 'border-secondary hover:border-primary/40 hover:shadow-lg'}`}
                >
                  <img src={src} alt={`avatar ${i+1}`} className="w-full h-full object-cover" />
                  {(avatarIndex ?? 0) === i && (
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
