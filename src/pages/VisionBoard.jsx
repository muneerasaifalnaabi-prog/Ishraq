import React, { useState, useEffect } from 'react';
import { Image, Plus, Sparkles, X, Heart, Trash2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const VisionBoard = () => {
  const { t, language } = useAppContext();
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const [visionItems, setVisionItems] = useState([
    { id: 1, img: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=600', title: 'السفر حول العالم', enTitle: 'Travel the World', size: 'large' },
    { id: 2, img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400', title: 'صحة ورشاقة', enTitle: 'Health & Fitness', size: 'small' },
    { id: 3, img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=400', title: 'منزل الأحلام', enTitle: 'Dream Home', size: 'medium' },
  ]);

  const addVision = () => {
    const images = [
      'https://images.unsplash.com/photo-1441759430827-8942a78dff51?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1518173946687-a4c8a9833d8e?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=600'
    ];
    const titles = language === 'ar' ? ['هدوء عميق', 'طبيعة ساحرة', 'نجاح مهني'] : ['Deep Calm', 'Lush Nature', 'Career Success'];
    
    const randomImg = images[Math.floor(Math.random() * images.length)];
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];

    setVisionItems(prev => [...prev, {
      id: Date.now(),
      img: randomImg,
      title: randomTitle,
      enTitle: randomTitle,
      size: Math.random() > 0.5 ? 'medium' : 'small'
    }]);
  };

  const removeVision = (id) => {
    setVisionItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className={`flex-1 w-full flex flex-col relative transition-all duration-1000 ease-out ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-[-5%] w-[40rem] h-[40rem] bg-gradient-to-br from-primary/10 via-accent/5 to-transparent rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-gradient-to-tr from-rose-200/20 to-transparent rounded-full blur-[100px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 relative z-10 px-2 md:px-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-foreground/90 flex items-center gap-4 mb-3">
            {language === 'ar' ? 'لوحة الإلهام' : 'Vision Board'}
            <Image className="w-8 h-8 text-primary opacity-80" />
          </h2>
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-foreground/40 font-bold ml-1">
             {language === 'ar' ? 'بناء أحلامك خطوة بخطوة' : 'Manifest Your Dreams'}
          </p>
        </div>
        
        <button 
          onClick={addVision}
          className="bg-primary hover:bg-foreground text-white px-8 py-4 rounded-full font-bold uppercase text-[10px] tracking-[0.2em] shadow-[0_8px_20px_rgba(var(--primary-rgb),0.3)] hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-500 flex items-center gap-3 group"
        >
          <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" /> {language === 'ar' ? 'إضافة إلهام' : 'Add Inspiration'}
        </button>
      </div>

      {/* Masonry-Style Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 flex-1 auto-rows-[200px] relative z-10 p-2 md:p-6">
        {visionItems.map((item, index) => (
          <div 
            key={item.id} 
            className={`relative rounded-[2.5rem] overflow-hidden group shadow-[0_8px_32px_rgba(0,0,0,0.05)] transition-all duration-700 hover:shadow-[0_16px_48px_rgba(0,0,0,0.15)] hover:scale-[1.02] hover:z-20 border-[6px] border-white/60 dark:border-white/10 bg-white/20
              ${item.size === 'large' ? 'sm:col-span-2 sm:row-span-2' : item.size === 'medium' ? 'sm:col-span-2 sm:row-span-1' : 'col-span-1 row-span-1'}`}
          >
            <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1500ms] ease-out" />
            
            {/* Cinematic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
            
            <div className="absolute inset-0 flex flex-col justify-end p-8">
               <div className="flex justify-between items-end opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  <div>
                     <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/60 mb-2 block">{language === 'ar' ? 'رؤيتي' : 'My Vision'}</span>
                     <h3 className="text-white text-2xl font-serif tracking-tight drop-shadow-md">{language === 'ar' ? item.title : item.enTitle}</h3>
                  </div>
                  <div className="flex gap-2">
                     <button className="bg-white/10 hover:bg-pink-500 p-3 rounded-full border border-white/20 transition-colors duration-300 backdrop-blur-md text-white">
                        <Heart className="w-4 h-4" />
                     </button>
                     <button onClick={() => removeVision(item.id)} className="bg-white/10 hover:bg-red-500 p-3 rounded-full border border-white/20 transition-colors duration-300 backdrop-blur-md text-white">
                        <Trash2 className="w-4 h-4" />
                     </button>
                  </div>
               </div>
            </div>
          </div>
        ))}
        
        {/* Generative Placeholder Tile */}
        <div 
          onClick={addVision}
          className="col-span-1 row-span-1 border-[3px] border-dashed border-primary/30 rounded-[2.5rem] flex flex-col items-center justify-center p-8 bg-gradient-to-br from-primary/5 to-transparent hover:from-primary/10 hover:to-primary/5 cursor-pointer group transition-all duration-500 backdrop-blur-sm"
        >
           <div className="w-16 h-16 rounded-full bg-white/60 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)] transition-all duration-500">
             <Sparkles className="w-6 h-6 text-primary" />
           </div>
           <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/40 group-hover:text-primary transition-colors duration-300 text-center">{language === 'ar' ? 'مساحة للإلهام' : 'Add New'}</span>
        </div>
      </div>

      <div className="mx-2 md:mx-6 mt-6 p-8 md:p-10 bg-gradient-to-r from-[#0f172a] to-[#1e293b] rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
         <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
         <div className="absolute right-0 top-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none"></div>
         
         <p className="text-xl md:text-2xl font-serif text-white/90 italic text-center md:text-left relative z-10 leading-relaxed">
            {language === 'ar' ? "« تخيلي مستقبلك، ثم ابنيه خطوة بخطوة. »" : "“Imagine your future, then build it step by step.”"}
         </p>
         
         <div className="flex items-center gap-4 relative z-10">
            <div className="flex -space-x-4">
               {[1, 2, 3, 4].map(i => (
                 <div key={i} className="w-12 h-12 rounded-full border-[3px] border-[#1e293b] overflow-hidden shadow-lg hover:-translate-y-2 transition-transform duration-300">
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+15}&backgroundColor=b6e3f4`} alt="user" className="w-full h-full object-cover" />
                 </div>
               ))}
            </div>
            <div className="flex flex-col">
               <span className="text-white font-bold text-sm tracking-wide">+2k {language === 'ar' ? 'عضوة' : 'Members'}</span>
               <span className="text-white/50 text-[9px] uppercase tracking-[0.2em]">{language === 'ar' ? 'يشاركون أحلامهم' : 'Sharing dreams'}</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default VisionBoard;
