import React from 'react';
import { Trophy, Star, Target, Sparkles, ChevronRight, Zap } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Challenges = () => {
  const { t, language } = useAppContext();

  const activeChallenges = [
    { title: language === 'ar' ? 'تحدي 7 أيام إنتاجية' : '7 Days of Productivity', days: '3/7', progress: 42, icon: Zap, color: 'from-orange-400 to-red-500' },
    { title: language === 'ar' ? 'تحدي 30 يوم صحة' : '30 Days of Wellness', days: '12/30', progress: 40, icon: Star, color: 'from-blue-400 to-indigo-500' },
  ];

  const milestones = [
    { name: language === 'ar' ? 'بطلة العادات' : 'Habit Champion', level: 1, text: language === 'ar' ? 'أكملي 5 عادات' : 'Complete 5 habits' },
    { name: language === 'ar' ? 'نجمة الصباح' : 'Morning Star', level: 2, text: language === 'ar' ? 'أكملي 10 ساعات صباحية' : 'Complete 10 morning focus hours' },
  ];

  return (
    <div className="flex-1 glass rounded-3xl p-8 flex flex-col h-full overflow-hidden">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary flex items-center gap-3">
          <Trophy className="w-8 h-8 text-primary" /> {language === 'ar' ? 'التحديات والمكافآت' : 'Challenges & Rewards'}
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 flex-1 overflow-hidden">
        {/* Active Challenges */}
        <div className="space-y-6 overflow-y-auto pr-2 pb-6">
           <h3 className="text-xl font-bold text-foreground/70 mb-4">{language === 'ar' ? 'تحديات جارية' : 'Ongoing Challenges'}</h3>
           {activeChallenges.map((c, i) => (
             <div key={i} className="bg-white/40 dark:bg-card/40 p-8 rounded-[2.5rem] border border-primary/20 shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-all cursor-pointer">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${c.color} opacity-10 rounded-full blur-3xl group-hover:scale-150 transition-transform`}></div>
                <div className="flex justify-between items-start mb-6">
                   <div className="p-3 bg-primary/10 rounded-2xl">
                      <c.icon className="w-8 h-8 text-primary" />
                   </div>
                   <div className="text-3xl font-black text-primary/40 italic">{c.days}</div>
                </div>
                <h4 className="text-2xl font-black mb-6 leading-tight max-w-[200px]">{c.title}</h4>
                <div className="w-full bg-secondary/50 h-5 rounded-full overflow-hidden relative shadow-inner">
                   <div className={`h-full bg-gradient-to-r ${c.color} rounded-full transition-all duration-700`} style={{ width: `${c.progress}%` }}></div>
                </div>
             </div>
           ))}
        </div>

        {/* Milestones & Badges */}
        <div className="space-y-6 flex flex-col">
           <div className="bg-gradient-to-br from-primary to-accent rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <Trophy className="w-16 h-16 mb-4 text-white drop-shadow-lg animate-bounce" />
              <h3 className="text-2xl font-black mb-2">{language === 'ar' ? 'أنتِ رائعة!' : 'You are Incredible!'}</h3>
              <p className="text-sm font-bold opacity-80 mb-6">{language === 'ar' ? 'تبقت 3 تحديات للحصول على شارة بطلة الأسبوع' : '3 more tasks to unlock Weekly Champion badge'}</p>
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-8 py-3 rounded-2xl font-black text-sm transition-all shadow-lg flex items-center gap-2">
                 {language === 'ar' ? 'عرض الشارات' : 'View Badges'} <ChevronRight className="w-4 h-4 ml-1" />
              </button>
           </div>

           <div className="flex-1 bg-white/40 dark:bg-card/40 rounded-[2.5rem] p-8 border border-primary/20 shadow-xl overflow-y-auto">
              <h3 className="text-lg font-black mb-6">{language === 'ar' ? 'الإنجازات القادمة' : 'Next Milestones'}</h3>
              <div className="space-y-4">
                 {milestones.map((m, i) => (
                   <div key={i} className="flex items-center gap-4 p-4 rounded-3xl bg-white/60 dark:bg-card/40 border border-primary/5 hover:border-primary/30 transition-all cursor-pointer">
                      <div className="w-14 h-14 bg-secondary/50 rounded-2xl flex items-center justify-center">
                         <Sparkles className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 shrink-0">
                         <h4 className="font-black text-sm">{m.name}</h4>
                         <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest leading-none mt-1">{m.text}</p>
                      </div>
                      <div className="font-black text-primary/40 text-lg">Lvl {m.level}</div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Challenges;
