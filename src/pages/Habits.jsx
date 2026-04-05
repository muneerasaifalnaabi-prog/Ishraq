import React, { useState, useMemo, useEffect } from 'react';
import { Activity, Star, Calendar as CalendarIcon, ChevronLeft, ChevronRight, CheckCircle2, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { habitService } from '../services/api';

const Habits = () => {
  const { t, language } = useAppContext();

  const [habitsList, setHabitsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    habitService.getHabits().then(data => {
      setHabitsList(data || []);
      setIsLoading(false);
    });
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHabit, setNewHabit] = useState({ name: '', enName: '', color: 'from-primary to-accent' });

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
    setNewHabit({ name: '', enName: '', color: 'from-primary to-accent' });
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
    <div className="glass rounded-[2rem] p-6 md:p-8 mb-8 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <h2 className={`text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r flex items-center gap-3 ${language === 'ar' ? 'from-primary to-foreground' : 'from-foreground to-primary'}`}>
          <Activity className="w-8 h-8 text-primary" /> {t('habits')}
        </h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary/95 text-white px-6 py-3 rounded-xl text-xs font-black tracking-widest shadow-lg shadow-primary/20 transition-all uppercase active:scale-95"
        >
           {language === 'ar' ? '+ إضافة عادة' : '+ Add Habit'}
        </button>
      </div>

      {/* Add Habit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white dark:bg-card w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            <div className="flex justify-between items-center mb-8 relative">
              <h3 className="text-xl font-black">{language === 'ar' ? 'عادة جديدة' : 'New Habit'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-secondary rounded-full transition-colors"><X className="w-5 h-5"/></button>
            </div>
            <form onSubmit={addHabit} className="space-y-6 relative">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest opacity-40 block mb-2">{language === 'ar' ? 'اسم العادة' : 'Habit Name'}</label>
                <input 
                  autoFocus
                  required
                  type="text" 
                  value={newHabit.name}
                  onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value, enName: e.target.value })}
                  placeholder={language === 'ar' ? 'مثال: المشي صباحاً' : 'e.g. Morning Walk'}
                  className="w-full bg-secondary/30 p-4 rounded-xl border-0 focus:ring-4 focus:ring-primary/10 outline-none font-bold placeholder:text-foreground/20"
                />
              </div>
              <div className="grid grid-cols-4 gap-3">
                 {['from-blue-400 to-blue-600', 'from-purple-400 to-purple-600', 'from-orange-400 to-orange-600', 'from-emerald-400 to-emerald-600'].map(c => (
                   <button 
                     key={c}
                     type="button"
                     onClick={() => setNewHabit({ ...newHabit, color: c })}
                     className={`h-12 rounded-xl bg-gradient-to-br ${c} transition-all ${newHabit.color === c ? 'ring-4 ring-offset-2 ring-primary scale-110' : 'opacity-40 hover:opacity-100'}`}
                   ></button>
                 ))}
              </div>
              <button className="w-full bg-primary text-white py-4 rounded-xl font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                {language === 'ar' ? 'حفظ العادة' : 'Save Habit'}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        <div className="space-y-6">
          <h3 className="text-lg font-black text-foreground/50 flex items-center gap-3 px-2 uppercase tracking-[0.2em] mb-4">
             <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
             {language === 'ar' ? 'العادات الحالية' : 'Active Habits'}
          </h3>
          <div className="space-y-6">
            {habitsList.map((h) => (
              <div key={h.id} className="glass-light dark:bg-card/40 p-6 rounded-[1.5rem] border shadow-md group cursor-pointer bg-white/50 hover:translate-y-[-4px] transition-all">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex flex-col">
                    <span className="font-black text-xl text-foreground/70 tracking-tight leading-none">{language === 'ar' ? h.name : h.enName}</span>
                    <span className="text-[8px] font-black text-foreground/30 mt-2 uppercase tracking-widest">{h.streak} day streak</span>
                  </div>
                  <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-xl text-xs font-black shadow-sm tracking-tighter">
                    {h.streak} / {h.maxStreak} 🔥
                  </div>
                </div>
                <div className="w-full bg-secondary/30 h-4 rounded-full overflow-hidden relative shadow-inner">
                  <div className={`h-full bg-gradient-to-r ${h.color} rounded-full transition-all duration-1000 delay-300`} style={{ width: `${h.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Improved Calendar with BETTER CONTRAST COLORS */}
        <div className="flex flex-col">
          <div className="bg-white/40 dark:bg-card/40 rounded-[2rem] p-6 md:p-8 border border-primary/5 shadow-xl flex flex-col backdrop-blur-xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex flex-col">
                <h3 className="text-xl font-black text-foreground/80 tracking-tight mb-1">
                  {calendarData.formattedMonth}
                </h3>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                   <span className="text-[8px] text-emerald-600 font-black uppercase tracking-widest">Rate: 92%</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => navigateMonth(-1)} className="p-3 bg-white dark:bg-card rounded-xl shadow-sm border border-secondary/50 hover:bg-primary/5 transition-all"><ChevronLeft className="w-4 h-4 text-foreground/40"/></button>
                <button onClick={() => navigateMonth(1)} className="p-3 bg-white dark:bg-card rounded-xl shadow-sm border border-secondary/50 hover:bg-primary/5 transition-all"><ChevronRight className="w-4 h-4 text-foreground/40"/></button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-3 mb-6">
              {weekDays.map(day => (
                <div key={day} className="text-center text-[9px] font-black text-foreground/20 uppercase">{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-3 place-items-center mb-6">
              {calendarData.days.map((item) => {
                if (item.day === null) return <div key={item.key} className="w-full aspect-square"></div>;
                
                const isToday = item.day === calendarData.currentDay && calendarData.viewMonth === calendarData.currentMonth && calendarData.viewYear === calendarData.currentYear;
                const isFuture = (item.day > calendarData.currentDay && calendarData.viewMonth === calendarData.currentMonth && calendarData.viewYear === calendarData.currentYear) || (calendarData.viewYear > calendarData.currentYear) || (calendarData.viewYear === calendarData.currentYear && calendarData.viewMonth > calendarData.currentMonth);
                const isSelected = isToday || (item.day % 3 !== 0 && !isFuture);

                return (
                  <div key={item.key} className={`relative w-8 h-8 flex items-center justify-center rounded-lg text-xs font-black transition-all cursor-pointer select-none
                    ${isToday ? 'ring-4 ring-primary/10 border-2 border-primary bg-white text-primary scale-110 z-10' : ''}
                    ${isFuture ? 'bg-secondary/20 text-foreground/5' : 
                      isSelected ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-white dark:bg-card text-foreground/20 border border-secondary/20 hover:border-emerald-200'}`}>
                    <span className="relative z-10">{item.day}</span>
                  </div>
                )
              })}
            </div>

            <div className="mt-4 pt-6 flex flex-wrap gap-4 border-t border-primary/5">
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-emerald-500 shadow-sm"></div>
                  <span className="text-[8px] font-black text-foreground/40 uppercase tracking-widest">{language === 'ar' ? 'تم الإنجاز' : 'Goal Met'}</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-white border-2 border-secondary shadow-sm"></div>
                  <span className="text-[8px] font-black text-foreground/40 uppercase tracking-widest">{language === 'ar' ? 'قيد العمل' : 'In Progress'}</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Habits;
