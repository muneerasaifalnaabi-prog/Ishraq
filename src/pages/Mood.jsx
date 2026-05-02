import React, { useState, useEffect } from 'react';
import { SmilePlus, Heart, TrendingUp, Calendar } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { moodService } from '../services/api';

const Mood = () => {
  const { t, language } = useAppContext();
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const emojis = ['😢', '😐', '😊', '😍', '🤩'];
  const labels = language === 'ar' 
    ? ['حزين', 'عادي', 'جيد', 'سعيد', 'رائع'] 
    : ['Sad', 'Meh', 'Good', 'Happy', 'Amazing'];

  const [selectedMood, setSelectedMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    moodService.getMoods().then(data => {
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
    <div className={`flex-1 w-full flex flex-col relative transition-all duration-1000 ease-out ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-[-10%] w-[40rem] h-[40rem] bg-gradient-to-br from-pink-400/10 via-primary/5 to-transparent rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[35rem] h-[35rem] bg-gradient-to-tr from-rose-400/10 to-transparent rounded-full blur-[100px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />

      {/* Elegant Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 relative z-10 px-2 md:px-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-foreground/90 flex items-center gap-4 mb-3">
            {t('mood')}
            <SmilePlus className="w-8 h-8 text-primary opacity-80" />
          </h2>
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-foreground/40 font-bold ml-1">
             {language === 'ar' ? 'تتبع حالتك العاطفية' : 'Track your emotional state'}
          </p>
        </div>
        
        <div className="flex items-center gap-3 bg-white/40 dark:bg-card/40 backdrop-blur-2xl px-6 py-3 rounded-full border border-white/60 shadow-sm">
           <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
           <span className="text-[10px] font-bold text-foreground/70 uppercase tracking-widest">{language === 'ar' ? 'نمط المزاج' : 'Mood Trend'}</span>
        </div>
      </div>

      <div className="flex flex-col gap-10 relative z-10 px-2 md:px-6">
        {/* Mood Logger Card */}
        <div className="bg-gradient-to-br from-white/80 to-white/40 dark:from-card/80 dark:to-card/40 p-8 md:p-12 rounded-[3rem] border border-white/80 shadow-[0_32px_64px_rgba(0,0,0,0.06)] backdrop-blur-3xl relative overflow-hidden group hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] transition-all duration-700 animate-in slide-in-from-bottom-4">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-[80px] group-hover:scale-125 transition-transform duration-1000 pointer-events-none"></div>
          
          <div className="text-center mb-12 relative z-10">
            <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/40 mb-4">
               {language === 'ar' ? 'تسجيل المزاج' : 'Log Mood'}
            </span>
            <h3 className="font-serif text-3xl md:text-4xl tracking-tight text-foreground/90">
                {language === 'ar' ? 'كيف تشعرين اليوم يا جميلة؟' : 'How are you feeling today, gorgeous?'}
            </h3>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 relative z-10">
            {emojis.map((emoji, i) => (
              <button 
                key={i} 
                onClick={() => logMood(i)}
                className={`group flex flex-col items-center gap-4 min-w-[80px] md:min-w-[100px] transition-all duration-500`}
              >
                <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-4xl md:text-5xl transition-all duration-500 ${selectedMood === i ? 'bg-white shadow-[0_16px_48px_rgba(0,0,0,0.12)] scale-110 border border-white' : 'bg-white/40 dark:bg-black/20 hover:bg-white/80 border border-transparent shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] grayscale hover:grayscale-0'}`}>
                   {emoji}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 ${selectedMood === i ? 'opacity-100 text-pink-500 translate-y-0' : 'opacity-0 -translate-y-2 group-hover:opacity-40 group-hover:translate-y-0'}`}>
                  {labels[i]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Weekly Trend Container */}
        <div className="bg-gradient-to-br from-white/70 to-white/30 dark:from-card/70 dark:to-card/30 p-8 md:p-10 rounded-[2.5rem] border border-white/60 shadow-[0_16px_48px_rgba(0,0,0,0.04)] flex flex-col backdrop-blur-xl relative overflow-hidden animate-in slide-in-from-bottom-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4 relative z-10">
              <h3 className="font-serif text-2xl text-foreground/90 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  {language === 'ar' ? 'مؤشر المزاج الأسبوعي' : 'Weekly Mood Index'}
              </h3>
              <div className="flex items-center gap-2 bg-white/50 dark:bg-black/20 px-4 py-2 rounded-full border border-white/50">
                   <Calendar className="w-4 h-4 text-foreground/40" />
                   <span className="text-[9px] font-bold text-foreground/60 uppercase tracking-[0.2em]">{language === 'ar' ? 'آخر 10 أيام' : 'Last 10 Days'}</span>
              </div>
          </div>
          
          <div className="flex items-end h-64 gap-2 md:gap-4 w-full px-2 relative z-10">
            {/* Background Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none px-2 opacity-10">
               {[1,2,3,4,5].map(i => <div key={i} className="w-full border-t border-foreground border-dashed h-0"></div>)}
            </div>

            {moodHistory.map((val, i) => (
               <div key={i} className="flex-1 flex flex-col items-center justify-end gap-4 group relative h-full">
                 <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 text-2xl z-20 pointer-events-none drop-shadow-md">
                   {emojis[val]}
                 </div>
                 <div 
                   className={`w-full max-w-[3rem] rounded-full transition-all duration-1000 ease-out hover:shadow-[0_8px_30px_rgba(var(--primary-rgb),0.3)]
                      ${val === selectedMood && i === moodHistory.length - 1 
                        ? 'bg-gradient-to-t from-primary/80 to-accent scale-105 shadow-lg border-2 border-white/50' 
                        : 'bg-gradient-to-t from-primary/20 to-primary/40 group-hover:from-primary/40 group-hover:to-primary/60 border border-white/20'}`}
                   style={{ height: `${(val+1)*20}%` }}
                 >
                   <div className="w-full h-full glass-shine opacity-40 rounded-full"></div>
                 </div>
               </div>
            ))}
            
            {moodHistory.length === 0 && !isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/30">{language === 'ar' ? 'لا توجد بيانات' : 'No data yet'}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mood;
