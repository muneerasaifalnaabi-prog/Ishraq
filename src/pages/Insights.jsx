import React from 'react';
import { BarChart3, TrendingUp, PieChart, Target, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Insights = () => {
  const { t, language } = useAppContext();

  const stats = [
    { label: language === 'ar' ? 'معدل الإنجاز' : 'Completion Rate', value: '87%', trend: '+5%', up: true, icon: Target },
    { label: language === 'ar' ? 'ساعات التركيز' : 'Focus Hours', value: '42h', trend: '+12%', up: true, icon: BarChart3 },
    { label: language === 'ar' ? 'العادات النشطة' : 'Active Habits', value: '8/10', trend: '-2%', up: false, icon: PieChart },
  ];

  return (
    <div className="flex-1 glass rounded-3xl p-8 flex flex-col h-full overflow-hidden">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-primary" /> {language === 'ar' ? 'التحليلات والتقارير' : 'Insights & Analytics'}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((s, i) => (
          <div key={i} className="bg-white/40 dark:bg-card/40 p-6 rounded-3xl border border-primary/10 shadow-lg relative overflow-hidden backdrop-blur-xl">
            <div className="flex justify-between items-start mb-4">
               <div className="p-3 bg-primary/10 rounded-2xl">
                  <s.icon className="w-6 h-6 text-primary" />
               </div>
               <div className={`flex items-center gap-1 text-xs font-black ${s.up ? 'text-green-500' : 'text-red-500'}`}>
                  {s.up ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {s.trend}
               </div>
            </div>
            <h4 className="text-sm font-bold text-foreground/40 uppercase tracking-widest mb-1">{s.label}</h4>
            <div className="text-3xl font-black text-foreground/80 tracking-tighter">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 flex-1 overflow-hidden">
        {/* Productivity Chart Mock */}
        <div className="bg-white/40 dark:bg-card/40 rounded-[2.5rem] p-8 border border-primary/10 flex flex-col items-center justify-center">
           <h4 className="w-full text-lg font-black mb-10">{language === 'ar' ? 'إحصائيات الإنتاجية' : 'Productivity Performance'}</h4>
           <div className="flex items-end gap-3 h-48 w-full px-4">
              {[60, 80, 45, 90, 70, 85, 95].map((val, i) => (
                <div key={i} className="flex-1 bg-gradient-to-t from-primary/20 to-primary rounded-2xl relative group" style={{ height: `${val}%` }}>
                   <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded-lg text-[10px] font-black shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{val}% Done</div>
                </div>
              ))}
           </div>
           <div className="flex justify-between w-full mt-6 px-4 text-[10px] font-black text-foreground/30 uppercase tracking-widest">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
           </div>
        </div>

        {/* Categories Distribution */}
        <div className="bg-white/40 dark:bg-card/40 rounded-[2.5rem] p-8 border border-primary/10 flex flex-col overflow-hidden">
           <h4 className="text-lg font-black mb-8">{language === 'ar' ? 'توزيع المهام' : 'Task Categories'}</h4>
           <div className="space-y-6 overflow-y-auto pr-2">
              {[
                { name: language === 'ar' ? 'عمل' : 'Work', color: 'bg-blue-400', val: 45 },
                { name: language === 'ar' ? 'عناية ذاتية' : 'Self Care', color: 'bg-primary', val: 30 },
                { name: language === 'ar' ? 'رياضة' : 'Fitness', color: 'bg-orange-400', val: 15 },
                { name: language === 'ar' ? 'أخرى' : 'Other', color: 'bg-secondary', val: 10 }
              ].map((c, i) => (
                <div key={i} className="space-y-2">
                   <div className="flex justify-between text-sm font-bold">
                      <span>{c.name}</span>
                      <span className="text-foreground/40">{c.val}%</span>
                   </div>
                   <div className="w-full bg-secondary/30 h-2 rounded-full overflow-hidden">
                      <div className={`h-full ${c.color}`} style={{ width: `${c.val}%` }}></div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
