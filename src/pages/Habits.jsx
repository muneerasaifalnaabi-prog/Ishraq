import React, { useState } from 'react';
import { Activity, Star, Calendar, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Habits = () => {
  const { t, language } = useAppContext();

  const habitsList = [
    { name: 'شرب الماء', enName: 'Drink Water', streak: 12, maxStreak: 21, progress: 80, color: 'from-blue-400 to-blue-600' },
    { name: 'القراءة', enName: 'Reading', streak: 4, maxStreak: 10, progress: 40, color: 'from-purple-400 to-purple-600' },
    { name: 'التأمل', enName: 'Meditation', streak: 21, maxStreak: 30, progress: 100, color: 'from-orange-400 to-orange-600' },
  ];

  // Modern Calendar Logic (Mocked for current month)
  const daysInMonth = 30;
  const currentDay = 14; 
  const monthName = language === 'ar' ? 'أبريل 2024' : 'April 2024';
  const weekDays = language === 'ar' ? ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'] : ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="flex-1 glass rounded-3xl p-8 flex flex-col h-full overflow-hidden">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary flex items-center gap-3">
          <Activity className="w-8 h-8 text-primary" /> {t('habits')}
        </h2>
        <button className="bg-primary/10 text-primary px-4 py-2 rounded-xl text-sm font-bold hover:bg-primary/20 transition-all">
           {language === 'ar' ? '+ إضافة عادة' : '+ Add Habit'}
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 h-full overflow-hidden">
        {/* Habits List Section */}
        <div className="space-y-6 overflow-y-auto pr-2 pb-6">
          <h3 className="text-xl font-bold text-foreground/70 mb-4 flex items-center gap-2">
             <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
             {language === 'ar' ? 'العادات الحالية' : 'Active Habits'}
          </h3>
          {habitsList.map((h, i) => (
            <div key={i} className="glass-light dark:bg-card/40 p-6 rounded-3xl shadow-lg border border-white/20 hover:border-primary/40 transition-all group cursor-pointer bg-white/60">
              <div className="flex justify-between items-center mb-4">
                <div className="flex flex-col">
                  <span className="font-black text-xl text-foreground/80 tracking-tight">{language === 'ar' ? h.name : h.enName}</span>
                  <span className="text-xs font-bold text-foreground/40 mt-0.5 uppercase tracking-widest italic">{h.streak} day streak</span>
                </div>
                <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-black shadow-sm group-hover:scale-105 transition-transform">
                  {h.streak} / {h.maxStreak} 🔥
                </div>
              </div>
              <div className="w-full bg-secondary/50 h-4 rounded-full overflow-hidden relative shadow-inner">
                <div className={`h-full bg-gradient-to-r ${h.color} rounded-full transition-all duration-700 delay-200`} style={{ width: `${h.progress}%` }}></div>
                <div className="absolute inset-0 bg-white/10 glass-shine"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Premium Calendar Section */}
        <div className="flex flex-col h-full">
          <div className="bg-white/40 dark:bg-card/40 rounded-[2.5rem] p-8 border border-primary/10 shadow-2xl flex-1 flex flex-col backdrop-blur-2xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex flex-col">
                <h3 className="text-2xl font-black text-foreground/80 tracking-tighter">
                  {monthName}
                </h3>
                <span className="text-xs text-primary font-bold uppercase tracking-widest opacity-60">Success rate: 92%</span>
              </div>
              <div className="flex gap-2">
                <button className="p-2.5 bg-white dark:bg-card rounded-xl shadow-md border border-primary/5 hover:bg-primary/10 transition-all"><ChevronLeft className="w-5 h-5"/></button>
                <button className="p-2.5 bg-white dark:bg-card rounded-xl shadow-md border border-primary/5 hover:bg-primary/10 transition-all"><ChevronRight className="w-5 h-5"/></button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-3 mb-4">
              {weekDays.map(day => (
                <div key={day} className="text-center text-[10px] font-black text-foreground/30 uppercase tracking-widest">{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-3 flex-1">
              {[...Array(daysInMonth)].map((_, i) => {
                const day = i + 1;
                const isDone = Math.random() > 0.3 || day === currentDay;
                const isFuture = day > currentDay + 1;
                const isToday = day === currentDay;

                return (
                  <div key={i} className={`relative aspect-square flex items-center justify-center rounded-2xl text-sm font-bold transition-all cursor-pointer group select-none
                    ${isToday ? 'scale-110 z-10 ring-4 ring-primary/20 border-2 border-primary' : ''}
                    ${isFuture ? 'bg-secondary/20 text-foreground/20' : 
                      isDone ? 'bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/30' : 'bg-white dark:bg-card text-foreground/40 border border-secondary hover:border-primary/40'}`}>
                    
                    <span className="relative z-10">{day}</span>
                    
                    {isDone && !isFuture && (
                      <div className="absolute -top-1.5 -right-1.5 bg-white rounded-full p-0.5 shadow-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary fill-white" />
                      </div>
                    )}
                    
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                )
              })}
            </div>

            <div className="mt-10 flex gap-6 pt-6 border-t border-primary/5">
               <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-lg bg-gradient-to-br from-primary to-accent shadow-md"></div>
                  <span className="text-[11px] font-black text-foreground/40 uppercase tracking-widest">Done</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-lg bg-white border border-secondary shadow-sm"></div>
                  <span className="text-[11px] font-black text-foreground/40 uppercase tracking-widest">Missed</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-lg bg-secondary/20"></div>
                  <span className="text-[11px] font-black text-foreground/40 uppercase tracking-widest">Future</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Habits;
