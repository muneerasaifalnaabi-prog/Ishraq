import React from 'react';
import { Heart, Sparkles, CalendarHeart, Droplets } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Wellness = () => {
  const { t, language } = useAppContext();

  return (
    <div className="flex-1 glass rounded-3xl p-8 flex flex-col overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary flex items-center gap-3">
          <Heart className="w-8 h-8 text-primary" /> {t('wellness')}
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Period Tracker Section */}
        <section className="bg-white/40 dark:bg-card/40 p-6 rounded-3xl border border-primary/20 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl"></div>
          <div className="flex items-center gap-3 mb-6 relative">
            <Droplets className="w-6 h-6 text-pink-500" />
            <h3 className="text-xl font-bold text-pink-500">{language === 'ar' ? 'تتبع الدورة' : 'Period Tracker'}</h3>
          </div>
          
          <div className="text-center py-6 bg-pink-50 dark:bg-pink-900/10 rounded-2xl mb-6 border border-pink-100 dark:border-pink-900/30">
            <p className="text-sm font-semibold text-pink-600/70 mb-1">{language === 'ar' ? 'اليوم' : 'Day'}</p>
            <p className="text-5xl font-black text-pink-500 mb-2">14</p>
            <p className="text-sm font-medium text-pink-600/80">
               {language === 'ar' ? 'مرحلة التبويض - طاقتك مرتفعة!' : 'Ovulation Phase - High Energy!'}
            </p>
          </div>

          <button className="w-full py-4 bg-pink-500 hover:bg-pink-600 text-white rounded-2xl font-bold transition-colors shadow-sm">
             {language === 'ar' ? 'تسجيل الأعراض' : 'Log Symptoms'}
          </button>
        </section>

        {/* Self Care Section */}
        <section className="bg-white/40 dark:bg-card/40 p-6 rounded-3xl border border-primary/20 shadow-sm">
           <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold text-primary">{language === 'ar' ? 'العناية الذاتية' : 'Self-Care'}</h3>
          </div>

          <div className="space-y-4">
             <div className="p-4 bg-background/50 rounded-2xl shadow-sm border border-secondary flex justify-between items-center cursor-pointer hover:border-primary/40 transition-colors">
                <span className="font-semibold">{language === 'ar' ? 'روتين الصباح ☀️' : 'Morning Routine ☀️'}</span>
                <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-bold">4 steps</span>
             </div>
             <div className="p-4 bg-background/50 rounded-2xl shadow-sm border border-secondary flex justify-between items-center cursor-pointer hover:border-primary/40 transition-colors">
                <span className="font-semibold">{language === 'ar' ? 'روتين المساء 🌙' : 'Evening Routine 🌙'}</span>
                <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-bold">5 steps</span>
             </div>
             <div className="p-4 bg-primary/10 rounded-2xl shadow-sm border border-primary/20 flex flex-col justify-center items-center cursor-pointer hover:bg-primary/20 transition-colors mt-6 py-8 border-dashed">
                <CalendarHeart className="w-8 h-8 text-primary mb-2 opacity-80" />
                <span className="font-bold text-primary">{language === 'ar' ? 'تحدي حب الذات لمدة 30 يوم' : '30-Day Self-Love Challenge'}</span>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Wellness;
