import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, User, Palette, Globe, Volume2, Shield, Save, Camera, Check } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Settings = () => {
  const { t, language, theme, setTheme, setLanguage, userName, avatarIndex, updateProfile } = useAppContext();
  
  const [localName, setLocalName] = useState(userName);
  const [isEditingName, setIsEditingName] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notifications, setNotifications] = useState(true);

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
    <div className="flex-1 glass rounded-[2rem] p-6 md:p-10 flex flex-col relative text-right">
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="flex justify-between items-center mb-12 relative">
        <h2 className="text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary flex items-center gap-3">
          <SettingsIcon className="w-8 h-8 text-primary" /> {t('settings')}
        </h2>
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/30">System Version 1.0.5</div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 relative">
        {/* Avatar & Profile Customizer */}
        <section className="bg-white/40 dark:bg-card/40 p-10 rounded-[3rem] border border-white shadow-2xl backdrop-blur-3xl flex flex-col items-center ring-1 ring-black/[0.02]">
          <h3 className="w-full font-black text-lg mb-10 flex items-center gap-3 text-foreground/60 uppercase tracking-widest">
            <User className="w-6 h-6 text-primary"/> {language === 'ar' ? 'الملف الشخصي' : 'Profile'}
          </h3>
          
          <div 
            onClick={cycleAvatar}
            className="w-48 h-48 rounded-full border-8 border-white p-1 mb-10 relative group overflow-hidden bg-gradient-to-tr from-primary/20 to-accent/20 cursor-pointer shadow-2xl hover:scale-105 transition-all duration-500"
          >
            <img src={avatars[avatarIndex]} alt="Avatar" className="w-full h-full object-cover rounded-full" />
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500">
              <Camera className="w-8 h-8 mb-2" />
              <span className="font-black text-[10px] tracking-widest uppercase">{language === 'ar' ? 'تغيير المظهر' : 'Change Look'}</span>
            </div>
          </div>

          <div className="w-full space-y-6">
             <div className="flex flex-col gap-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/30 px-2">{language === 'ar' ? 'الاسم المستخدم' : 'Display Name'}</label>
                <div className="flex gap-3">
                   <input 
                      type="text" 
                      value={localName}
                      disabled={!isEditingName}
                      onChange={(e) => setLocalName(e.target.value)}
                      className={`flex-1 bg-secondary/30 p-4 rounded-xl border-2 transition-all font-bold text-lg outline-none ${isEditingName ? 'border-primary bg-white shadow-xl scale-105 ring-8 ring-primary/5' : 'border-transparent'}`}
                   />
                   <button 
                      onClick={handleSaveName}
                      className={`px-6 rounded-xl transition-all font-black text-xs uppercase tracking-widest flex items-center gap-2 ${isEditingName ? 'bg-primary text-white shadow-xl' : 'bg-secondary/50 text-foreground/40 hover:bg-secondary'}`}
                   >
                      {isEditingName ? <Check className="w-4 h-4"/> : <SettingsIcon className="w-4 h-4"/>}
                      {isEditingName ? (language === 'ar' ? 'حفظ' : 'SAVE') : (language === 'ar' ? 'تعديل' : 'EDIT')}
                   </button>
                </div>
             </div>

             <div className="pt-6 border-t border-primary/5 grid grid-cols-2 gap-4">
                <div className="bg-primary/5 p-4 rounded-2xl text-center">
                   <span className="block text-[8px] font-black uppercase tracking-widest text-primary/40 mb-1">Level</span>
                   <span className="text-xl font-black text-primary">5</span>
                </div>
                <div className="bg-orange-500/5 p-4 rounded-2xl text-center">
                   <span className="block text-[8px] font-black uppercase tracking-widest text-orange-500/40 mb-1">Shine Points</span>
                   <span className="text-xl font-black text-orange-500">1,250</span>
                </div>
             </div>
          </div>
        </section>

        {/* General Settings */}
        <section className="space-y-6 text-right">
          <h3 className="w-full font-black text-lg mb-8 flex items-center gap-3 text-foreground/60 uppercase tracking-widest border-b border-primary/5 pb-4">
             <Palette className="w-6 h-6 text-primary"/> {language === 'ar' ? 'تخصيص التجربة' : 'Preferences'}
          </h3>

          <div className="space-y-4">
            {/* Theme Selector */}
            <div className="flex items-center justify-between p-6 bg-white/40 dark:bg-card/40 rounded-[2rem] border border-white shadow-lg backdrop-blur-xl group hover:border-primary/20 transition-all">
              <div className="flex items-center gap-5">
                 <div className="p-3 bg-secondary/50 rounded-xl group-hover:bg-primary/10 transition-colors">
                    <Palette className="w-5 h-5 text-primary"/>
                 </div>
                 <span className="font-black text-sm text-foreground/70 uppercase tracking-widest">{language === 'ar' ? 'السمة' : 'Theme'}</span>
              </div>
              <select 
                 value={theme}
                 onChange={(e) => updateProfile({ theme: e.target.value })}
                 className="bg-secondary/50 rounded-xl px-5 py-3 outline-none text-xs font-black uppercase tracking-widest border-0 focus:ring-4 focus:ring-primary/10 cursor-pointer shadow-inner"
              >
                <option value="vibrant">{language === 'ar' ? 'حيوي وردي' : 'Vibrant Pink'}</option>
                <option value="calm">{language === 'ar' ? 'هادئ مريح' : 'Calm Pastel'}</option>
                <option value="elegant">{language === 'ar' ? 'فخم داكن' : 'Elegant Dark'}</option>
              </select>
            </div>

            {/* Language Toggle */}
            <div className="flex items-center justify-between p-6 bg-white/40 dark:bg-card/40 rounded-[2rem] border border-white shadow-lg backdrop-blur-xl group hover:border-primary/20 transition-all">
              <div className="flex items-center gap-5">
                 <div className="p-3 bg-secondary/50 rounded-xl group-hover:bg-primary/10 transition-colors">
                    <Globe className="w-5 h-5 text-primary"/>
                 </div>
                 <span className="font-black text-sm text-foreground/70 uppercase tracking-widest">{language === 'ar' ? 'اللغة' : 'Language'}</span>
              </div>
              <div className="flex bg-secondary/50 p-1.5 rounded-xl border border-secondary shadow-inner">
                <button onClick={() => updateProfile({ language: 'ar' })} className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${language==='ar' ? 'bg-white shadow-md text-primary scale-105':'text-foreground/30 hover:text-foreground'}`}>العربية</button>
                <button onClick={() => updateProfile({ language: 'en' })} className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${language==='en' ? 'bg-white shadow-md text-primary scale-105':'text-foreground/30 hover:text-foreground'}`}>EN</button>
              </div>
            </div>

            {/* Sound Switch */}
            <div className="flex items-center justify-between p-6 bg-white/40 dark:bg-card/40 rounded-[2rem] border border-white shadow-lg backdrop-blur-xl group hover:border-primary/20 transition-all">
              <div className="flex items-center gap-5">
                 <div className="p-3 bg-secondary/50 rounded-xl group-hover:bg-primary/10 transition-colors">
                    <Volume2 className="w-5 h-5 text-primary"/>
                 </div>
                 <span className="font-black text-sm text-foreground/70 uppercase tracking-widest">{language === 'ar' ? 'المؤثرات الصوتية' : 'Sound Effects'}</span>
              </div>
              <button 
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`w-14 h-8 rounded-full relative transition-all duration-500 shadow-inner ${soundEnabled ? 'bg-primary' : 'bg-secondary'}`}
              >
                <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-all duration-500 shadow-md ${soundEnabled ? (language === 'ar' ? 'right-7' : 'left-7') : (language === 'ar' ? 'right-1' : 'left-1')}`}></div>
              </button>
            </div>

            {/* Security Status */}
            <div className="flex items-center justify-between p-6 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-[2rem] border border-emerald-500/10 shadow-sm mt-8 group">
              <div className="flex items-center gap-5">
                <Shield className="w-5 h-5 text-emerald-500" />
                <div className="flex flex-col text-right">
                    <span className="font-black text-[10px] text-emerald-600 uppercase tracking-widest">{language === 'ar' ? 'حالة الحساب' : 'Account Status'}</span>
                    <span className="text-xs font-bold text-emerald-600/70">{language === 'ar' ? 'محمي ومشفر بالكامل' : 'Protected & Encrypted'}</span>
                </div>
              </div>
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
