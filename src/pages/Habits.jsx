import React from 'react';
import { Activity, Star, Calendar } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Habits = () => {
  const { t, language } = useAppContext();

  const habitsList = [
    { name: 'شرب الماء', enName: 'Drink Water', streak: 12, maxStreak: 21, progress: 80, color: 'origin-left bg-blue-400' },
    { name: 'القراءة', enName: 'Reading', streak: 4, maxStreak: 10, progress: 40, color: 'origin-left bg-purple-400' },
    { name: 'التأمل', enName: 'Meditation', streak: 21, maxStreak: 30, progress: 100, color: 'origin-left bg-orange-400' },
  ];

  return (
    <div className="flex-1 glass rounded-3xl p-8 flex flex-col">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary flex items-center gap-3">
          <Activity className="w-8 h-8 text-primary" /> {t('habits')}
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-foreground/80 mb-4">{language === 'ar' ? 'العادات الحالية' : 'Current Habits'}</h3>
          {habitsList.map((h, i) => (
            <div key={i} className="bg-white/50 dark:bg-card/50 p-6 rounded-2xl shadow-sm border border-primary/10 hover:border-primary/30 transition-colors">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-lg">{language === 'ar' ? h.name : h.enName}</span>
                <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-500 px-3 py-1 rounded-full text-sm font-bold">
                  <Star className="w-4 h-4 fill-current" /> {h.streak} 🔥
                </div>
              </div>
              <div className="w-full bg-secondary h-3 rounded-full overflow-hidden">
                <div className={`h-full ${h.color} rounded-full`} style={{ width: `${h.progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10">
          <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6" /> {language === 'ar' ? 'التقويم الشهري' : 'Monthly Calendar'}
          </h3>
          <div className="grid grid-cols-7 gap-2">
            {[...Array(30)].map((_, i) => {
               const isDone = Math.random() > 0.3;
               const isToday = i === 14;
               return (
                 <div key={i} className={`aspect-square rounded-xl flex items-center justify-center font-bold text-sm transition-transform hover:scale-110 cursor-pointer
                    ${isToday ? 'border-2 border-primary ring-4 ring-primary/20' : ''} 
                    ${isDone ? 'bg-primary text-primary-foreground' : 'bg-white dark:bg-card text-foreground/40'}`}>
                   {i+1}
                 </div>
               )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Habits;
