import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Plus, X, Check, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Planner = () => {
  const { t, language } = useAppContext();
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
    <div className={`flex-1 w-full flex flex-col relative transition-all duration-1000 ease-out ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      
      {/* Ambient Orbs */}
      <div className="absolute top-[0%] left-[20%] w-[40rem] h-[40rem] bg-gradient-to-br from-blue-400/10 via-primary/5 to-transparent rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />

      {/* Elegant Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 relative z-10 px-2 md:px-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-foreground/90 flex items-center gap-4 mb-3">
            {t('planner')}
            <Calendar className="w-8 h-8 text-primary opacity-80" />
          </h2>
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-foreground/40 font-bold ml-1">
             {language === 'ar' ? 'نظمي وقتك بأناقة' : 'Organize your day elegantly'}
          </p>
        </div>
        
        <div className="flex items-center gap-3 bg-white/40 dark:bg-card/40 backdrop-blur-2xl px-6 py-3 rounded-full border border-white/60 shadow-sm">
           <Clock className="w-4 h-4 text-primary" />
           <span className="text-[10px] font-bold text-foreground/70 uppercase tracking-widest">
             {new Date().toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
           </span>
        </div>
      </div>
      
      <div className="flex-1 relative px-2 md:px-6 z-10">
        
        <div className="bg-gradient-to-br from-white/70 to-white/30 dark:from-card/70 dark:to-card/30 rounded-[3rem] p-8 md:p-12 border border-white/60 shadow-[0_32px_64px_rgba(0,0,0,0.06)] backdrop-blur-3xl relative overflow-hidden">
          
          {/* Internal Timeline Glowing Path */}
          <div className="absolute top-12 bottom-12 left-[6rem] md:left-[7.5rem] rtl:right-[6rem] rtl:md:right-[7.5rem] w-[2px] bg-gradient-to-b from-primary/5 via-primary/20 to-primary/5 rounded-full z-0 hidden sm:block"></div>

          <div className="space-y-6 md:space-y-8 relative z-10">
            {hours.map((slot, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-8 relative group animate-in slide-in-from-bottom-4" style={{ animationDelay: `${i * 100}ms` }}>
                
                {/* Time Display */}
                <div className="w-24 md:w-28 text-left sm:text-right rtl:sm:text-left flex flex-row sm:flex-col items-center sm:items-end shrink-0 pt-2 transition-transform duration-500 group-hover:scale-105 gap-2 sm:gap-0">
                  <span className="font-serif text-2xl md:text-3xl text-foreground/80 tracking-tight">{slot.time}</span>
                  <span className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] sm:mt-1">{language === 'ar' ? slot.label : slot.enLabel}</span>
                </div>
                
                {/* Glowing Node on Timeline */}
                <div className="hidden sm:block relative mt-2 shrink-0 z-10">
                  <div className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-700 ease-out 
                    ${slot.type !== 'empty' 
                      ? 'bg-primary border-white scale-125 shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]' 
                      : 'bg-white dark:bg-black border-foreground/20 group-hover:border-primary/50'}`}>
                  </div>
                </div>

                {/* Event Glass Bento Block */}
                <div className="flex-1 w-full">
                  {editingIndex === i ? (
                    <div className="flex gap-3 bg-white/90 dark:bg-card/90 p-3 rounded-[2rem] border border-primary shadow-[0_16px_48px_rgba(var(--primary-rgb),0.15)] backdrop-blur-3xl animate-in zoom-in-95">
                      <input 
                        autoFocus
                        type="text" 
                        value={tempTitle}
                        onChange={(e) => setTempTitle(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && saveEvent(i)}
                        placeholder={language === 'ar' ? 'اكتب الموعد هنا...' : 'Type event name...'}
                        className="flex-1 bg-transparent px-6 py-3 border-0 outline-none font-serif text-xl placeholder:text-foreground/30 text-foreground"
                      />
                      <button onClick={() => saveEvent(i)} className="bg-primary text-white p-4 rounded-[1.5rem] hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all shadow-md"><Check className="w-5 h-5"/></button>
                      <button onClick={() => setEditingIndex(null)} className="bg-secondary/50 p-4 rounded-[1.5rem] hover:bg-secondary hover:scale-105 active:scale-95 transition-all"><X className="w-5 h-5 text-foreground/60"/></button>
                    </div>
                  ) : (
                    <div 
                      onClick={() => startEditing(i, slot.title)}
                      className={`flex-1 p-6 md:p-8 rounded-[2rem] border transition-all duration-500 cursor-pointer relative overflow-hidden group/card
                        ${slot.type !== 'empty' 
                          ? 'bg-white/60 dark:bg-black/20 shadow-[0_8px_32px_rgba(0,0,0,0.03)] border-white/80 hover:border-white hover:shadow-[0_16px_48px_rgba(0,0,0,0.06)] hover:-translate-y-1' 
                          : 'border border-dashed border-foreground/10 hover:border-primary/30 flex items-center min-h-[5rem] hover:bg-white/20'}`}
                    >
                      {slot.type !== 'empty' ? (
                        <div className="flex justify-between items-center w-full relative z-10">
                          <h4 className="font-serif text-xl md:text-2xl text-foreground/90 tracking-tight">{language === 'ar' ? slot.title : slot.enTitle}</h4>
                          <button onClick={(e) => { e.stopPropagation(); clearEvent(i); }} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/50 border border-white/50 opacity-0 group-hover/card:opacity-100 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all duration-300 shadow-sm text-foreground/40 translate-x-4 group-hover/card:translate-x-0"><X className="w-4 h-4"/></button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 text-foreground/30 group-hover/card:text-primary transition-colors">
                          <div className="w-8 h-8 rounded-full border border-current flex items-center justify-center border-dashed group-hover/card:border-solid">
                            <Plus className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] leading-none">{language === 'ar' ? 'إضافة موعد' : 'Add Event'}</span>
                        </div>
                      )}
                      
                      {/* Premium Side Accent */}
                      {slot.type !== 'empty' && (
                        <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-gradient-to-b from-primary to-accent rtl:left-auto rtl:right-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planner;
