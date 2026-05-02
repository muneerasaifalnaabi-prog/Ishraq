import React, { useState, useEffect } from 'react';
import { PenLine, Book, Sparkles, Save, Calendar, Feather } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { journalService } from '../services/api';

const Journal = () => {
  const { t, language } = useAppContext();
  const [animateIn, setAnimateIn] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimateIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

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

  const emojis = [
    { icon: '😢', label: language === 'ar' ? 'حزين' : 'Sad' },
    { icon: '😐', label: language === 'ar' ? 'عادي' : 'Okay' },
    { icon: '😊', label: language === 'ar' ? 'سعيد' : 'Happy' },
    { icon: '😍', label: language === 'ar' ? 'ممتن' : 'Grateful' },
    { icon: '🤩', label: language === 'ar' ? 'متحمس' : 'Excited' }
  ];

  const saveEntry = async () => {
    if (!title && !entry) return;
    
    const newEntry = {
      date: new Date().toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      title: title || (language === 'ar' ? 'بدون عنوان' : 'Untitled'),
      mood: selectedMood !== null ? emojis[selectedMood].icon : '',
      text: entry
    };

    const savedEntry = await journalService.addEntry(newEntry);
    setPastEntries(prev => [savedEntry, ...prev]);
    setTitle('');
    setEntry('');
    setSelectedMood(null);
  };

  return (
    <div className={`flex-1 w-full flex flex-col relative transition-all duration-1000 ease-out ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      
      {/* Background Ambience */}
      <div className="absolute top-[0%] left-[10%] w-[40rem] h-[40rem] bg-gradient-to-br from-primary/10 via-rose-400/5 to-transparent rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[35rem] h-[35rem] bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-[100px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />

      {/* Elegant Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 relative z-10 px-2 md:px-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-foreground/90 flex items-center gap-4 mb-3">
            {language === 'ar' ? 'يومياتي' : 'My Journal'}
            <Feather className="w-8 h-8 text-primary opacity-80" />
          </h2>
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-foreground/40 font-bold ml-1">
             {language === 'ar' ? 'مساحتك الآمنة للتأمل' : 'Your safe space to reflect'}
          </p>
        </div>
        
        <div className="flex items-center gap-3 bg-white/40 dark:bg-card/40 backdrop-blur-2xl px-6 py-3 rounded-full border border-white/60 shadow-sm">
           <Calendar className="w-4 h-4 text-primary" />
           <span className="text-[10px] font-bold text-foreground/70 uppercase tracking-widest">{language === 'ar' ? 'اليوم' : 'Today'}</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 flex-1 relative z-10 px-2 md:px-6">
        
        {/* Left Sidebar: Past Entries & Inspiration (Spans 4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-8 h-full">
           <div className="bg-gradient-to-br from-white/70 to-white/30 dark:from-card/70 dark:to-card/30 rounded-[2.5rem] p-8 border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-3xl flex-1 flex flex-col relative overflow-hidden group hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] transition-all duration-500">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-[60px] pointer-events-none group-hover:scale-150 transition-transform duration-1000"></div>
              
              <h3 className="text-[10px] font-bold mb-8 flex items-center justify-between text-foreground/40 uppercase tracking-[0.3em] relative z-10">
                 {language === 'ar' ? 'المذكرات السابقة' : 'Past Entries'}
                 <Book className="w-4 h-4 opacity-50" />
              </h3>
              
              <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1 relative z-10">
                 {pastEntries.map((e, i) => (
                   <div 
                     key={i} 
                     className="p-5 rounded-[1.5rem] bg-white/40 dark:bg-black/20 border border-white/50 hover:border-primary/30 transition-all duration-300 cursor-pointer hover:bg-white/60 dark:hover:bg-white/5 hover:shadow-sm group/item hover:-translate-y-1 animate-in slide-in-from-left-4"
                     style={{ animationDelay: `${i * 100}ms` }}
                   >
                      <div className="flex justify-between items-start mb-3">
                         <span className="text-[9px] font-bold text-primary uppercase tracking-[0.2em]">{e.date}</span>
                         <span className="text-xl filter drop-shadow-sm group-hover/item:scale-110 transition-transform">{e.mood}</span>
                      </div>
                      <h4 className="font-serif text-lg text-foreground/80 tracking-tight leading-tight group-hover/item:text-foreground transition-colors">{e.title}</h4>
                   </div>
                 ))}
                 {pastEntries.length === 0 && !isLoading && (
                   <div className="flex flex-col items-center justify-center py-12 opacity-40">
                      <Book className="w-12 h-12 mb-4" strokeWidth={1} />
                      <p className="text-[10px] uppercase tracking-[0.3em] text-center">
                        {language === 'ar' ? 'ابدئي كتابة قصتك' : 'Start your story'}
                      </p>
                   </div>
                 )}
              </div>
           </div>
           
           {/* Inspiration Card */}
           <div className="bg-[#0f172a] rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
              <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-primary/30 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/50 transition-colors duration-1000"></div>
              
              <Sparkles className="w-8 h-8 mb-6 text-white/80 group-hover:scale-125 transition-transform duration-500 relative z-10" />
              <p className="text-lg md:text-xl font-serif text-white/90 leading-relaxed italic relative z-10">
                {language === 'ar' ? "« الكتابة تفرغ العقل من القلق وتملأ الروح بالسلام. »" : "“Writing empties the mind of anxiety and fills the soul with peace.”"}
              </p>
           </div>
        </div>

        {/* Editor Section (Spans 8 cols) */}
        <div className="lg:col-span-8 flex flex-col h-full animate-in fade-in slide-in-from-bottom-8 duration-700">
           <div className="bg-gradient-to-br from-white/90 to-white/60 dark:from-card/90 dark:to-card/60 rounded-[3rem] p-8 md:p-12 border border-white/80 shadow-[0_32px_64px_rgba(0,0,0,0.06)] flex-1 flex flex-col backdrop-blur-3xl relative">
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={language === 'ar' ? 'عنوان مذكرتك...' : 'Title your thought...'}
                className="w-full bg-transparent border-0 text-4xl md:text-5xl font-serif mb-8 placeholder:text-foreground/20 text-foreground/90 outline-none focus:ring-0 tracking-tight"
              />
              <textarea 
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                placeholder={language === 'ar' ? 'اكتبي مشاعرك وأفكارك هنا بكل هدوء...' : 'Write your feelings and thoughts here calmly...'}
                className="flex-1 w-full bg-transparent border-0 text-xl font-medium leading-relaxed text-foreground/80 placeholder:text-foreground/20 outline-none focus:ring-0 resize-none pb-12 custom-scrollbar"
              />
              
              <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center py-8 border-t border-black/5 dark:border-white/5 mt-auto gap-8 relative z-10">
                 <div className="flex flex-col gap-5 w-full xl:w-auto">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/40">{language === 'ar' ? 'مزاج اللحظة' : 'Moment Mood'}</span>
                    <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-2 custom-scrollbar">
                       {emojis.map((emoji, i) => (
                         <button 
                           key={i} 
                           onClick={() => setSelectedMood(i)}
                           className={`group flex flex-col items-center gap-2 min-w-[60px] transition-all duration-300`}
                         >
                           <div className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl transition-all duration-300 ${selectedMood === i ? 'bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] scale-110 border border-white' : 'bg-transparent hover:bg-white/50 grayscale hover:grayscale-0'}`}>
                             {emoji.icon}
                           </div>
                           <span className={`text-[8px] font-bold uppercase tracking-[0.2em] transition-opacity duration-300 ${selectedMood === i ? 'opacity-100 text-primary' : 'opacity-0 group-hover:opacity-40'}`}>
                             {emoji.label}
                           </span>
                         </button>
                       ))}
                    </div>
                 </div>
                 
                 <button 
                   onClick={saveEntry}
                   disabled={!title && !entry}
                   className="w-full xl:w-auto bg-foreground text-background px-10 py-5 rounded-full font-bold text-[10px] uppercase tracking-[0.3em] shadow-[0_8px_30px_rgba(0,0,0,0.15)] flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed group"
                 >
                    <Save className="w-5 h-5 group-hover:scale-110 transition-transform duration-500" /> 
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
