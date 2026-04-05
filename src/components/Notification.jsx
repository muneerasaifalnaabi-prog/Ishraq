import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { CheckCircle, AlertCircle, X, Bell } from 'lucide-react';

const Notification = () => {
  const { notification, language } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (notification) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), 3500);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  if (!notification && !isVisible) return null;

  return (
    <div 
      className={`fixed top-6 left-6 right-6 md:left-auto md:right-10 z-[3000] transform transition-all duration-500 ease-out ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-10 opacity-0 scale-95'
      }`}
    >
      <div className="glass-premium dark:bg-card/80 p-5 rounded-[2rem] border-2 border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center gap-4 min-w-[320px] backdrop-blur-2xl">
        <div className={`p-3 rounded-2xl ${notification?.type === 'error' ? 'bg-red-500/10 text-red-500' : 'bg-primary/10 text-primary'}`}>
           {notification?.type === 'error' ? <AlertCircle className="w-6 h-6"/> : <Bell className="w-6 h-6"/>}
        </div>
        
        <div className="flex-1">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 mb-0.5">
            {language === 'ar' ? 'تنبيه النظام' : 'System Alert'}
          </h4>
          <p className="text-sm font-bold text-foreground/80 leading-snug">
            {notification?.message}
          </p>
        </div>

        <button 
          onClick={() => setIsVisible(false)}
          className="p-2 hover:bg-black/5 rounded-full transition-colors text-foreground/40"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="absolute bottom-0 left-0 h-1 bg-primary/20 rounded-full overflow-hidden w-full">
           <div className={`h-full bg-primary transition-all duration-[3500ms] linear ${isVisible ? 'w-full' : 'w-0'}`}></div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
