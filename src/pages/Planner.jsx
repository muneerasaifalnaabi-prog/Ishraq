import React, { useState } from 'react';
import { Calendar, Clock, Plus, X, Check } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Planner = () => {
  const { t, language } = useAppContext();

  const [hours, setHours] = useState([
    { time: '08:00', label: 'صباحاً', enLabel: 'AM', title: 'روتين الصباح 🧴', enTitle: 'Morning Routine 🧴', type: 'selfcare' },
    { time: '09:00', label: 'صباحاً', enLabel: 'AM', title: 'عمل عميق 💻', enTitle: 'Deep Work 💻', type: 'work' },
    { time: '10:00', label: 'صباحاً', enLabel: 'AM', title: '', enTitle: '', type: 'empty' },
    { time: '11:00', label: 'صباحاً', enLabel: 'AM', title: 'اجتماع فريق', enTitle: 'Team Meeting', type: 'work' },
    { time: '12:00', label: 'مساءً', enLabel: 'PM', title: 'استراحة الغداء 🥗', enTitle: 'Lunch Break 🥗', type: 'break' },
    { time: '01:00', label: 'مساءً', enLabel: 'PM', title: '', enTitle: '', type: 'empty' },
    { time: '02:00', label: 'مساءً', enLabel: 'PM', title: '', enTitle: '', type: 'empty' },
  ]);

  const [editingIndex, setEditingIndex] = useState(null);
  const [tempTitle, setTempTitle] = useState('');

  const startEditing = (index, currentTitle) => {
    setEditingIndex(index);
    setTempTitle(currentTitle);
  };

  const saveEvent = (index) => {
    const newHours = [...hours];
    newHours[index].title = tempTitle;
    newHours[index].enTitle = tempTitle;
    newHours[index].type = tempTitle ? 'custom' : 'empty';
    setHours(newHours);
    setEditingIndex(null);
    setTempTitle('');
  };

  const clearEvent = (index) => {
    const newHours = [...hours];
    newHours[index].title = '';
    newHours[index].enTitle = '';
    newHours[index].type = 'empty';
    setHours(newHours);
    setEditingIndex(null);
  };

  return (
    <div className="flex-1 glass rounded-[2rem] p-6 md:p-8 flex flex-col relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      
      <div className="flex justify-between items-center mb-10 relative">
        <h2 className="text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary flex items-center gap-3">
          <Calendar className="w-8 h-8 text-primary" /> {t('planner')}
        </h2>
        <div className="bg-secondary/40 px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-foreground/40">
           {new Date().toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { day: 'numeric', month: 'long' })}
        </div>
      </div>
      
      <div className="flex-1 relative">
        {/* Timeline Path */}
        <div className="absolute top-0 bottom-0 left-[4.5rem] w-1 bg-secondary/50 md:left-[5.5rem] rtl:right-[4.5rem] rtl:md:right-[5.5rem] rounded-full"></div>
        
        <div className="space-y-8">
          {hours.map((slot, i) => (
            <div key={i} className="flex items-start gap-6 relative z-10 group">
              {/* Time Section */}
              <div className="w-16 md:w-20 text-right flex flex-col items-end shrink-0 pt-2 transition-transform group-hover:scale-110">
                <span className="font-black text-lg text-foreground/80 leading-none">{slot.time}</span>
                <span className="text-[10px] text-foreground/30 font-black uppercase tracking-tighter mt-1">{language === 'ar' ? slot.label : slot.enLabel}</span>
              </div>
              
              {/* Indicator Node */}
              <div className="relative mt-3 shrink-0">
                <div className={`w-5 h-5 rounded-full border-4 z-10 relative shadow-sm transition-all duration-500 ${slot.type !== 'empty' ? 'bg-primary border-white scale-110' : 'bg-background border-secondary group-hover:border-primary/40'}`}>
                   {slot.type !== 'empty' && <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>}
                </div>
              </div>

              {/* Event Card */}
              <div className="flex-1">
                {editingIndex === i ? (
                  <div className="flex gap-3 bg-white dark:bg-card p-4 rounded-2xl border-2 border-primary shadow-2xl animate-in zoom-in-95">
                    <input 
                      autoFocus
                      type="text" 
                      value={tempTitle}
                      onChange={(e) => setTempTitle(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && saveEvent(i)}
                      placeholder={language === 'ar' ? 'اكتب الموعد هنا...' : 'Type event name...'}
                      className="flex-1 bg-secondary/20 p-3 rounded-xl border-0 outline-none font-bold text-sm"
                    />
                    <button onClick={() => saveEvent(i)} className="bg-primary text-white p-3 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg"><Check className="w-5 h-5"/></button>
                    <button onClick={() => setEditingIndex(null)} className="bg-secondary p-3 rounded-xl hover:scale-105 active:scale-95 transition-all"><X className="w-5 h-5"/></button>
                  </div>
                ) : (
                  <div 
                    onClick={() => startEditing(i, slot.title)}
                    className={`flex-1 p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group/card
                      ${slot.type !== 'empty' 
                        ? 'bg-white shadow-lg border-primary/10 dark:bg-card/80 hover:translate-x-2' 
                        : 'border-dashed border-secondary hover:border-primary/50 flex items-center justify-center min-h-[4.5rem] hover:bg-primary/5'}`}
                  >
                    {slot.type !== 'empty' ? (
                      <div className="flex justify-between items-center w-full">
                        <h4 className="font-black text-[16px] text-foreground/80 tracking-tight">{language === 'ar' ? slot.title : slot.enTitle}</h4>
                        <div className="flex gap-2 opacity-0 group-hover/card:opacity-100 transition-opacity">
                           <button onClick={(e) => { e.stopPropagation(); clearEvent(i); }} className="p-2 text-foreground/20 hover:text-red-500 transition-colors"><X className="w-4 h-4"/></button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-primary/40 group-hover:text-primary transition-colors">
                        <Plus className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest leading-none">{language === 'ar' ? 'إضافة موعد' : 'Add Event'}</span>
                      </div>
                    )}
                    {slot.type !== 'empty' && (
                      <div className="absolute top-0 bottom-0 left-0 w-1 bg-primary/20 rtl:left-auto rtl:right-0 opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                    )}
                  </div>
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
