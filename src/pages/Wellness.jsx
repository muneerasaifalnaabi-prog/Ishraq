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

      {/* Ambient glows — unified palette */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[hsl(var(--glow-1))] rounded-full blur-[150px] opacity-25 pointer-events-none animate-[float_10s_ease-in-out_infinite]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[30vw] h-[30vw] bg-[hsl(var(--glow-2))] rounded-full blur-[120px] opacity-20 pointer-events-none animate-[float_13s_ease-in-out_infinite_reverse]" />

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 relative z-10 px-2 md:px-6">
        <div>
          <h1 className="text-5xl md:text-6xl font-serif tracking-tight text-foreground flex items-center gap-6 mb-4">
            {language === 'ar' ? 'العافية' : 'Wellness'}
            <Heart className="w-10 h-10 text-primary fill-primary/20 animate-pulse" />
          </h1>
          <p className="text-[11px] md:text-xs uppercase tracking-[0.5em] text-foreground/50 font-bold">
            {language === 'ar' ? 'الصحة الجسدية والنفسية' : 'Mind & Body Harmony'}
          </p>
        </div>

        <div className="flex items-center gap-3 glass px-6 py-3 rounded-full">
           <Zap className="w-5 h-5 text-primary fill-primary/40" />
           <span className="text-[10px] font-bold text-foreground/70 uppercase tracking-[0.3em]">
             {language === 'ar' ? 'نشاط كامل' : 'Full Vitality'}
           </span>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 px-2 md:px-6">

        {/* Left: Cycle + Symptoms */}
        <div className="lg:col-span-5 flex flex-col gap-8">

          {/* Cycle Tracker */}
          <section className="glass-premium rounded-[2.5rem] p-10 relative overflow-hidden group hover:-translate-y-1 transition-all duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[hsl(var(--glow-1))] opacity-10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="flex items-center justify-between mb-12 relative z-10">
              <div className="flex items-center gap-5">
                <div className="p-4 bg-secondary border border-secondary rounded-2xl shadow-sm">
                  <Droplets className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/50 mb-1">
                    {language === 'ar' ? 'تتبع الدورة' : 'Cycle Phase'}
                  </span>
                  <h3 className="text-2xl font-serif text-foreground tracking-tight">
                    {language === 'ar' ? 'مرحلة التبويض' : 'Ovulation Phase'}
                  </h3>
                </div>
              </div>
              <button className="p-2.5 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors border border-secondary">
                <Info className="w-5 h-5 text-primary" />
              </button>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center text-center p-14 bg-background/40 rounded-[2rem] border border-secondary mb-4">
              <span className="text-[11px] font-bold text-foreground/50 uppercase tracking-[0.4em] mb-5">
                {language === 'ar' ? 'اليوم' : 'Day'}
              </span>
              <div className="relative flex items-center justify-center mb-6">
                 <span className="text-9xl font-serif tracking-tighter text-foreground">14</span>
                 <div className="absolute top-0 right-[-1.5rem] w-4 h-4 bg-primary rounded-full border-2 border-background animate-ping opacity-60" />
                 <div className="absolute top-0 right-[-1.5rem] w-4 h-4 bg-primary rounded-full border-2 border-background shadow-[0_0_15px_rgba(0,0,0,0.2)]" />
              </div>
              <p className="text-sm font-medium text-foreground/60 max-w-[75%] leading-relaxed">
                 {language === 'ar' ? 'طاقة مرتفعة ومزاج إيجابي. وقت مثالي للتركيز على المهام الصعبة.' : 'Peak energy & positive mood. Ideal time for complex, demanding tasks.'}
              </p>
            </div>
          </section>

          {/* Logged Symptoms */}
          <section className="glass-premium rounded-[2.5rem] p-8 hover:-translate-y-1 transition-all duration-500">
             <div className="flex justify-between items-center mb-8">
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-foreground/60">
                  {language === 'ar' ? 'الأعراض المسجلة' : 'Logged Symptoms'}
                </span>
                <button
                  onClick={() => setIsLogging(true)}
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 border border-primary/20">
                  <Plus className="w-5 h-5"/>
                </button>
             </div>
             <div className="flex flex-wrap gap-3">
                {symptoms.map((s, i) => (
                  <span
                    key={s.id}
                    className="px-5 py-2.5 glass-light rounded-full text-[10px] font-bold text-foreground/80 uppercase tracking-[0.2em] animate-in zoom-in-95"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    {s.name}
                  </span>
                ))}
             </div>
          </section>
        </div>

        {/* Right: Self-Care Rituals */}
        <div className="lg:col-span-7 glass-premium rounded-[2.5rem] p-10 md:p-12 flex flex-col relative overflow-hidden group hover:-translate-y-1 transition-all duration-500">
          <div className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] bg-[hsl(var(--glow-2))] opacity-10 rounded-full blur-[100px] pointer-events-none" />

          <div className="flex items-center gap-5 mb-14 relative z-10">
            <div className="p-4 bg-secondary border border-secondary rounded-2xl shadow-sm">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
               <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/50 mb-1">
                 {language === 'ar' ? 'الروتين اليومي' : 'Daily Routine'}
               </span>
               <h3 className="text-3xl font-serif text-foreground tracking-tight">
                 {language === 'ar' ? 'العناية بالذات' : 'Self-Care Rituals'}
               </h3>
            </div>
          </div>

          <div className="space-y-5 flex-1 relative z-10">
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
                   className={`p-7 rounded-[2rem] border transition-all duration-500 cursor-pointer flex justify-between items-center group/item
                      ${isDone
                        ? 'bg-foreground/5 border-foreground/10'
                        : 'bg-background/50 border-secondary hover:border-primary/20 shadow-sm hover:shadow-lg hover:-translate-y-1'}`}
                 >
                   <div className="flex flex-col gap-2">
                      <span className={`font-serif text-2xl tracking-tight transition-all duration-500 ${isDone ? 'text-foreground/40 line-through italic' : 'text-foreground group-hover/item:text-foreground'}`}>
                          {language === 'ar' ? r.ar : r.name}
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-[0.3em] ${isDone ? 'text-foreground/30' : 'text-foreground/50'}`}>
                        {r.steps} {language === 'ar' ? 'خطوات' : 'steps'}
                      </span>
                   </div>
                   <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ${isDone ? 'bg-primary text-primary-foreground scale-110 shadow-[0_8px_24px_rgba(0,0,0,0.15)]' : 'bg-secondary border border-secondary text-foreground/30 group-hover/item:text-primary group-hover/item:border-primary/20 group-hover/item:scale-110'}`}>
                      <CheckCircle2 className={`w-7 h-7 transition-all ${isDone ? 'stroke-[2.5px]' : 'stroke-[1.5px]'}`} />
                   </div>
                 </div>
               );
             })}

             {/* 30-Day Challenge — bold inverted card */}
             <div className="mt-4 bg-foreground rounded-[2rem] p-10 flex flex-col justify-center items-center cursor-pointer relative overflow-hidden group/card shadow-[0_24px_64px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-500">
                <div className="absolute w-64 h-64 bg-primary/20 rounded-full blur-[80px] group-hover/card:bg-primary/40 transition-colors duration-1000 pointer-events-none" />
                <CalendarHeart className="w-12 h-12 text-background/90 mb-6 relative z-10 group-hover/card:scale-110 transition-transform duration-500" />
                <span className="font-serif text-3xl text-background tracking-tight relative z-10 mb-3 text-center">
                  {language === 'ar' ? 'تحدي حب الذات — يوم ١٢' : '30-Day Self-Love — Day 12'}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-background/50 relative z-10 text-center">
                  {language === 'ar' ? 'أكملي تحدي اليوم لبناء سلسلتك' : 'Complete today's challenge to build your streak'}
                </span>
             </div>
          </div>
        </div>
      </div>

      {/* ── Log Symptom Modal ── */}
      {isLogging && (
        <div className="fixed inset-0 bg-background/60 backdrop-blur-3xl z-[100] flex items-center justify-center p-4 animate-in fade-in duration-500">
           <div className="glass-premium w-full max-w-xl rounded-[3rem] p-14 shadow-[0_40px_80px_rgba(0,0,0,0.15)] relative animate-in zoom-in-95 duration-500">
              <button
                onClick={() => setIsLogging(false)}
                className="absolute top-10 right-10 p-4 hover:bg-secondary rounded-full transition-colors group">
                <X className="w-6 h-6 text-foreground/50 group-hover:text-foreground transition-colors"/>
              </button>

              <div className="text-center mb-12">
                <span className="block text-[11px] font-bold uppercase tracking-[0.4em] text-primary mb-5">
                  {language === 'ar' ? 'تسجيل جديد' : 'New Log'}
                </span>
                <h3 className="text-5xl font-serif tracking-tight text-foreground">
                  {language === 'ar' ? 'كيف تشعرين؟' : 'How are you feeling?'}
                </h3>
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
                     className="p-7 bg-background/50 border border-secondary rounded-[1.5rem] font-serif text-xl text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-105 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-300"
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
