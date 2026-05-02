import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Palette, Globe, Volume2, Shield, Camera, Check, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

import av0  from '../assets/avatar/uifaces-cartoon-avatar.jpg';
import av1  from '../assets/avatar/uifaces-cartoon-avatar (1).jpg';
import av2  from '../assets/avatar/uifaces-cartoon-avatar (2).jpg';
import av3  from '../assets/avatar/uifaces-cartoon-avatar (3).jpg';
import av4  from '../assets/avatar/uifaces-cartoon-avatar (4).jpg';
import av5  from '../assets/avatar/uifaces-cartoon-avatar (5).jpg';
import av6  from '../assets/avatar/uifaces-cartoon-avatar (6).jpg';
import av7  from '../assets/avatar/uifaces-cartoon-avatar (7).jpg';
import av8  from '../assets/avatar/uifaces-cartoon-avatar (8).jpg';
import av9  from '../assets/avatar/uifaces-cartoon-avatar (9).jpg';
import av10 from '../assets/avatar/uifaces-cartoon-avatar (10).jpg';

const AVATARS = [av0, av1, av2, av3, av4, av5, av6, av7, av8, av9, av10];

/* ── Shared row component ─────────────────────────────────────────── */
const PrefRow = ({ icon: Icon, label, children }) => (
  <div className="flex items-center justify-between gap-6 p-6 rounded-2xl bg-background/40 border border-secondary transition-all duration-300 hover:border-primary/20 hover:bg-background/60">
    <div className="flex items-center gap-4">
      <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center border border-secondary shrink-0">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <span className="font-serif text-lg text-foreground tracking-tight">{label}</span>
    </div>
    {children}
  </div>
);

/* ── Pill Toggle ──────────────────────────────────────────────────── */
const PillToggle = ({ options, value, onChange }) => (
  <div className="flex bg-background/60 p-1 rounded-full border border-secondary shrink-0">
    {options.map(opt => (
      <button
        key={opt.value}
        onClick={() => onChange(opt.value)}
        className={`px-6 py-2 text-[10px] font-bold uppercase tracking-[0.25em] rounded-full transition-all duration-300
          ${value === opt.value
            ? 'bg-foreground text-background shadow-sm'
            : 'text-foreground/40 hover:text-foreground'}`}
      >
        {opt.label}
      </button>
    ))}
  </div>
);

