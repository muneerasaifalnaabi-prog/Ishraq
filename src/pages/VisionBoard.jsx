import React, { useState } from 'react';
import { Image, Plus, Sparkles, X, Heart, Trash2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const VisionBoard = () => {
  const { t, language } = useAppContext();

  const [visionItems, setVisionItems] = useState([
    { id: 1, img: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=400', title: 'السفر حول العالم', enTitle: 'Travel the World', size: 'large' },
    { id: 2, img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400', title: 'صحة ورشاقة', enTitle: 'Health & Fitness', size: 'small' },
    { id: 3, img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=400', title: 'منزل الأحلام', enTitle: 'Dream Home', size: 'medium' },
  ]);

  const addVision = () => {
    const images = [
      'https://images.unsplash.com/photo-1441759430827-8942a78dff51?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1518173946687-a4c8a9833d8e?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=400'
    ];
    const titles = language === 'ar' ? ['هدوء', 'طبيعة', 'نجاح'] : ['Calm', 'Nature', 'Success'];
    
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
    <div className="flex-1 glass rounded-[2rem] p-6 md:p-10 flex flex-col relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-8 relative">
        <h2 className="text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary flex items-center gap-4">
          <Image className="w-9 h-9 text-primary" /> {t('vision')}
        </h2>
        <button 
          onClick={addVision}
          className="bg-primary text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" /> {language === 'ar' ? 'إضافة إلهام' : 'Add Inspiration'}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1 auto-rows-[150px]">
        {visionItems.map((item) => (
          <div 
            key={item.id} 
            className={`relative rounded-[2.5rem] overflow-hidden group shadow-xl transition-all duration-700 hover:scale-[1.02] hover:z-20 border-4 border-white
              ${item.size === 'large' ? 'col-span-2 row-span-2' : item.size === 'medium' ? 'col-span-2 row-span-1' : 'col-span-1 row-span-1'}`}
          >
            <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
               <div className="flex justify-between items-end">
                  <div className="animate-in slide-in-from-bottom-4 duration-500">
                     <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50 mb-2 block">{language === 'ar' ? 'هدفي' : 'MY GOAL'}</span>
                     <h3 className="text-white text-xl font-black tracking-tight">{language === 'ar' ? item.title : item.enTitle}</h3>
                  </div>
                  <div className="flex gap-2">
                     <button className="bg-white/20 p-3 rounded-xl hover:bg-pink-500 transition-colors backdrop-blur-md">
                        <Heart className="w-5 h-5 text-white" />
                     </button>
                     <button onClick={() => removeVision(item.id)} className="bg-white/20 p-3 rounded-xl hover:bg-red-500 transition-colors backdrop-blur-md">
                        <Trash2 className="w-5 h-5 text-white" />
                     </button>
                  </div>
               </div>
            </div>
            {/* Glossy Overlay */}
            <div className="absolute inset-0 pointer-events-none glass-shine opacity-10"></div>
          </div>
        ))}
        
        {/* Placeholder Tile */}
        <div 
          onClick={addVision}
          className="col-span-1 row-span-1 border-4 border-dashed border-primary/20 rounded-[2.5rem] flex flex-col items-center justify-center p-6 bg-primary/5 hover:bg-primary/10 cursor-pointer group transition-all"
        >
           <Sparkles className="w-10 h-10 text-primary/30 group-hover:scale-125 transition-transform duration-500 mb-4" />
           <span className="text-[8px] font-black uppercase tracking-[0.3em] text-primary/40 group-hover:text-primary transition-colors text-center">{language === 'ar' ? 'مساحة للإلهام' : 'Add New'}</span>
        </div>
      </div>

      <div className="mt-12 p-8 bg-white/40 dark:bg-card/40 rounded-[2.5rem] border border-primary/5 shadow-inner backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
         <p className="text-sm font-bold text-foreground/40 italic text-center md:text-right">
            {language === 'ar' ? "تخيلي مستقبلك، ثم ابنيه خطوة بخطوة." : "Imagine your future, then build it step by step."}
         </p>
         <div className="flex -space-x-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-md">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+10}`} alt="user" />
              </div>
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-white bg-primary text-white flex items-center justify-center text-[10px] font-black">+2k</div>
         </div>
      </div>
    </div>
  );
};

export default VisionBoard;
