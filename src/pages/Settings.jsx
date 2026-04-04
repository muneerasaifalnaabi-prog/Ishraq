import React from 'react';
import { Settings as SettingsIcon, User, Palette, Globe, Volume2, Shield } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Settings = () => {
  const { t, language, theme, setTheme, setLanguage } = useAppContext();

  return (
    <div className="flex-1 glass rounded-3xl p-8 flex flex-col overflow-y-auto">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary flex items-center gap-3">
          <SettingsIcon className="w-8 h-8 text-primary" /> {t('settings')}
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        
        {/* Avatar Customizer */}
        <section className="bg-white/50 dark:bg-card/50 p-6 rounded-3xl border border-primary/20 shadow-sm flex flex-col items-center">
          <h3 className="w-full font-bold text-lg mb-6 flex items-center gap-2 text-foreground/80">
            <User className="w-5 h-5 text-primary"/> {language === 'ar' ? 'تخصيص الشخصية (Lily)' : 'Avatar Customizer (Lily)'}
          </h3>
          
          <div className="w-40 h-40 rounded-full border-4 border-primary/30 p-1 mb-6 relative group overflow-hidden bg-gradient-to-tr from-primary/20 to-accent/20 cursor-pointer">
            <img src="/avatar.png" alt="Avatar" className="w-full h-full object-cover rounded-full" />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="font-bold text-sm tracking-widest uppercase">{language === 'ar' ? 'تغيير الشكل' : 'Edit Style'}</span>
            </div>
          </div>

          <div className="w-full grid grid-cols-3 gap-2">
            {['نظارات', 'تسريحة الشعر', 'ملابس'].map((item, i) => (
               <button key={i} className="text-xs bg-secondary/80 hover:bg-primary hover:text-white py-2 rounded-xl font-bold transition-colors">
                 {language === 'ar' ? item : (i===0?'Glasses':i===1?'Hair':'Outfit')}
               </button>
            ))}
          </div>
        </section>

        {/* General Settings */}
        <section className="space-y-4">
          <h3 className="w-full font-bold text-lg mb-6 flex items-center gap-2 text-foreground/80 border-b pb-2 border-secondary">
             <SettingsIcon className="w-5 h-5 text-primary"/> {language === 'ar' ? 'إعدادات عامة' : 'General'}
          </h3>

          <div className="flex items-center justify-between p-4 bg-white/40 dark:bg-card/40 rounded-2xl border border-secondary hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-3">
               <Palette className="w-5 h-5 text-foreground/50"/>
               <span className="font-semibold">{language === 'ar' ? 'الثيم الرئيسي' : 'Theme'}</span>
            </div>
            <select 
               value={theme}
               onChange={(e) => setTheme(e.target.value)}
               className="bg-secondary rounded-lg px-3 py-1 outline-none text-sm font-bold"
            >
              <option value="vibrant">{language === 'ar' ? 'حيوي وردي' : 'Vibrant Pink'}</option>
              <option value="calm">{language === 'ar' ? 'هادئ مريح' : 'Calm Pastel'}</option>
              <option value="elegant">{language === 'ar' ? 'فخم داكن' : 'Elegant Dark'}</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/40 dark:bg-card/40 rounded-2xl border border-secondary hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-3">
               <Globe className="w-5 h-5 text-foreground/50"/>
               <span className="font-semibold">{language === 'ar' ? 'لغة التطبيق' : 'Language'}</span>
            </div>
            <div className="flex bg-secondary p-1 rounded-lg">
              <button onClick={() => setLanguage('ar')} className={`px-4 py-1 text-sm font-bold rounded-md ${language==='ar' ? 'bg-white shadow-sm text-primary':'text-foreground/50 hover:text-foreground'}`}>العربية</button>
              <button onClick={() => setLanguage('en')} className={`px-4 py-1 text-sm font-bold rounded-md ${language==='en' ? 'bg-white shadow-sm text-primary':'text-foreground/50 hover:text-foreground'}`}>EN</button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/40 dark:bg-card/40 rounded-2xl border border-secondary hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-3">
               <Volume2 className="w-5 h-5 text-foreground/50"/>
               <span className="font-semibold">{language === 'ar' ? 'التنبيهات الصوتية' : 'Sound Alerts'}</span>
            </div>
            <div className="w-10 h-6 bg-primary rounded-full relative cursor-pointer shadow-inner">
               <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${language==='ar'?'left-1':'right-1'}`}></div>
            </div>
          </div>

        </section>
      </div>
    </div>
  );
};

export default Settings;
