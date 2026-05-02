import React, { useState, useMemo, useEffect } from 'react';
import { Activity, Star, Calendar as CalendarIcon, ChevronLeft, ChevronRight, CheckCircle2, X, Plus } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { habitService } from '../services/api';

const Habits = () => {
  const { t, language } = useAppContext();
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const [habitsList, setHabitsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    habitService.getHabits().then(data => {
      setHabitsList(data || []);
      setIsLoading(false);
    });
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHabit, setNewHabit] = useState({ name: '', enName: '', color: 'bg-primary' });

  // Calendar State
  const [viewDate, setViewDate] = useState(new Date());

  const navigateMonth = (direction) => {
    setViewDate(prev => {
      const next = new Date(prev);
      next.setMonth(prev.getMonth() + direction);
      return next;
    });
  };

  const addHabit = async (e) => {
    e.preventDefault();
    if (!newHabit.name.trim()) return;
    
    const habitData = {
      ...newHabit,
      streak: 0,
      maxStreak: 30,
      progress: 0
    };
    
    const savedHabit = await habitService.addHabit(habitData);
    setHabitsList(prev => [savedHabit, ...prev]);
    setIsModalOpen(false);
    setNewHabit({ name: '', enName: '', color: 'bg-primary' });
  };

  const calendarData = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthFormatter = new Intl.DateTimeFormat(language === 'ar' ? 'ar-EG' : 'en-US', { month: 'long', year: 'numeric' });
    const formattedMonth = monthFormatter.format(viewDate);
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push({ day: null, key: `pad-${i}` });
    for (let i = 1; i <= daysInMonth; i++) days.push({ day: i, key: `day-${i}` });
    return { formattedMonth, days, currentDay: new Date().getDate(), currentMonth: new Date().getMonth(), currentYear: new Date().getFullYear(), viewMonth: month, viewYear: year };
  }, [viewDate, language]);

  const weekDays = language === 'ar' 
    ? ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'] 
    : ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className={`flex-1 w-full flex flex-col relative transition-all duration-1000 ease-out ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      
      {/* Subtle Background Ambience using the 3-color palette glows */}
      <div className="absolute top-[10%] left-[0%] w-[40vw] h-[40vw] bg-[hsl(var(--glow-1))] rounded-full blur-[140px] opacity-30 pointer-events-none animate-[float_10s_ease-in-out_infinite]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[35vw] h-[35vw] bg-[hsl(var(--glow-2))] rounded-full blur-[120px] opacity-20 pointer-events-none animate-[float_12s_ease-in-out_infinite_reverse]" />

      {/* Elegant Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 relative z-10 px-2 md:px-6">
        <div>
          <h2 className="text-5xl md:text-6xl font-serif tracking-tight text-foreground flex items-center gap-6 mb-4">
            {t('habits')}
            <Activity className="w-10 h-10 text-primary opacity-90" />
          </h2>
          <p className="text-[11px] md:text-xs uppercase tracking-[0.4em] text-foreground/50 font-bold ml-1">
             {language === 'ar' ? 'بناء عادات إيجابية مستدامة' : 'Build lasting positive routines'}
          </p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-foreground text-background px-10 py-5 rounded-full font-bold text-[10px] uppercase tracking-[0.4em] shadow-[0_8px_30px_rgba(0,0,0,0.2)] flex items-center gap-4 hover:bg-primary hover:text-primary-foreground transition-all duration-500 hover:-translate-y-1 active:translate-y-0"
        >
           {language === 'ar' ? 'إضافة عادة' : 'Add Habit'}
           <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 relative z-10 px-2 md:px-6 mb-12">
        
        {/* Left Column: Active Habits (Spans 7 cols) */}
        <div className="xl:col-span-7 flex flex-col gap-8">
          <h3 className="text-[11px] font-bold text-foreground/50 flex items-center gap-4 uppercase tracking-[0.3em] mb-2 pl-2">
             <Star className="w-5 h-5 text-primary fill-primary/30" />
             {language === 'ar' ? 'العادات الحالية' : 'Active Habits'}
          </h3>
          
          <div className="space-y-6">
            {habitsList.length === 0 && !isLoading && (
               <div className="glass-light p-10 rounded-[2rem] text-center">
                  <p className="text-sm font-serif text-foreground/60 italic">{language === 'ar' ? 'لا توجد عادات بعد. ابدأ رحلتك الآن.' : 'No habits yet. Start your journey now.'}</p>
               </div>
            )}
            {habitsList.map((h, i) => (
              <div 
                key={h.id} 
                className="glass-premium p-10 rounded-[2.5rem] group cursor-pointer hover:-translate-y-2 transition-all duration-500 relative overflow-hidden animate-in slide-in-from-bottom-4"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Elegant glow effect inside card */}
                <div className={`absolute top-0 right-0 w-40 h-40 ${h.color} opacity-5 rounded-full blur-[50px] pointer-events-none group-hover:opacity-15 transition-opacity duration-700`}></div>
                
                <div className="flex justify-between items-center mb-10 relative z-10">
                  <div className="flex flex-col gap-2">
                    <span className="font-serif text-3xl text-foreground tracking-tight leading-none mb-1">{language === 'ar' ? h.name : h.enName}</span>
                    <span className="text-[10px] font-bold text-foreground/50 uppercase tracking-[0.3em]">{h.streak} {language === 'ar' ? 'أيام متتالية' : 'day streak'}</span>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <div className="flex items-center gap-3 bg-background/50 backdrop-blur-md px-5 py-2.5 rounded-full border border-secondary shadow-sm">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-foreground/80">{h.streak} / {h.maxStreak}</span>
                    </div>
                    <span className="text-[9px] font-bold text-primary uppercase tracking-widest pr-2">{language === 'ar' ? '🔥 استمر' : '🔥 Keep going'}</span>
                  </div>
                </div>
                
                {/* Refined Progress Bar */}
                <div className="w-full bg-secondary/50 h-2.5 rounded-full overflow-hidden relative shadow-[inset_0_1px_5px_rgba(0,0,0,0.1)]">
                  <div 
                    className={`h-full ${h.color} rounded-full transition-all duration-1000 ease-out relative z-10`} 
                    style={{ width: `${h.progress}%` }}
                  >
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Calendar View (Spans 5 cols) */}
        <div className="xl:col-span-5 flex flex-col h-full animate-in slide-in-from-bottom-8 duration-700">
          <div className="glass-premium rounded-[3rem] p-10 md:p-12 flex flex-col h-full relative overflow-hidden">
            
            <div className="flex items-center justify-between mb-14 relative z-10">
              <div className="flex flex-col gap-3">
                <h3 className="text-4xl font-serif text-foreground tracking-tight">
                  {calendarData.formattedMonth}
                </h3>
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_12px_rgba(var(--primary-rgb),0.5)]"></div>
                   <span className="text-[10px] text-primary font-bold uppercase tracking-[0.3em]">{language === 'ar' ? 'معدل الاستمرارية: ٩٢٪' : 'Consistency Rate: 92%'}</span>
                </div>
              </div>
              <div className="flex gap-2 bg-background/50 backdrop-blur-md p-2 rounded-full border border-secondary shadow-sm">
                <button onClick={() => navigateMonth(-1)} className="p-3.5 bg-card rounded-full shadow-sm hover:bg-foreground hover:text-background transition-all duration-300"><ChevronLeft className="w-5 h-5"/></button>
                <button onClick={() => navigateMonth(1)} className="p-3.5 bg-card rounded-full shadow-sm hover:bg-foreground hover:text-background transition-all duration-300"><ChevronRight className="w-5 h-5"/></button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-4 mb-8 relative z-10">
              {weekDays.map(day => (
                <div key={day} className="text-center text-[10px] font-bold text-foreground/40 uppercase tracking-[0.3em]">{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-6 gap-x-4 place-items-center mb-auto relative z-10">
              {calendarData.days.map((item) => {
                if (item.day === null) return <div key={item.key} className="w-full aspect-square"></div>;
                
                const isToday = item.day === calendarData.currentDay && calendarData.viewMonth === calendarData.currentMonth && calendarData.viewYear === calendarData.currentYear;
                const isFuture = (item.day > calendarData.currentDay && calendarData.viewMonth === calendarData.currentMonth && calendarData.viewYear === calendarData.currentYear) || (calendarData.viewYear > calendarData.currentYear) || (calendarData.viewYear === calendarData.currentYear && calendarData.viewMonth > calendarData.currentMonth);
                const isSelected = isToday || (item.day % 3 !== 0 && !isFuture);

                return (
                  <div key={item.key} className={`relative w-12 h-12 flex items-center justify-center rounded-2xl text-sm font-serif transition-all cursor-pointer select-none group
                    ${isToday ? 'bg-primary text-primary-foreground shadow-[0_8px_24px_rgba(0,0,0,0.15)] scale-110 z-10 font-bold' : ''}
                    ${isFuture ? 'text-foreground/20' : 
                      isSelected ? 'bg-foreground/5 text-foreground border border-foreground/10 shadow-sm' : 'bg-background/40 text-foreground/50 border border-secondary hover:border-foreground/20 hover:bg-background/80'}`}>
                    <span className="relative z-10">{item.day}</span>
                  </div>
                )
              })}
            </div>

            <div className="mt-12 pt-8 flex flex-wrap gap-8 border-t border-secondary relative z-10">
               <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-md bg-foreground/10 border border-foreground/20 shadow-sm"></div>
                  <span className="text-[10px] font-bold text-foreground/60 uppercase tracking-[0.3em]">{language === 'ar' ? 'تم الإنجاز' : 'Goal Met'}</span>
               </div>
               <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-md bg-background/40 border border-secondary shadow-sm"></div>
                  <span className="text-[10px] font-bold text-foreground/60 uppercase tracking-[0.3em]">{language === 'ar' ? 'قيد العمل' : 'In Progress'}</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Elegant Add Habit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-background/60 backdrop-blur-3xl z-[100] flex items-center justify-center p-4 animate-in fade-in duration-700">
          <div className="glass-premium w-full max-w-2xl rounded-[3.5rem] p-16 shadow-[0_40px_80px_rgba(0,0,0,0.15)] border border-white/60 dark:border-white/10 relative animate-in zoom-in-95 duration-500">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-10 right-10 p-4 hover:bg-secondary rounded-full transition-colors group"
            >
              <X className="w-6 h-6 text-foreground/50 group-hover:text-foreground transition-colors"/>
            </button>
            
            <div className="text-center mb-14">
              <span className="block text-[11px] font-bold uppercase tracking-[0.4em] text-primary mb-5">{language === 'ar' ? 'رحلة جديدة' : 'New Journey'}</span>
              <h3 className="text-5xl font-serif tracking-tight text-foreground">{language === 'ar' ? 'عادة جديدة' : 'New Habit'}</h3>
            </div>

            <form onSubmit={addHabit} className="space-y-10 relative">
              <div>
                <input 
                  autoFocus
                  required
                  type="text" 
                  value={newHabit.name}
                  onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value, enName: e.target.value })}
                  placeholder={language === 'ar' ? 'ماذا تريدين أن تبني؟' : 'What do you want to build?'}
                  className="w-full bg-background/50 border border-secondary px-10 py-6 rounded-[2rem] focus:ring-2 focus:ring-primary/20 outline-none font-serif text-2xl placeholder:text-foreground/30 shadow-inner transition-all text-center"
                />
              </div>
              
              <button className="w-full bg-foreground text-background py-6 rounded-full font-bold uppercase text-[11px] tracking-[0.4em] shadow-[0_12px_40px_rgba(0,0,0,0.15)] hover:bg-primary hover:text-primary-foreground hover:-translate-y-2 active:translate-y-0 transition-all duration-500 mt-8">
                {language === 'ar' ? 'بدء الرحلة' : 'Start Journey'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Habits;
