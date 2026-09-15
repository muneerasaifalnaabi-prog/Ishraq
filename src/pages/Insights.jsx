import React, { useState, useMemo, useEffect } from 'react';
import { BarChart3, TrendingUp, PieChart, Calendar, ArrowUpRight, Zap, RefreshCw, Sparkles, Activity, Check } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { taskService, habitService, moodService } from '../services/api';

const Insights = () => {
  const { language, showNotification } = useAppContext();
  const [timeRange, setTimeRange] = useState('week');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [applied, setApplied] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [habits, setHabits] = useState([]);
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    // Trigger entrance animation on mount
    const timer = setTimeout(() => setAnimateIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const loadData = () => {
    Promise.all([taskService.getTasks(), habitService.getHabits(), moodService.getMoods()]).then(
      ([taskData, habitData, moodData]) => {
        setTasks(taskData || []);
        setHabits(habitData || []);
        setMoods(moodData || []);
      }
    );
  };

  useEffect(() => { loadData(); }, []);

  const refreshData = () => {
    setIsRefreshing(true);
    loadData();
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const applySuggestion = () => {
    setApplied(true);
    showNotification(language === 'ar' ? 'تم جدولة مهامك المهمة قبل الحادية عشر صباحاً ✨' : 'Your deep-work tasks are now scheduled before 11 AM ✨');
  };

  const windowDays = timeRange === 'week' ? 7 : 30;
  const [nowRef] = useState(() => Date.now());

  const tasksInWindow = useMemo(() => {
    const cutoff = nowRef - windowDays * 24 * 60 * 60 * 1000;
    return tasks.filter(task => !task.created_at || new Date(task.created_at).getTime() >= cutoff);
  }, [tasks, windowDays, nowRef]);

  const stats = useMemo(() => {
    const total = tasksInWindow.length;
    const completed = tasksInWindow.filter(task => task.done).length;
    const completion = total > 0 ? Math.round((completed / total) * 100) : 0;

    const urgent = tasksInWindow.filter(task => task.priority === 'مهم');
    const urgentDone = urgent.filter(task => task.done).length;
    const taskFocus = urgent.length > 0 ? Math.round((urgentDone / urgent.length) * 100) : completion;

    // Blend in recent mood positivity (mood_index 0-4) as a proxy for focus/energy
    const recentMoods = moods.slice(-windowDays);
    const moodScore = recentMoods.length > 0
      ? Math.round((recentMoods.reduce((sum, m) => sum + (m.mood_index || 0), 0) / recentMoods.length / 4) * 100)
      : null;
    const focus = moodScore !== null ? Math.round((taskFocus + moodScore) / 2) : taskFocus;

    const habitsAvg = habits.length > 0
      ? Math.round(habits.reduce((sum, h) => sum + (h.progress || 0), 0) / habits.length)
      : 0;

    const streak = habits.length > 0 ? Math.max(...habits.map(h => h.streak || 0)) : 0;

    return { completion, focus, habits: habitsAvg, streak, total, completed };
  }, [tasksInWindow, habits, moods, windowDays]);

  const chartData = useMemo(() => {
    const days = [];
    const dayLabelFormatter = new Intl.DateTimeFormat(language === 'ar' ? 'ar-EG' : 'en-US', { weekday: 'narrow' });
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - i);
      const nextDate = new Date(date);
      nextDate.setDate(date.getDate() + 1);

      const dayTasks = tasks.filter(task => {
        if (!task.created_at) return false;
        const created = new Date(task.created_at).getTime();
        return created >= date.getTime() && created < nextDate.getTime();
      });
      const val = dayTasks.length > 0
        ? Math.round((dayTasks.filter(task => task.done).length / dayTasks.length) * 100)
        : 0;

      days.push({ day: dayLabelFormatter.format(date), val });
    }
    return days;
  }, [tasks, language]);

  return (
    <div className={`flex-1 w-full flex flex-col relative transition-all duration-1000 ease-out ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {/* Abstract Luxury Background Glows */}
      <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-gradient-to-br from-primary/10 via-accent/5 to-transparent rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[30rem] h-[30rem] bg-gradient-to-tr from-rose-200/20 to-transparent rounded-full blur-[100px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />

      {/* Elegant Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 relative z-10 px-2 md:px-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-foreground/90 flex items-center gap-4 mb-3">
            {language === 'ar' ? 'الرؤى' : 'Insights'}
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
          </h2>
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-foreground/40 font-bold ml-1">
             {language === 'ar' ? 'تحليل الأداء والنمو' : 'Performance & Growth Analysis'}
          </p>
        </div>
        
        <div className="flex items-center gap-3 bg-white/40 dark:bg-card/40 backdrop-blur-2xl p-2 rounded-full border border-white/60 shadow-sm">
           <button onClick={refreshData} className={`p-3 bg-white/60 dark:bg-black/20 rounded-full transition-all duration-500 hover:rotate-180 hover:shadow-md hover:bg-white dark:hover:bg-white/20 ${isRefreshing ? 'animate-spin text-primary' : 'text-foreground/60'}`}>
              <RefreshCw className="w-4 h-4" />
           </button>
           <div className="flex items-center relative">
             <div className="flex z-10">
               {['week', 'month'].map((range) => (
                 <button 
                   key={range}
                   onClick={() => setTimeRange(range)}
                   className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-500 ${timeRange === range ? 'text-primary' : 'text-foreground/40 hover:text-foreground/70'}`}
                 >
                   {range === 'week' ? (language === 'ar' ? 'أسبوع' : 'Week') : (language === 'ar' ? 'شهر' : 'Month')}
                 </button>
               ))}
             </div>
             {/* Sliding Pill Indicator */}
             <div className={`absolute top-0 bottom-0 w-1/2 bg-white dark:bg-card shadow-sm rounded-full transition-transform duration-500 ease-out border border-black/5 ${timeRange === 'week' ? 'translate-x-0' : 'translate-x-full rtl:-translate-x-full'}`} />
           </div>
        </div>
      </div>

      {/* Asymmetrical Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10 p-2 md:p-6">
        
        {/* Main Stat: Completion Rate (Spans 8 cols) */}
        <div className="md:col-span-8 bg-gradient-to-br from-white/70 to-white/30 dark:from-card/70 dark:to-card/30 rounded-[2.5rem] p-8 md:p-12 border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-3xl relative overflow-hidden group transition-all duration-500 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] hover:-translate-y-1">
           <div className="absolute -top-12 -right-12 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none">
             <Activity className="w-96 h-96 -rotate-12" />
           </div>
           
           <div className="relative z-10 h-full flex flex-col justify-between">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
               <div>
                 <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40 mb-3">{language === 'ar' ? 'معدل الإنجاز' : 'Completion Rate'}</span>
                 <div className="flex items-baseline gap-3">
                   <span className="text-7xl md:text-8xl font-serif tracking-tighter text-foreground/90">{stats.completion}<span className="text-4xl text-emerald-500 font-sans font-light">%</span></span>
                 </div>
               </div>
               <div className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-5 py-3 rounded-full flex items-center gap-2 text-xs font-bold shadow-sm backdrop-blur-md border border-emerald-500/20">
                 {stats.completed}/{stats.total} {language === 'ar' ? 'مهام مكتملة' : 'tasks completed'} <ArrowUpRight className="w-4 h-4 ml-1 rtl:ml-0 rtl:mr-1 rtl:-scale-x-100" />
               </div>
             </div>
             
             {/* Elegant Bar Chart */}
             <div className="mt-16 flex gap-2 h-24 items-end">
               {chartData.map((d, i) => (
                 <div key={i} className="flex-1 flex flex-col items-center justify-end gap-3 group/bar cursor-pointer">
                   <div className="w-full relative flex justify-center items-end h-full min-h-[8rem]">
                     <div 
                       className="w-full max-w-[3rem] bg-gradient-to-t from-emerald-500/10 to-emerald-400/60 rounded-xl transition-all duration-700 ease-out group-hover/bar:bg-emerald-400 group-hover/bar:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                       style={{ height: `${isRefreshing ? 10 : d.val}%`, transitionDelay: `${i * 40}ms` }}
                     />
                     <div className="absolute -top-10 bg-white dark:bg-card px-3 py-1.5 rounded-xl shadow-lg text-[10px] font-bold text-emerald-600 border border-black/5 opacity-0 -translate-y-2 group-hover/bar:opacity-100 group-hover/bar:translate-y-0 transition-all duration-300 pointer-events-none">
                       {d.val}%
                     </div>
                   </div>
                   <span className="text-[10px] font-bold text-foreground/30 uppercase">{d.day}</span>
                 </div>
               ))}
             </div>
           </div>
        </div>

        {/* Focus Rate (Spans 4 cols) */}
        <div className="md:col-span-4 bg-gradient-to-b from-primary/5 to-transparent rounded-[2.5rem] p-8 border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-3xl flex flex-col justify-between group transition-all duration-500 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] hover:-translate-y-1 relative overflow-hidden">
           <div className="absolute -right-12 -top-12 w-40 h-40 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors duration-700 pointer-events-none"></div>
           
           <div className="flex justify-between items-center mb-16">
             <div className="p-4 bg-white/80 dark:bg-card/80 rounded-2xl shadow-sm border border-white">
               <Zap className="w-6 h-6 text-primary" />
             </div>
             <div className="flex items-center px-4 py-1.5 bg-white/60 dark:bg-card/60 rounded-full text-[10px] font-bold text-primary border border-white/50 shadow-sm uppercase tracking-widest">
               {language === 'ar' ? 'أفضل ١٠٪' : 'Top 10%'}
             </div>
           </div>
           
           <div className="relative z-10">
             <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40 mb-3">{language === 'ar' ? 'حالة التركيز' : 'Focus State'}</span>
             <div className="flex items-end gap-1">
               <span className="text-6xl font-serif tracking-tight text-foreground/90">{stats.focus}</span>
               <span className="text-2xl font-light text-primary mb-1">%</span>
             </div>
             <p className="mt-6 text-xs leading-loose text-foreground/50 font-medium">
               {language === 'ar' ? 'قدرتك على التركيز العميق ممتازة. جلسات العمل الأخيرة أظهرت انخفاضاً ملحوظاً في التشتت.' : 'Your deep work sessions are highly effective. Recent activity shows a significant drop in context-switching.'}
             </p>
           </div>
        </div>

        {/* AI Insight Card - Dark Editorial Style (Spans 6 cols) */}
        <div className="md:col-span-6 bg-[#0f172a] text-white rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group shadow-2xl transition-transform duration-500 hover:-translate-y-1">
           {/* Generative Noise Texture */}
           <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
           
           {/* Glowing Orbs */}
           <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-primary/40 rounded-full blur-[80px] group-hover:scale-125 group-hover:bg-primary/50 transition-all duration-1000 ease-out pointer-events-none"></div>
           <div className="absolute -right-20 -top-20 w-64 h-64 bg-accent/30 rounded-full blur-[80px] group-hover:scale-125 transition-transform duration-1000 ease-out pointer-events-none"></div>
           
           <div className="relative z-10 h-full flex flex-col justify-between">
             <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/10">
                  <Sparkles className="w-5 h-5 text-white/90" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">{language === 'ar' ? 'تحليل ذكي' : 'AI Analysis'}</span>
             </div>
             
             <h3 className="text-xl md:text-2xl font-serif leading-relaxed mb-10 text-white/90 group-hover:text-white transition-colors duration-500">
               {language === 'ar' 
                 ? "إنتاجيتك ترتفع بنسبة ١٥٪ بعد جلسات التأمل الصباحية. نقترح برمجة المهام المعقدة قبل الحادية عشر صباحاً للحصول على أفضل النتائج." 
                 : "Your focus is 15% higher in the mornings after meditation. Try scheduling deep work before 11 AM to maximize this cognitive peak."}
             </h3>
             
             <button
               onClick={applySuggestion}
               disabled={applied}
               className="self-start px-8 py-4 bg-white/10 hover:bg-white text-white hover:text-[#0f172a] rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 backdrop-blur-md border border-white/20 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-default disabled:hover:scale-100 disabled:hover:bg-white/10 disabled:hover:text-white flex items-center gap-2"
             >
               {applied && <Check className="w-3.5 h-3.5" strokeWidth={2.5} />}
               {applied
                 ? (language === 'ar' ? 'تم التطبيق' : 'Applied')
                 : (language === 'ar' ? 'تطبيق المقترح' : 'Apply Suggestion')}
             </button>
           </div>
        </div>

        {/* Small Stats Grid (Spans 6 cols) */}
        <div className="md:col-span-6 grid grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-white/70 to-white/30 dark:from-card/70 dark:to-card/30 rounded-[2.5rem] p-8 border border-white/60 shadow-sm backdrop-blur-3xl flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg transition-all duration-500 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl group-hover:bg-orange-500/10 transition-colors duration-500"></div>
             <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-8 border border-orange-500/20">
               <PieChart className="w-7 h-7 text-orange-500" />
             </div>
             <div>
               <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40 mb-2">{language === 'ar' ? 'قوة العادات' : 'Habit Strength'}</span>
               <div className="flex items-baseline gap-1">
                 <span className="text-5xl font-serif text-foreground/90">{stats.habits}</span>
                 <span className="text-lg font-light text-orange-500">%</span>
               </div>
             </div>
          </div>
          
          <div className="bg-gradient-to-br from-white/70 to-white/30 dark:from-card/70 dark:to-card/30 rounded-[2.5rem] p-8 border border-white/60 shadow-sm backdrop-blur-3xl flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg transition-all duration-500 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl group-hover:bg-rose-500/10 transition-colors duration-500"></div>
             <div className="w-14 h-14 bg-rose-500/10 rounded-2xl flex items-center justify-center mb-8 border border-rose-500/20">
               <TrendingUp className="w-7 h-7 text-rose-500" />
             </div>
             <div>
               <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40 mb-2">{language === 'ar' ? 'التتابع' : 'Current Streak'}</span>
               <div className="flex items-baseline gap-2">
                 <span className="text-5xl font-serif text-foreground/90">{stats.streak}</span>
                 <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">{language === 'ar' ? 'يوم' : 'Days'}</span>
               </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Insights;
