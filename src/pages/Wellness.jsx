import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, CalendarHeart, Droplets, CheckCircle2, Plus, Info, Zap, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Wellness = () => {
  const { t, language } = useAppContext();
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const [symptoms, setSymptoms] = useState([
    { id: 1, name: language === 'ar' ? 'طاقة مرتفعة' : 'High Energy', date: 'Today' },
    { id: 2, name: language === 'ar' ? 'تركيز جيد' : 'Good Focus', date: 'Today' },
  ]);

  const [isLogging, setIsLogging] = useState(false);
  const [completedRoutines, setCompletedRoutines] = useState([]);

  const logSymptom = (name) => {
    setSymptoms(prev => [{ id: Date.now(), name, date: 'Today' }, ...prev]);
    setIsLogging(false);
  };

  const toggleRoutine = (name) => {
    setCompletedRoutines(prev => 
      prev.includes(name) ? prev.filter(r => r !== name) : [...prev, name]
    );
  };

  return (
    <div className={`flex-1 w-full flex flex-col relative transition-all duration-1000 ease-out ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gradient-to-br from-pink-500/10 via-rose-400/5 to-transparent rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[30rem] h-[30rem] bg-gradient-to-tr from-orange-400/10 to-transparent rounded-full blur-[100px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 relative z-10 px-2 md:px-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-foreground/90 flex items-center gap-4 mb-3">
            {language === 'ar' ? 'العافية' : 'Wellness'}
            <Heart className="w-8 h-8 text-pink-500 fill-pink-500/20 animate-pulse" />
          </h2>
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-foreground/40 font-bold ml-1">
             {language === 'ar' ? 'الصحة الجسدية والنفسية' : 'Mind & Body Harmony'}
          </p>
        </div>
        
        <div className="flex items-center gap-3 bg-white/40 dark:bg-card/40 backdrop-blur-2xl px-5 py-3 rounded-full border border-white/60 shadow-sm">
           <Zap className="w-5 h-5 text-pink-500 fill-pink-500/50" />
           <span className="text-[10px] font-bold text-foreground/70 uppercase tracking-widest">{language === 'ar' ? 'نشاط كامل' : 'Full Vitality'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 p-2 md:p-6">
        
        {/* Cycle Tracker & Symptoms (Spans 5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <section className="bg-gradient-to-br from-white/70 to-white/30 dark:from-card/70 dark:to-card/30 rounded-[2.5rem] p-8 md:p-10 border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-3xl relative overflow-hidden group transition-all duration-500 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-pink-500/20 transition-colors duration-700 pointer-events-none"></div>
            
            <div className="flex items-center justify-between mb-10 relative z-10">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-white/80 dark:bg-card/80 border border-white/50 rounded-2xl shadow-sm">
                  <Droplets className="w-6 h-6 text-pink-500" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40">{language === 'ar' ? 'تتبع الدورة' : 'Cycle Phase'}</span>
                  <h3 className="text-xl font-serif text-foreground/90 tracking-tight">{language === 'ar' ? 'مرحلة التبويض' : 'Ovulation Phase'}</h3>
                </div>
              </div>
              <button className="p-2 bg-white/40 dark:bg-card/40 rounded-full hover:bg-white transition-colors border border-white/40"><Info className="w-4 h-4 text-pink-500" /></button>
            </div>
            
            <div className="relative z-10 flex flex-col items-center justify-center text-center p-12 bg-white/30 dark:bg-card/30 rounded-[2rem] border border-white/40 shadow-[inset_0_0_20px_rgba(0,0,0,0.02)] mb-8">
              <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.3em] mb-4">{language === 'ar' ? 'اليوم' : 'Day'}</span>
              <div className="relative flex items-center justify-center">
                 <span className="text-8xl font-serif tracking-tighter text-foreground/90 drop-shadow-sm">14</span>
                 <div className="absolute top-0 right-[-1.5rem] w-4 h-4 bg-pink-500 rounded-full border-2 border-white/80 animate-ping shadow-[0_0_15px_rgba(236,72,153,0.5)]"></div>
                 <div className="absolute top-0 right-[-1.5rem] w-4 h-4 bg-pink-500 rounded-full border-2 border-white/80 shadow-[0_0_15px_rgba(236,72,153,0.5)]"></div>
              </div>
              <p className="mt-8 text-xs font-medium text-foreground/60 max-w-[80%] leading-relaxed">
                 {language === 'ar' ? 'طاقة مرتفعة ومزاج إيجابي. وقت مثالي للتركيز على المهام الصعبة.' : 'Peak energy and positive mood. Ideal time for complex tasks.'}
              </p>
            </div>
          </section>

          <section className="bg-gradient-to-br from-white/70 to-white/30 dark:from-card/70 dark:to-card/30 rounded-[2.5rem] p-8 border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-3xl transition-all duration-500 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] hover:-translate-y-1">
             <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40">{language === 'ar' ? 'الأعراض المسجلة' : 'Logged Symptoms'}</span>
                <button onClick={() => setIsLogging(true)} className="w-8 h-8 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition-all"><Plus className="w-4 h-4"/></button>
             </div>
             <div className="flex flex-wrap gap-2">
                {symptoms.map((s, i) => (
                  <span key={s.id} className="px-4 py-2.5 bg-white/60 dark:bg-card/60 rounded-xl text-[10px] font-bold text-foreground/70 uppercase tracking-wider border border-white shadow-sm animate-in zoom-in-95" style={{ animationDelay: `${i * 100}ms` }}>
                    {s.name}
                  </span>
                ))}
             </div>
          </section>
        </div>

        {/* Self Care Rituals (Spans 7 cols) */}
        <div className="lg:col-span-7 bg-gradient-to-br from-white/70 to-white/30 dark:from-card/70 dark:to-card/30 rounded-[2.5rem] p-8 md:p-12 border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-3xl flex flex-col relative overflow-hidden group transition-all duration-500 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] hover:-translate-y-1">
          <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-primary/5 rounded-full blur-[100px] group-hover:bg-primary/10 transition-colors duration-1000 pointer-events-none"></div>
          
          <div className="flex items-center gap-4 mb-12 relative z-10">
            <div className="p-4 bg-white/80 dark:bg-card/80 border border-white/50 rounded-2xl shadow-sm">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
               <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40">{language === 'ar' ? 'الروتين اليومي' : 'Daily Routine'}</span>
               <h3 className="text-2xl font-serif text-foreground/90 tracking-tight">{language === 'ar' ? 'العناية بالذات' : 'Self-Care Rituals'}</h3>
            </div>
          </div>

          <div className="space-y-4 flex-1 relative z-10">
             {[
               { name: 'Morning Routine ☀️', ar: 'روتين الصباح ☀️', steps: 4 },
               { name: 'Evening Routine 🌙', ar: 'روتين المساء 🌙', steps: 5 },
               { name: 'Daily Meditation 🧘‍♀️', ar: 'تأمل يومي 🧘‍♀️', steps: 1 }
             ].map((r, i) => {
               const isDone = completedRoutines.includes(r.name);
               return (
                 <div 
                   key={i} 
                   onClick={() => toggleRoutine(r.name)}
                   className={`p-6 rounded-[1.5rem] border transition-all duration-500 cursor-pointer flex justify-between items-center group/item
                      ${isDone 
                        ? 'bg-emerald-500/5 border-emerald-500/20' 
                        : 'bg-white/40 dark:bg-card/40 border-white hover:border-primary/30 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]'}`}
                 >
                   <div className="flex flex-col gap-1.5">
                      <span className={`font-serif text-xl tracking-tight transition-all duration-500 ${isDone ? 'text-emerald-700/60 dark:text-emerald-400/60 line-through italic' : 'text-foreground/80 group-hover/item:text-foreground'}`}>
                          {language === 'ar' ? r.ar : r.name}
                      </span>
                      <span className={`text-[9px] font-bold uppercase tracking-[0.2em] ${isDone ? 'text-emerald-700/40' : 'text-foreground/30'}`}>{r.steps} {language === 'ar' ? 'خطوات' : 'steps'}</span>
                   </div>
                   <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${isDone ? 'bg-emerald-500 text-white scale-110 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'bg-white border border-white shadow-sm text-primary/30 group-hover/item:text-primary group-hover/item:border-primary/20 group-hover/item:scale-110'}`}>
                      <CheckCircle2 className={`w-6 h-6 transition-all duration-500 ${isDone ? 'stroke-[3px]' : 'stroke-[2px]'}`} />
                   </div>
                 </div>
               )
             })}

             <div className="mt-8 bg-[#0f172a] rounded-[2rem] p-8 border border-white/10 flex flex-col justify-center items-center cursor-pointer relative overflow-hidden group/card shadow-2xl">
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
                <div className="absolute w-64 h-64 bg-primary/30 rounded-full blur-[80px] group-hover/card:bg-primary/50 transition-colors duration-1000 pointer-events-none"></div>
                
                <CalendarHeart className="w-10 h-10 text-white/90 mb-6 relative z-10 group-hover/card:scale-110 transition-transform duration-500" />
                <span className="font-serif text-2xl text-white tracking-tight relative z-10 mb-3 text-center">{language === 'ar' ? 'تحدي حب الذات - يوم ١٢' : '30-Day Self-Love - Day 12'}</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 relative z-10 text-center">Complete today's challenge to build your streak</span>
             </div>
          </div>
        </div>
      </div>

      {/* Elegant Overlay */}
      {isLogging && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-2xl z-[100] flex items-center justify-center p-4 animate-in fade-in duration-500">
           <div className="bg-gradient-to-br from-white/90 to-white/60 dark:from-card/90 dark:to-card/60 w-full max-w-lg rounded-[3rem] p-12 shadow-[0_32px_64px_rgba(0,0,0,0.1)] border border-white/60 relative animate-in zoom-in-95 duration-500">
              <button 
                onClick={() => setIsLogging(false)}
                className="absolute top-8 right-8 p-3 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
                ><X className="w-5 h-5 text-foreground/50 hover:text-foreground"/></button>
              
              <div className="text-center mb-12">
                <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-pink-500 mb-4">{language === 'ar' ? 'تسجيل جديد' : 'New Log'}</span>
                <h3 className="text-4xl font-serif tracking-tight text-foreground/90">{language === 'ar' ? 'كيف تشعرين؟' : 'How are you feeling?'}</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                 {[
                   { name: 'Happy 😊', ar: 'سعيدة 😊' },
                   { name: 'Cramps 🩸', ar: 'تشنجات 🩸' },
                   { name: 'Tired 😴', ar: 'متعبة 😴' },
                   { name: 'Strong 💪', ar: 'قوية 💪' },
                   { name: 'Moody 🎭', ar: 'متقلبة 🎭' },
                   { name: 'Calm 🧘‍♀️', ar: 'هادئة 🧘‍♀️' }
                 ].map((s, i) => (
                   <button 
                     key={i}
                     onClick={() => logSymptom(language === 'ar' ? s.ar : s.name)}
                     className="p-6 bg-white/60 dark:bg-black/20 border border-white/60 dark:border-white/5 rounded-[1.5rem] font-serif text-lg text-foreground/70 hover:bg-pink-500 hover:text-white hover:border-pink-500 hover:scale-105 hover:shadow-[0_8px_30px_rgba(236,72,153,0.3)] transition-all duration-300"
                   >
                     {language === 'ar' ? s.ar : s.name}
                   </button>
                 ))}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Wellness;
