import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Planner = () => {
  const { t, language } = useAppContext();

  const hours = [
    { time: '08:00', label: 'صباحاً', enLabel: 'AM', title: 'روتين الصباح 🧴', enTitle: 'Morning Routine 🧴', type: 'selfcare' },
    { time: '09:00', label: 'صباحاً', enLabel: 'AM', title: 'عمل عميق 💻', enTitle: 'Deep Work 💻', type: 'work' },
    { time: '10:00', label: 'صباحاً', enLabel: 'AM', title: '', enTitle: '', type: 'empty' },
    { time: '11:00', label: 'صباحاً', enLabel: 'AM', title: 'اجتماع فريق', enTitle: 'Team Meeting', type: 'work' },
    { time: '12:00', label: 'مساءً', enLabel: 'PM', title: 'استراحة الغداء 🥗', enTitle: 'Lunch Break 🥗', type: 'break' },
    { time: '01:00', label: 'مساءً', enLabel: 'PM', title: '', enTitle: '', type: 'empty' },
  ];

  return (
    <div className="flex-1 glass rounded-3xl p-8 flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary flex items-center gap-3">
          <Calendar className="w-8 h-8 text-primary" /> {t('planner')}
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 relative">
        <div className="absolute top-0 bottom-0 left-[4.5rem] w-0.5 bg-secondary md:left-[5.5rem] rtl:right-[4.5rem] rtl:md:right-[5.5rem]"></div>
        <div className="space-y-6">
          {hours.map((slot, i) => (
            <div key={i} className="flex items-start gap-6 relative z-10">
              <div className="w-16 md:w-20 text-right flex flex-col items-end shrink-0 pt-2">
                <span className="font-bold text-lg text-foreground">{slot.time}</span>
                <span className="text-xs text-foreground/50 font-semibold">{language === 'ar' ? slot.label : slot.enLabel}</span>
              </div>
              
              <div className="relative mt-2 shrink-0">
                <div className="w-4 h-4 rounded-full bg-background border-4 border-primary z-10 relative shadow-sm"></div>
              </div>

              <div className={`flex-1 p-5 rounded-2xl border transition-all hover:scale-[1.01] cursor-pointer
                ${slot.type !== 'empty' ? 'bg-white block shadow-sm border-primary/20 dark:bg-card/80' : 'border-dashed border-secondary hover:border-primary/50 flex items-center justify-center min-h-[4rem] opacity-50 hover:opacity-100'}`}>
                {slot.type !== 'empty' ? (
                  <h4 className="font-bold text-[15px]">{language === 'ar' ? slot.title : slot.enTitle}</h4>
                ) : (
                  <span className="text-xs font-semibold text-primary/70">{language === 'ar' ? '+ إضافة موعد' : '+ Add Event'}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Planner;
