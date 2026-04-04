import React from 'react';
import { SmilePlus } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Mood = () => {
  const { t, language } = useAppContext();

  const emojis = ['😢', '😐', '😊', '😍', '🤩'];
  const data = [1, 2, 2, 3, 4, 3, 2, 4, 4, 3, 4]; // sample past days

  return (
    <div className="flex-1 glass rounded-3xl p-8 flex flex-col">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary flex items-center gap-3">
          <SmilePlus className="w-8 h-8 text-primary" /> {t('mood')}
        </h2>
      </div>

      <div className="bg-white/50 dark:bg-card/50 p-8 rounded-3xl border border-primary/20 shadow-sm max-w-2xl mx-auto w-full mb-8">
        <h3 className="text-center font-bold text-xl mb-8">{language === 'ar' ? 'كيف تشعرين اليوم؟' : 'How are you feeling today?'}</h3>
        <div className="flex justify-between items-center bg-secondary/30 p-4 rounded-full">
          {emojis.map((emoji, i) => (
            <button key={i} className="text-4xl w-16 h-16 flex items-center justify-center rounded-full transition-transform hover:scale-125 focus:scale-110 focus:bg-white focus:shadow-md border border-transparent focus:border-primary/20 hover:bg-white">
              {emoji}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white/30 dark:bg-card/30 p-8 rounded-3xl border border-primary/10 flex-1">
        <h3 className="font-bold text-lg mb-6">{language === 'ar' ? 'مؤشر المزاج هذا الشهر' : 'Mood Index This Month'}</h3>
        <div className="flex items-end h-40 gap-2 w-full">
          {data.map((val, i) => (
             <div key={i} className="flex-1 flex flex-col items-center justify-end gap-2 group">
               <span className="opacity-0 group-hover:opacity-100 text-xl transition-opacity absolute -translate-y-8">{emojis[val]}</span>
               <div className="w-full bg-gradient-to-t from-primary/50 to-primary/80 rounded-t-lg transition-all hover:opacity-80" style={{ height: `${(val+1)*20}%` }}></div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mood;