/* ══════════════════════════════════════════════════════════════════ */
const Settings = () => {
  const { t, language, theme, userName, avatarIndex, updateProfile } = useAppContext();

  const [animateIn, setAnimateIn]         = useState(false);
  const [showPicker, setShowPicker]       = useState(false);
  const [localName, setLocalName]         = useState(userName);
  const [isEditingName, setIsEditingName] = useState(false);
  const [soundEnabled, setSoundEnabled]   = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setAnimateIn(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => { setLocalName(userName); }, [userName]);

  const handleSaveName = async () => {
    if (isEditingName) await updateProfile({ userName: localName });
    setIsEditingName(p => !p);
  };

  const selectAvatar = (i) => { updateProfile({ avatarIndex: i }); setShowPicker(false); };
  const currentIndex = avatarIndex ?? 0;

  return (
    <div className={`flex-1 w-full flex flex-col relative transition-all duration-1000 ease-out
      ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

      {/* Ambient glow */}
      <div className="absolute top-[5%] left-[30%] w-[40vw] h-[40vw] bg-[hsl(var(--glow-1))] rounded-full blur-[160px] opacity-20 pointer-events-none animate-[float_12s_ease-in-out_infinite]" />

      {/* ── Page Header ─────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6 relative z-10 px-2 md:px-6">
        <div>
          <h1 className="text-5xl md:text-6xl font-serif tracking-tight text-foreground flex items-center gap-5 mb-3">
            {t('settings')}
            <SettingsIcon className="w-10 h-10 text-primary" />
          </h1>
          <p className="text-[11px] uppercase tracking-[0.5em] text-foreground/50 font-bold">
            {language === 'ar' ? 'تخصيص تجربتك' : 'Customize your experience'}
          </p>
        </div>
        <div className="flex items-center gap-3 glass px-6 py-3 rounded-full shrink-0">
          <Shield className="w-4 h-4 text-primary" />
          <span className="text-[10px] font-bold text-foreground/70 uppercase tracking-[0.3em]">v 1.0.5</span>
        </div>
      </div>

      {/* ── Two-column grid ─────────────────────────────────────────── */}
      <div className="grid lg:grid-cols-12 gap-8 relative z-10 px-2 md:px-6">

        {/* ┌── Profile Card (5 cols) ──────────────────────────────┐ */}
        <section className="lg:col-span-5 glass-premium rounded-[2.5rem] p-10 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[hsl(var(--glow-1))] opacity-10 rounded-full blur-[70px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

          <h2 className="font-serif text-2xl text-foreground tracking-tight mb-10 self-start">
            {language === 'ar' ? 'الملف الشخصي' : 'Profile'}
          </h2>

          {/* Avatar */}
          <div
            onClick={() => setShowPicker(true)}
            className="relative w-44 h-44 rounded-full cursor-pointer group/av mb-8 shrink-0"
          >
            <img
              src={AVATARS[currentIndex]}
              alt="Avatar"
              className="w-full h-full rounded-full object-cover border-4 border-secondary shadow-[0_16px_48px_rgba(0,0,0,0.18)] group-hover/av:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-foreground/50 rounded-full flex flex-col items-center justify-center opacity-0 group-hover/av:opacity-100 transition-all duration-400 backdrop-blur-sm">
              <Camera className="w-8 h-8 text-background mb-2" />
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-background">
                {language === 'ar' ? 'تغيير' : 'Change'}
              </span>
            </div>
          </div>

          {/* Mini strip */}
          <div className="flex items-center gap-2.5 mb-10">
            {AVATARS.slice(0, 5).map((src, i) => (
              <button key={i} onClick={() => selectAvatar(i)}
                className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all duration-300 hover:scale-110
                  ${currentIndex === i ? 'border-primary scale-110 shadow-[0_4px_12px_rgba(0,0,0,0.2)]' : 'border-secondary opacity-50 hover:opacity-100'}`}>
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
            <button onClick={() => setShowPicker(true)}
              className="w-10 h-10 rounded-full border-2 border-dashed border-secondary flex items-center justify-center text-[10px] font-bold text-foreground/50 hover:border-primary hover:text-primary transition-all duration-300">
              +{AVATARS.length - 5}
            </button>
          </div>

          {/* Name editor */}
          <div className="w-full flex flex-col gap-3 text-left rtl:text-right mb-8">
            <label className="text-[10px] font-bold uppercase tracking-[0.35em] text-foreground/50 px-1">
              {language === 'ar' ? 'الاسم' : 'Display Name'}
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={localName}
                disabled={!isEditingName}
                onChange={e => setLocalName(e.target.value)}
                className={`flex-1 px-5 py-3.5 rounded-2xl border font-serif text-lg outline-none transition-all duration-400 bg-background/40
                  ${isEditingName ? 'border-primary shadow-[0_0_0_3px_rgba(var(--primary)/0.1)]' : 'border-secondary'}`}
              />
              <button onClick={handleSaveName}
                className={`px-6 rounded-2xl font-bold text-[10px] uppercase tracking-[0.25em] flex items-center gap-2 transition-all duration-400 shrink-0
                  ${isEditingName ? 'bg-primary text-primary-foreground shadow-md' : 'bg-secondary border border-secondary text-foreground/60 hover:border-primary/30'}`}>
                {isEditingName ? <Check className="w-4 h-4" /> : (language === 'ar' ? 'تعديل' : 'Edit')}
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="w-full grid grid-cols-2 gap-4 pt-8 border-t border-secondary">
            {[
              { label: 'Level', value: '5' },
              { label: language === 'ar' ? 'نقاط' : 'Points', value: '1,250' },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col items-center justify-center p-6 rounded-2xl bg-background/40 border border-secondary hover:border-primary/20 transition-all duration-300">
                <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-primary mb-2">{label}</span>
                <span className="text-4xl font-serif text-foreground">{value}</span>
              </div>
            ))}
          </div>
        </section>
        {/* └───────────────────────────────────────────────────────┘ */}

        {/* ┌── Preferences Card (7 cols) ──────────────────────────┐ */}
        <section className="lg:col-span-7 glass-premium rounded-[2.5rem] p-10 flex flex-col">

          <h2 className="font-serif text-2xl text-foreground tracking-tight mb-10">
            {language === 'ar' ? 'التفضيلات' : 'Preferences'}
          </h2>

          <div className="space-y-4 flex-1">

            {/* Theme */}
            <PrefRow icon={Palette} label={language === 'ar' ? 'السمة' : 'Theme'}>
              <PillToggle
                value={theme === 'dark' ? 'dark' : 'light'}
                onChange={val => updateProfile({ theme: val })}
                options={[
                  { value: 'light', label: language === 'ar' ? 'فاتح' : 'Light' },
                  { value: 'dark',  label: language === 'ar' ? 'داكن' : 'Dark'  },
                ]}
              />
            </PrefRow>

            {/* Language */}
            <PrefRow icon={Globe} label={language === 'ar' ? 'اللغة' : 'Language'}>
              <PillToggle
                value={language}
                onChange={val => updateProfile({ language: val })}
                options={[
                  { value: 'ar', label: 'عربية' },
                  { value: 'en', label: 'English' },
                ]}
              />
            </PrefRow>

            {/* Sound */}
            <PrefRow icon={Volume2} label={language === 'ar' ? 'المؤثرات الصوتية' : 'Sound Effects'}>
              <button
                onClick={() => setSoundEnabled(p => !p)}
                className={`w-14 h-7 rounded-full relative transition-all duration-400 border shrink-0
                  ${soundEnabled ? 'bg-primary border-primary' : 'bg-secondary border-secondary'}`}
              >
                <div className={`w-5 h-5 bg-background rounded-full absolute top-[3px] transition-all duration-400 shadow-md
                  ${soundEnabled
                    ? (language === 'ar' ? 'right-[1.75rem]' : 'left-[1.75rem]')
                    : (language === 'ar' ? 'right-[3px]' : 'left-[3px]')}`}
                />
              </button>
            </PrefRow>

          </div>

          {/* Footer */}
          <div className="mt-10 pt-8 border-t border-secondary flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-foreground/50 mb-0.5">
                  {language === 'ar' ? 'حالة الحساب' : 'Account Status'}
                </span>
                <span className="text-sm font-serif italic text-foreground/70">
                  {language === 'ar' ? 'محمي ومشفر' : 'Protected & Encrypted'}
                </span>
              </div>
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
          </div>
        </section>
        {/* └───────────────────────────────────────────────────────┘ */}

      </div>

      {/* ══ Avatar Picker Modal ════════════════════════════════════ */}
      {showPicker && (
        <div className="fixed inset-0 bg-background/60 backdrop-blur-3xl z-[100] flex items-center justify-center p-4 animate-in fade-in duration-500">
          <div className="glass-premium w-full max-w-2xl rounded-[3rem] p-12 shadow-[0_40px_80px_rgba(0,0,0,0.2)] relative animate-in zoom-in-95 duration-500">
            <button onClick={() => setShowPicker(false)}
              className="absolute top-8 right-8 p-3 hover:bg-secondary rounded-full transition-colors group">
              <X className="w-5 h-5 text-foreground/50 group-hover:text-foreground" />
            </button>

            <div className="text-center mb-10">
              <span className="block text-[11px] font-bold uppercase tracking-[0.4em] text-primary mb-4">
                {language === 'ar' ? 'اختاري صورتك' : 'Choose Avatar'}
              </span>
              <h3 className="text-4xl font-serif tracking-tight text-foreground">
                {language === 'ar' ? 'صورة الملف الشخصي' : 'Profile Picture'}
              </h3>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {AVATARS.map((src, i) => (
                <button key={i} onClick={() => selectAvatar(i)}
                  className={`relative aspect-square rounded-2xl overflow-hidden border-4 transition-all duration-300 hover:scale-105
                    ${currentIndex === i
                      ? 'border-primary shadow-[0_8px_32px_rgba(0,0,0,0.2)] scale-105'
                      : 'border-secondary hover:border-primary/40 hover:shadow-lg'}`}>
                  <img src={src} alt={`avatar ${i+1}`} className="w-full h-full object-cover" />
                  {currentIndex === i && (
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
