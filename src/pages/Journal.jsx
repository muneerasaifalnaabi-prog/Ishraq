import React, { useState } from 'react';
import { PenLine, Book, Sparkles, Plus, Save, Calendar } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Journal = () => {
  const { t, language } = useAppContext();
  const [entry, setEntry] = useState('');

  const pastEntries = [
    { date: '04 Apr 2024', title: 'بداية شهر جديدة بصحة جيدة' },
    { date: '03 Apr 2024', title: 'إنجاز التقرير الشهري بنجاح' },
  ];

  return (
    <div className="flex-1 glass rounded-3xl p-8 flex flex-col h-full overflow-hidden">
      <div className="flex justify-between items-center mb-10 text-primary">
        <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary flex items-center gap-3">
          <PenLine className="w-8 h-8 text-primary" /> {language === 'ar' ? 'يومياتي' : 'My Journal'}
        </h2>
        <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-2xl">
           <Calendar className="w-5 h-5 text-primary" />
           <span className="text-sm font-black text-primary uppercase tracking-widest">{language === 'ar' ? 'اليوم' : 'Today'}</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10 flex-1 overflow-hidden h-full pb-6">
        {/* Sidebar: Past Entries */}
        <div className="lg:col-span-1 space-y-6 flex flex-col h-full overflow-hidden">
           <div className="bg-white/40 dark:bg-card/40 rounded-[2.5rem] p-6 border border-primary/20 shadow-xl relative overflow-hidden flex-1 overflow-y-auto">
              <h3 className="text-lg font-black mb-6 flex items-center justify-between">
                 {language === 'ar' ? 'المذكرات السابقة' : 'Past Entries'}
                 <Book className="w-5 h-5 text-primary opacity-40 ml-1" />
              </h3>
              <div className="space-y-4">
                 {pastEntries.map((e, i) => (
                   <div key={i} className="p-4 rounded-3xl bg-white/60 dark:bg-card/40 border border-primary/5 hover:border-primary/40 transition-all cursor-pointer group hover:scale-[1.02]">
                      <span className="text-[10px] font-black text-primary/40 uppercase tracking-widest block mb-1">{e.date}</span>
                      <h4 className="font-black text-sm tracking-tight">{e.title}</h4>
                   </div>
                 ))}
              </div>
           </div>
           {/* Inspiration Card */}
           <div className="bg-gradient-to-br from-primary to-accent rounded-[2.5rem] p-6 text-white shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center">
              <Sparkles className="w-10 h-10 mb-4 opacity-80" />
              <p className="text-sm font-bold opacity-90 leading-relaxed italic">{language === 'ar' ? "الكتابة تفرغ العقل من القلق وتملأ الروح بالسلام." : "Writing empties the mind of anxiety and fills the soul with peace."}</p>
           </div>
        </div>

        {/* Editor Section */}
        <div className="lg:col-span-2 flex flex-col h-full gap-6">
           <div className="bg-white/40 dark:bg-card/40 rounded-[2.5rem] p-8 border border-primary/20 shadow-xl flex-1 flex flex-col backdrop-blur-2xl">
              <input 
                type="text" 
                placeholder={language === 'ar' ? 'أضيفي عنواناً لمذكرتك اليوم...' : 'Title your thought for today...'}
                className="w-full bg-transparent border-0 text-2xl font-black mb-6 placeholder:text-foreground/20 outline-none focus:ring-0"
              />
              <textarea 
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                placeholder={language === 'ar' ? 'اكتبي مشاعرك وأفكارك هنا بكل هدوء...' : 'Write your feelings and thoughts here calmly...'}
                className="flex-1 w-full bg-transparent border-0 text-lg font-bold leading-relaxed placeholder:text-foreground/20 outline-none focus:ring-0 resize-none pb-10"
              />
              
              <div className="flex justify-between items-center py-4 border-t border-primary/5 mt-auto">
                 <div className="flex gap-4">
                    <button className="text-foreground/30 hover:text-primary transition-all font-black text-xs uppercase tracking-widest">+ Add Task Reference</button>
                    <button className="text-foreground/30 hover:text-primary transition-all font-black text-xs uppercase tracking-widest">+ Add Mood</button>
                 </div>
                 <button className="bg-primary text-primary-foreground px-10 py-4 rounded-3xl font-black text-sm shadow-xl flex items-center gap-2 hover:bg-primary/90 transition-all hover:scale-105 active:scale-95">
                    <Save className="w-4 h-4" /> {language === 'ar' ? 'حفظ' : 'Save'}
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;
