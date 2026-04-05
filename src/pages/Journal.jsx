import React, { useState, useEffect } from 'react';
import { PenLine, Book, Sparkles, Plus, Save, Calendar, Heart, X, Check } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { journalService } from '../services/api';

const Journal = () => {
  const { t, language } = useAppContext();
  
  const [title, setTitle] = useState('');
  const [entry, setEntry] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);
  const [pastEntries, setPastEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    journalService.getEntries().then(data => {
      setPastEntries(data || []);
      setIsLoading(false);
    });
  }, []);

  const emojis = ['😢', '😐', '😊', '😍', '🤩'];

  const saveEntry = async () => {
    if (!title && !entry) return;
    
    const newEntry = {
      date: new Date().toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      title: title || (language === 'ar' ? 'بدون عنوان' : 'Untitled'),
      mood: selectedMood !== null ? emojis[selectedMood] : '',
      text: entry
    };

    const savedEntry = await journalService.addEntry(newEntry);
    setPastEntries(prev => [savedEntry, ...prev]);
    setTitle('');
    setEntry('');
    setSelectedMood(null);
  };

  return (
    <div className="flex-1 glass rounded-[2rem] p-6 md:p-10 flex flex-col relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="flex justify-between items-center mb-10 relative">
        <h2 className="text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary flex items-center gap-3">
          <PenLine className="w-8 h-8 text-primary" /> {language === 'ar' ? 'يومياتي' : 'My Journal'}
        </h2>
        <div className="flex items-center gap-2 bg-primary/10 px-6 py-2 rounded-2xl border border-primary/5 shadow-sm">
           <Calendar className="w-4 h-4 text-primary" />
           <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{language === 'ar' ? 'اليوم' : 'Today'}</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12 flex-1 relative">
        {/* Sidebar: Past Entries */}
        <div className="lg:col-span-1 flex flex-col gap-8 h-full">
           <div className="bg-white/40 dark:bg-card/40 rounded-[2.5rem] p-8 border border-primary/10 shadow-2xl backdrop-blur-xl flex-1 flex flex-col">
              <h3 className="text-lg font-black mb-8 flex items-center justify-between opacity-80 uppercase tracking-widest">
                 {language === 'ar' ? 'المذكرات السابقة' : 'Past Entries'}
                 <Book className="w-5 h-5 text-primary opacity-30" />
              </h3>
              <div className="space-y-5 overflow-y-auto pr-2 custom-scrollbar flex-1">
                 {pastEntries.map((e, i) => (
                   <div key={i} className="p-6 rounded-[2rem] bg-white/60 dark:bg-card/40 border border-primary/5 hover:border-primary/40 transition-all cursor-pointer group hover:translate-x-2">
                      <div className="flex justify-between items-start mb-2">
                         <span className="text-[9px] font-black text-primary/40 uppercase tracking-widest">{e.date}</span>
                         <span className="text-lg">{e.mood}</span>
                      </div>
                      <h4 className="font-black text-base text-foreground/70 tracking-tight leading-tight">{e.title}</h4>
                   </div>
                 ))}
                 {pastEntries.length === 0 && <p className="text-center opacity-20 text-xs py-10 uppercase tracking-widest">{language === 'ar' ? 'لا توجد مذكرات' : 'No Entries Yet'}</p>}
              </div>
           </div>
           
           {/* Inspiration Card */}
           <div className="bg-gradient-to-br from-primary to-accent rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
              <Sparkles className="w-10 h-10 mb-6 opacity-80 group-hover:scale-125 transition-transform duration-500" />
              <p className="text-sm font-bold opacity-90 leading-relaxed italic relative z-10 transition-all">
                {language === 'ar' ? "الكتابة تفرغ العقل من القلق وتملأ الروح بالسلام." : "Writing empties the mind of anxiety and fills the soul with peace."}
              </p>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-y-1/2 translate-x-1/2"></div>
           </div>
        </div>

        {/* Editor Section */}
        <div className="lg:col-span-2 flex flex-col gap-8">
           <div className="bg-white/50 dark:bg-card/50 rounded-[3rem] p-10 border border-white shadow-[0_32px_64px_-15px_rgba(0,0,0,0.05)] flex-1 flex flex-col backdrop-blur-3xl ring-1 ring-black/[0.02]">
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={language === 'ar' ? 'أضيفي عنواناً لمذكرتك اليوم...' : 'Title your thought for today...'}
                className="w-full bg-transparent border-0 text-3xl font-black mb-8 placeholder:text-foreground/10 outline-none focus:ring-0 tracking-tight"
              />
              <textarea 
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                placeholder={language === 'ar' ? 'اكتبي مشاعرك وأفكارك هنا بكل هدوء...' : 'Write your feelings and thoughts here calmly...'}
                className="flex-1 w-full bg-transparent border-0 text-xl font-bold leading-relaxed placeholder:text-foreground/10 outline-none focus:ring-0 resize-none pb-12 custom-scrollbar"
              />
              
              <div className="flex flex-col md:flex-row justify-between items-center py-8 border-t border-primary/5 mt-auto gap-8">
                 <div className="flex flex-col gap-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40">{language === 'ar' ? 'مزاج اللحظة:' : 'Moment Mood:'}</span>
                    <div className="flex gap-4">
                       {emojis.map((emoji, i) => (
                         <button 
                           key={i} 
                           onClick={() => setSelectedMood(i)}
                           className={`text-3xl transition-all hover:scale-125 ${selectedMood === i ? 'scale-150 drop-shadow-xl opacity-100' : 'opacity-40 grayscale hover:grayscale-0'}`}
                         >
                           {emoji}
                         </button>
                       ))}
                    </div>
                 </div>
                 <button 
                   onClick={saveEntry}
                   className="bg-primary text-primary-foreground px-12 py-5 rounded-3xl font-black text-sm shadow-2xl shadow-primary/30 flex items-center gap-3 hover:bg-primary/95 transition-all hover:scale-105 active:scale-95 group"
                 >
                    <Save className="w-5 h-5 group-hover:rotate-12 transition-transform" /> 
                    {language === 'ar' ? 'حفظ الذكرى' : 'Save Memory'}
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;
