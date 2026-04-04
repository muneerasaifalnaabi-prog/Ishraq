import React from 'react';
import { LayoutGrid, Target, Plus, ImageIcon, Heart, Star, Compass } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const VisionBoard = () => {
  const { t, language } = useAppContext();

  const visionItems = [
    { title: language === 'ar' ? 'رحلة الأحلام' : 'Dream Journey', icon: Compass, color: 'bg-blue-400' },
    { title: language === 'ar' ? 'بيت المستقبل' : 'Future Home', icon: Heart, color: 'bg-primary' },
    { title: language === 'ar' ? 'النمو المهني' : 'Career Growth', icon: Star, color: 'bg-yellow-400' },
    { title: language === 'ar' ? 'صحة العقل' : 'Mind Wellness', icon: Target, color: 'bg-orange-400' },
  ];

  return (
    <div className="flex-1 glass rounded-3xl p-8 flex flex-col h-full overflow-hidden">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary flex items-center gap-3">
          <LayoutGrid className="w-8 h-8 text-primary" /> {language === 'ar' ? 'لوحة الأهداف' : 'Vision Board'}
        </h2>
        <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-2xl font-black text-sm shadow-xl flex items-center gap-2 hover:scale-105 transition-all">
           <Plus className="w-5 h-5" /> {language === 'ar' ? 'إضافة هدف' : 'Add Goal'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-1 overflow-y-auto pr-2 pb-6">
        {visionItems.map((v, i) => (
          <div key={i} className="bg-white/40 dark:bg-card/40 aspect-[3/4] rounded-[3rem] border border-primary/10 shadow-2xl overflow-hidden relative group cursor-pointer transition-all hover:scale-[1.02] flex flex-col">
             <div className={`flex-1 ${v.color} opacity-20 relative flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <v.icon className={`w-16 h-16 ${v.color.replace('bg-', 'text-')} fill-current opacity-40`} />
             </div>
             <div className="p-8 bg-white/60 dark:bg-card/60 backdrop-blur-md relative z-10">
                <div className="w-12 h-12 bg-white dark:bg-card rounded-2xl shadow-lg border border-primary/5 flex items-center justify-center mb-4 -mt-14 relative z-20">
                   <v.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-black text-lg mb-2 tracking-tight">{v.title}</h3>
                <p className="text-[10px] font-black text-primary/40 uppercase tracking-widest italic">{language === 'ar' ? 'رؤية عام 2024' : '2024 Vision'}</p>
                <div className="flex gap-2 mt-5">
                   <button className="p-2.5 bg-secondary/50 rounded-xl text-primary/40 hover:text-primary transition-all"><ImageIcon className="w-4 h-4" /></button>
                   <button className="p-2.5 bg-secondary/50 rounded-xl text-primary/40 hover:text-primary transition-all"><Plus className="w-4 h-4" /></button>
                </div>
             </div>
          </div>
        ))}
        {/* Empty Placeholder */}
        <div className="bg-secondary/10 border-2 border-dashed border-primary/20 aspect-[3/4] rounded-[3rem] flex flex-col items-center justify-center p-8 opacity-40 hover:opacity-100 transition-all cursor-pointer">
           <div className="w-16 h-16 rounded-3xl bg-secondary/30 flex items-center justify-center mb-4">
              <Plus className="w-10 h-10 text-primary/40" />
           </div>
           <p className="text-center font-black text-xs uppercase tracking-widest text-primary/40">{language === 'ar' ? 'أضيفي صورة ملهمة' : 'Add Inspiration'}</p>
        </div>
      </div>
    </div>
  );
};

export default VisionBoard;
