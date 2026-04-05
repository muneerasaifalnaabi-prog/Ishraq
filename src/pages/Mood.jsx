import React, { useState, useEffect } from 'react';
import { SmilePlus, Heart, TrendingUp, Calendar } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { moodService } from '../services/api';

const Mood = () => {
  const { t, language } = useAppContext();

  const emojis = ['😢', '😐', '😊', '😍', '🤩'];
  const labels = language === 'ar' 
    ? ['حزين', 'عادي', 'جيد', 'سعيد', 'رائع'] 
    : ['Sad', 'Meh', 'Good', 'Happy', 'Amazing'];

  const [selectedMood, setSelectedMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    moodService.getMoods().then(data => {
      // Map from DB row {mood_index, date} to just the index for the trend line
      setMoodHistory(data.map(row => row.mood_index).reverse());
      setIsLoading(false);
    });
  }, []);

  const logMood = async (index) => {
    setSelectedMood(index);
    const moodData = { 
      mood_index: index, 
      date: new Date().toISOString().split('T')[0] 
    };
    await moodService.addMood(moodData);
    setMoodHistory(prev => [...prev, index].slice(-10));
  };

  return (
    <div className="flex-1 glass rounded-[2rem] p-6 md:p-10 flex flex-col relative">
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
      
      <div className="flex justify-between items-center mb-10 relative">
        <h2 className="text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary flex items-center gap-3">
          <SmilePlus className="w-8 h-8 text-primary" /> {t('mood')}
        </h2>
        <div className="flex items-center gap-2 bg-white/40 px-5 py-2 rounded-2xl border border-white shadow-sm">
           <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
           <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40">{language === 'ar' ? 'نمط المزاج' : 'Mood Trend'}</span>
        </div>
      </div>

      <div className="bg-white/40 dark:bg-card/40 p-8 rounded-[2.5rem] border border-primary/10 shadow-2xl backdrop-blur-xl max-w-2xl mx-auto w-full mb-12 transform hover:scale-[1.01] transition-all">
        <h3 className="text-center font-black text-xl mb-10 tracking-tight text-foreground/80">
            {language === 'ar' ? 'كيف تشعرين اليوم يا جميلة؟' : 'How are you feeling today, gorgeous?'}
        </h3>
        <div className="flex justify-between items-center bg-secondary/20 p-2 md:p-4 rounded-[2rem] gap-2">
          {emojis.map((emoji, i) => (
            <button 
              key={i} 
              onClick={() => logMood(i)}
              className={`flex-1 flex flex-col items-center gap-3 p-4 md:p-6 rounded-2xl transition-all duration-500 hover:scale-110 
                ${selectedMood === i ? 'bg-white shadow-2xl scale-125 z-10 border border-primary/20' : 'hover:bg-white/50 opacity-60 hover:opacity-100'}`}
            >
              <span className="text-3xl md:text-5xl">{emoji}</span>
              <span className={`text-[9px] font-black uppercase tracking-widest transition-opacity ${selectedMood === i ? 'opacity-100 text-primary' : 'opacity-0'}`}>
                {labels[i]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white/30 dark:bg-card/30 p-8 rounded-[2.5rem] border border-primary/5 flex-1 flex flex-col shadow-inner">
        <div className="flex items-center justify-between mb-10">
            <h3 className="font-black text-lg text-foreground/60 flex items-center gap-3 uppercase tracking-widest">
                <TrendingUp className="w-5 h-5 text-primary" />
                {language === 'ar' ? 'مؤشر المزاج الأسبوعي' : 'Weekly Mood Index'}
            </h3>
            <div className="flex items-center gap-2">
                 <Calendar className="w-4 h-4 text-primary/40" />
                 <span className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em]">{language === 'ar' ? 'آخر 10 أيام' : 'Last 10 Days'}</span>
            </div>
        </div>
        
        <div className="flex items-end h-48 gap-3 w-full pb-6 px-4">
          {moodHistory.map((val, i) => (
             <div key={i} className="flex-1 flex flex-col items-center justify-end gap-3 group relative h-full">
               <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 text-3xl z-20 pointer-events-none">
                 {emojis[val]}
               </div>
               <div 
                 className={`w-full max-w-[2.5rem] bg-gradient-to-t rounded-2xl transition-all duration-1000 hover:shadow-2xl hover:shadow-primary/20 
                    ${val === selectedMood && i === moodHistory.length - 1 ? 'from-primary to-accent scale-110 shadow-lg shadow-primary/30 ring-4 ring-primary/5' : 'from-primary/20 to-primary/40 group-hover:from-primary/40 group-hover:to-primary/60'}`}
                 style={{ height: `${(val+1)*20}%` }}
               >
                 <div className="w-full h-full glass-shine opacity-30"></div>
               </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mood;
