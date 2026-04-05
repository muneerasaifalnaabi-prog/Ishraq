import React, { useState } from 'react';
import { Heart, Sparkles, CalendarHeart, Droplets, CheckCircle2, Plus, Info, Zap, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Wellness = () => {
  const { t, language } = useAppContext();

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
    <div className="flex-1 glass rounded-[2rem] p-6 md:p-10 flex flex-col relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="flex justify-between items-center mb-10 relative">
        <h2 className="text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-foreground to-pink-500 flex items-center gap-3">
          <Heart className="w-8 h-8 text-pink-500" /> {t('wellness')}
        </h2>
        <div className="flex items-center gap-2 bg-pink-50 dark:bg-pink-900/10 px-5 py-2 rounded-2xl border border-pink-100">
           <Zap className="w-4 h-4 text-pink-500 fill-pink-500" />
           <span className="text-[10px] font-black text-pink-600 uppercase tracking-widest">{language === 'ar' ? 'نشاط كامل' : 'Full Vitality'}</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 relative flex-1">
        
        {/* Premium Period Tracker Section */}
        <section className="bg-white/40 dark:bg-card/40 p-8 rounded-[3rem] border border-pink-100 shadow-2xl backdrop-blur-3xl relative overflow-hidden flex flex-col group">
          <div className="absolute top-0 right-0 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-transform group-hover:scale-150 duration-700"></div>
          
          <div className="flex items-center justify-between mb-8 relative">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-pink-500/10 rounded-2xl">
                <Droplets className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-2xl font-black text-pink-600 tracking-tight">{language === 'ar' ? 'تتبع الدورة' : 'Cycle Tracker'}</h3>
            </div>
            <Info className="w-5 h-5 text-pink-300 cursor-pointer hover:text-pink-500 transition-colors" />
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center text-center p-10 bg-pink-500/5 rounded-[2.5rem] mb-8 border border-pink-100/50 shadow-inner group-hover:bg-pink-500/10 transition-colors">
            <span className="text-[10px] font-black text-pink-400 uppercase tracking-[0.4em] mb-3">{language === 'ar' ? 'اليوم الحالي' : 'Current Day'}</span>
            <div className="relative mb-4">
               <span className="text-7xl font-black text-pink-500 drop-shadow-xl">14</span>
               <div className="absolute -top-2 -right-4 w-6 h-6 bg-pink-500 rounded-full border-4 border-white animate-bounce"></div>
            </div>
            <p className="text-sm font-black text-pink-600/70 py-3 px-8 bg-white rounded-2xl shadow-sm border border-pink-100/50 scale-105">
               {language === 'ar' ? 'مرحلة التبويض - طاقتك في ذروتها!' : 'Ovulation - Peak Energy Level!'}
            </p>
          </div>

          <div className="space-y-4 mb-8">
             <div className="flex justify-between items-center px-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-foreground/30">{language === 'ar' ? 'الأعراض المسجلة:' : 'Logged Symptoms:'}</span>
                <button onClick={() => setIsLogging(true)} className="text-[10px] font-black text-pink-500 hover:underline uppercase tracking-widest">{language === 'ar' ? '+ إضافة' : '+ Add New'}</button>
             </div>
             <div className="flex flex-wrap gap-2 px-2">
                {symptoms.map(s => (
                  <span key={s.id} className="px-4 py-2 bg-white dark:bg-card/40 rounded-xl text-[10px] font-bold text-pink-600/60 border border-pink-50 shadow-sm animate-in fade-in zoom-in-95">
                    {s.name}
                  </span>
                ))}
             </div>
          </div>

          <button 
            onClick={() => setIsLogging(true)}
            className="w-full py-5 bg-pink-500 hover:bg-pink-600 active:scale-95 text-white rounded-[1.5rem] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-pink-500/30"
          >
             {language === 'ar' ? 'تسجيل الأعراض' : 'Log Daily Symptoms'}
          </button>
        </section>

        {/* Self Care Section */}
        <section className="bg-white/40 dark:bg-card/40 p-10 rounded-[3rem] border border-primary/20 shadow-2xl backdrop-blur-3xl flex flex-col relative overflow-hidden group">
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 transition-transform group-hover:scale-150 duration-700"></div>
          
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-black text-primary tracking-tight">{language === 'ar' ? 'العناية بالذات' : 'Self-Care Rituals'}</h3>
          </div>

          <div className="space-y-6 flex-1">
             {[
               { name: 'Morning Routine ☀️', ar: 'روتين الصباح ☀️', steps: 4 },
               { name: 'Evening Routine 🌙', ar: 'روتين المساء 🌙', steps: 5 },
               { name: 'Daily Meditation 🧘‍♀️', ar: 'تأمل يومي 🧘‍♀️', steps: 1 }
             ].map((r, i) => (
               <div 
                 key={i} 
                 onClick={() => toggleRoutine(r.name)}
                 className={`p-6 rounded-[2rem] border transition-all cursor-pointer flex justify-between items-center group/item
                    ${completedRoutines.includes(r.name) 
                      ? 'bg-emerald-500/10 border-emerald-500/20 shadow-inner' 
                      : 'bg-white/60 dark:bg-card/40 border-primary/5 hover:border-primary/40 shadow-xl shadow-primary/5'}`}
               >
                 <div className="flex flex-col">
                    <span className={`font-black text-lg tracking-tight transition-all ${completedRoutines.includes(r.name) ? 'text-emerald-600 line-through opacity-60 italic' : 'text-foreground/70'}`}>
                        {language === 'ar' ? r.ar : r.name}
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-30 mt-2">{r.steps} {language === 'ar' ? 'خطوات' : 'steps'}</span>
                 </div>
                 <div className={`p-3 rounded-xl transition-all ${completedRoutines.includes(r.name) ? 'bg-emerald-500 text-white scale-110 shadow-lg shadow-emerald-500/30' : 'bg-primary/10 text-primary opacity-0 group-hover/item:opacity-100'}`}>
                    <CheckCircle2 className="w-5 h-5" />
                 </div>
               </div>
             ))}

             <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-[2.5rem] p-8 border border-primary/10 flex flex-col justify-center items-center cursor-pointer hover:from-primary/20 hover:to-accent/20 transition-all mt-10 text-center group/card border-dashed">
                <CalendarHeart className="w-12 h-12 text-primary mb-5 opacity-80 group-hover/card:scale-125 transition-transform" />
                <span className="font-black text-xl text-primary tracking-tight px-4">{language === 'ar' ? 'تحدي حب الذات - يوم 12' : '30-Day Self-Love - Day 12'}</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-primary/40 mt-3 opacity-60">Complete today's challenge</span>
             </div>
          </div>
        </section>
      </div>

      {/* Quick Log Symptom Overlay */}
      {isLogging && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-in fade-in">
           <div className="bg-white dark:bg-card w-full max-w-sm rounded-[3rem] p-10 shadow-2xl relative">
              <button 
                onClick={() => setIsLogging(false)}
                className="absolute top-6 right-6 p-2 hover:bg-secondary rounded-full transition-colors"
                ><X className="w-6 h-6"/></button>
              
              <h3 className="text-2xl font-black mb-10 text-center tracking-tight">{language === 'ar' ? 'بم تشعرين؟' : 'Add Symptom'}</h3>
              
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
                     className="p-5 bg-secondary/30 rounded-2xl font-bold text-sm hover:bg-pink-500 hover:text-white hover:scale-105 transition-all shadow-sm"
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
