import React, { useState, useMemo } from 'react';
import { BarChart3, TrendingUp, PieChart, Calendar, ArrowUpRight, Zap, RefreshCw, Sparkles } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Insights = () => {
  const { t, language } = useAppContext();
  const [timeRange, setTimeRange] = useState('week');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const stats = useMemo(() => {
    return timeRange === 'week' 
      ? { completion: 84, focus: 92, habits: 75, trend: '+12%' }
      : { completion: 78, focus: 85, habits: 88, trend: '+5%' };
  }, [timeRange]);

  return (
    <div className="flex-1 glass rounded-[2rem] p-6 md:p-10 flex flex-col relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6 relative">
        <h2 className="text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary flex items-center gap-4">
          <BarChart3 className="w-9 h-9 text-primary" /> {t('insights')}
        </h2>
        <div className="flex items-center gap-4">
           <button onClick={refreshData} className={`p-3 bg-secondary/50 rounded-xl transition-all ${isRefreshing ? 'animate-spin text-primary' : 'hover:bg-primary/10'}`}>
              <RefreshCw className="w-5 h-5" />
           </button>
           <div className="flex bg-secondary/50 p-1.5 rounded-2xl border border-secondary shadow-sm">
             {['week', 'month'].map((range) => (
               <button 
                 key={range}
                 onClick={() => setTimeRange(range)}
                 className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${timeRange === range ? 'bg-white text-primary shadow-md scale-105':'text-foreground/30 hover:text-foreground'}`}
               >
                 {range === 'week' ? (language === 'ar' ? 'أسبوع' : 'Week') : (language === 'ar' ? 'شهر' : 'Month')}
               </button>
             ))}
           </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
         {[
           { label: language === 'ar' ? 'الإنجاز' : 'Completion', val: stats.completion, icon: <TrendingUp className="w-5 h-5" />, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
           { label: language === 'ar' ? 'التركيز' : 'Focus Rate', val: stats.focus, icon: <Zap className="w-5 h-5" />, color: 'text-primary', bg: 'bg-primary/10' },
           { label: language === 'ar' ? 'العادات' : 'Habit Strength', val: stats.habits, icon: <PieChart className="w-5 h-5" />, color: 'text-orange-500', bg: 'bg-orange-500/10' }
         ].map((s, i) => (
           <div key={i} className="bg-white/40 dark:bg-card/40 p-8 rounded-[2.5rem] border border-white shadow-xl backdrop-blur-xl group hover:scale-105 transition-all duration-500 ring-1 ring-black/[0.01]">
              <div className="flex justify-between items-start mb-6">
                 <div className={`p-4 rounded-2xl ${s.bg} ${s.color}`}>
                   {s.icon}
                 </div>
                 <div className={`flex items-center gap-1 text-[10px] font-black font-serif ${s.color}`}>
                    {stats.trend} <ArrowUpRight className="w-3 h-3" />
                 </div>
              </div>
              <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-foreground/30 mb-2">{s.label}</span>
              <div className="flex items-baseline gap-2">
                 <span className="text-4xl font-black text-foreground/80">{s.val}%</span>
                 <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              </div>
           </div>
         ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8 flex-1 relative">
         {/* Performance Chart Section */}
         <div className="lg:col-span-2 bg-white/40 dark:bg-card/40 rounded-[3rem] p-10 border border-white shadow-2xl flex flex-col backdrop-blur-xl">
            <h3 className="font-black text-lg mb-10 flex items-center gap-3 uppercase tracking-widest text-foreground/50">
               <Calendar className="w-5 h-5" />
               {language === 'ar' ? 'نشاط الإنتاجية' : 'Productivity Activity'}
            </h3>
            <div className={`flex items-end h-full gap-4 pb-4 px-2 transition-all duration-700 ${isRefreshing ? 'opacity-20 translate-y-4' : 'opacity-100 translate-y-0'}`}>
               {[40, 70, 45, 90, 65, 80, 55, 75, 60, 85].map((v, i) => (
                 <div key={i} className="flex-1 flex flex-col items-center justify-end group transition-all">
                    <div className="absolute -top-8 bg-primary text-white text-[8px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 pointer-events-none">{v}%</div>
                    <div className="w-full bg-gradient-to-t from-primary/30 to-primary/80 rounded-2xl transition-all duration-700 group-hover:shadow-lg group-hover:shadow-primary/20" style={{ height: `${timeRange === 'week' ? v : v * 0.8}%` }}>
                       <div className="w-full h-full glass-shine opacity-20"></div>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* Ai Recommendation Module */}
         <div className="bg-gradient-to-br from-primary to-accent rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden flex flex-col group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>
            <Sparkles className="w-12 h-12 mb-8 opacity-80 group-hover:scale-110 transition-transform" />
            <h4 className="text-2xl font-black mb-6 tracking-tight">{language === 'ar' ? 'تحليل ذكي' : 'Smart Insight'}</h4>
            <p className="text-sm font-bold opacity-90 leading-relaxed mb-auto italic">
               {language === 'ar' 
                 ? "لاحظنا أن إنتاجيتك تزداد في الصباح بعد جلسة التأمل. حاولي جدولة المهام الصعبة قبل الساعة 11." 
                 : "Your focus is 15% higher in the mornings after meditation. Try scheduling deep work before 11 AM."}
            </p>
            <div className="mt-10 pt-8 border-t border-white/10 w-full">
               <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Consistency Goal</span>
                  <span className="text-xl font-black text-white">92%</span>
               </div>
               <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                  <div className="w-[92%] h-full bg-white rounded-full"></div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Insights;
