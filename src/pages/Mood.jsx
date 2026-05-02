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

      {/* Ambient glows — unified palette */}
      <div className="absolute top-0 left-[-10%] w-[40vw] h-[40vw] bg-[hsl(var(--glow-1))] rounded-full blur-[150px] opacity-25 pointer-events-none animate-[float_10s_ease-in-out_infinite]" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[35vw] h-[35vw] bg-[hsl(var(--glow-2))] rounded-full blur-[120px] opacity-20 pointer-events-none animate-[float_12s_ease-in-out_infinite_reverse]" />

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 relative z-10 px-2 md:px-6">
        <div>
          <h1 className="text-5xl md:text-6xl font-serif tracking-tight text-foreground flex items-center gap-6 mb-4">
            {t('mood')}
            <SmilePlus className="w-10 h-10 text-primary" />
          </h1>
          <p className="text-[11px] md:text-xs uppercase tracking-[0.5em] text-foreground/50 font-bold">
            {language === 'ar' ? 'تتبع حالتك العاطفية' : 'Track your emotional state'}
          </p>
        </div>

        <div className="flex items-center gap-3 glass px-6 py-3 rounded-full">
           <Heart className="w-5 h-5 text-primary fill-primary/40" />
           <span className="text-[10px] font-bold text-foreground/70 uppercase tracking-[0.3em]">
             {language === 'ar' ? 'نمط المزاج' : 'Mood Trend'}
           </span>
        </div>
      </div>

      <div className="flex flex-col gap-10 relative z-10 px-2 md:px-6">

        {/* ── Mood Logger ── */}
        <div className="glass-premium p-10 md:p-14 rounded-[3rem] relative overflow-hidden group hover:-translate-y-1 transition-all duration-700 animate-in slide-in-from-bottom-4">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[hsl(var(--glow-1))] opacity-10 rounded-full blur-[80px] pointer-events-none" />

          <div className="text-center mb-14 relative z-10">
            <span className="block text-[11px] font-bold uppercase tracking-[0.4em] text-foreground/50 mb-5">
               {language === 'ar' ? 'تسجيل المزاج' : 'Log Mood'}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-foreground">
                {language === 'ar' ? 'كيف تشعرين اليوم؟' : 'How are you feeling today?'}
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-5 md:gap-8 relative z-10">
            {emojis.map((emoji, i) => (
              <button
                key={i}
                onClick={() => logMood(i)}
                className="group flex flex-col items-center gap-5 min-w-[90px] md:min-w-[110px] transition-all duration-500"
              >
                <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-4xl md:text-5xl transition-all duration-500
                  ${selectedMood === i
                    ? 'bg-foreground shadow-[0_16px_48px_rgba(0,0,0,0.2)] scale-125 border-2 border-foreground/20'
                    : 'bg-secondary border border-secondary hover:bg-foreground/10 hover:scale-110 grayscale hover:grayscale-0'}`}>
                   {emoji}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-500
                  ${selectedMood === i ? 'opacity-100 text-primary translate-y-0' : 'opacity-0 -translate-y-2 group-hover:opacity-50 group-hover:translate-y-0'}`}>
                  {labels[i]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Weekly Trend ── */}
        <div className="glass-premium p-10 md:p-12 rounded-[2.5rem] flex flex-col relative overflow-hidden animate-in slide-in-from-bottom-8 hover:-translate-y-1 transition-all duration-500">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-14 gap-4 relative z-10">
              <h2 className="font-serif text-3xl text-foreground flex items-center gap-4">
                  <TrendingUp className="w-7 h-7 text-primary" />
                  {language === 'ar' ? 'مؤشر المزاج الأسبوعي' : 'Weekly Mood Index'}
              </h2>
              <div className="flex items-center gap-3 glass-light px-5 py-2.5 rounded-full border border-secondary">
                   <Calendar className="w-4 h-4 text-foreground/50" />
                   <span className="text-[10px] font-bold text-foreground/60 uppercase tracking-[0.2em]">
                     {language === 'ar' ? 'آخر ١٠ أيام' : 'Last 10 Days'}
                   </span>
              </div>
          </div>

          {/* Bar Chart */}
          <div className="flex items-end h-64 gap-2 md:gap-4 w-full px-2 relative z-10">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none px-2 opacity-5">
               {[1,2,3,4,5].map(i => <div key={i} className="w-full border-t border-foreground border-dashed h-0" />)}
            </div>

            {moodHistory.map((val, i) => (
               <div key={i} className="flex-1 flex flex-col items-center justify-end gap-4 group relative h-full">
                 <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 text-2xl z-20 pointer-events-none drop-shadow-md">
                   {emojis[val]}
                 </div>
                 <div
                   className={`w-full max-w-[3rem] rounded-full transition-all duration-1000 ease-out
                      ${val === selectedMood && i === moodHistory.length - 1
                        ? 'bg-primary scale-105 shadow-[0_8px_24px_rgba(0,0,0,0.2)]'
                        : 'bg-foreground/10 group-hover:bg-primary/40'}`}
                   style={{ height: `${(val+1)*20}%` }}
                 />
               </div>
            ))}

            {moodHistory.length === 0 && !isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-foreground/40">
                   {language === 'ar' ? 'لا توجد بيانات بعد' : 'No data yet — log your first mood!'}
                 </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mood;
