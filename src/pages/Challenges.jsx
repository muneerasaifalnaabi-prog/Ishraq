import React, { useState } from 'react';
import { Target, Trophy, Users, Timer, Sparkles, CheckCircle2, ArrowUpRight, Plus } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Challenges = () => {
  const { t, language } = useAppContext();

  const [activeChallenges, setActiveChallenges] = useState([
    { 
      id: 1, 
      name: '21 يوم بدون سكر', 
      enName: '21 Days No Sugar', 
      participants: 1240, 
      time: '12d left', 
      progress: 65, 
      joined: true,
      category: language === 'ar' ? 'صحة' : 'Health',
      color: 'from-blue-400 to-blue-600' 
    },
    { 
      id: 2, 
      name: 'تحدي القراءة اليومي', 
      enName: 'Daily Reading Hub', 
      participants: 856, 
      time: '5d left', 
      progress: 0, 
      joined: false,
      category: language === 'ar' ? 'عقل' : 'Mind',
      color: 'from-purple-400 to-purple-600' 
    }
  ]);

  const joinChallenge = (id) => {
    setActiveChallenges(prev => prev.map(c => c.id === id ? { ...c, joined: true, participants: c.participants + 1 } : c));
  };

  const categories = language === 'ar' 
    ? ['الكل', 'صحة', 'عقل', 'روتين'] 
    : ['All', 'Health', 'Mind', 'Routine'];

  return (
    <div className="flex-1 glass rounded-[2rem] p-6 md:p-10 flex flex-col relative">
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6 relative">
        <h2 className="text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary flex items-center gap-4">
          <Target className="w-9 h-9 text-primary" /> {t('challenges')}
        </h2>
        <div className="flex bg-secondary/50 p-1.5 rounded-2xl border border-secondary shadow-sm">
           {categories.map((cat, i) => (
             <button key={i} className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${i===0 ? 'bg-white text-primary shadow-md scale-105':'text-foreground/30 hover:text-foreground'}`}>
               {cat}
             </button>
           ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {activeChallenges.map((challenge) => (
          <div key={challenge.id} className="bg-white/40 dark:bg-card/40 p-8 rounded-[3rem] border border-white shadow-2xl backdrop-blur-3xl relative overflow-hidden group hover:translate-y-[-8px] transition-all duration-500 ring-1 ring-black/[0.01]">
            <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${challenge.color}`}></div>
            <div className="flex justify-between items-start mb-8 pl-4 rtl:pl-0 rtl:pr-4">
               <div>
                  <span className="text-[10px] font-black text-primary/40 uppercase tracking-[0.3em] mb-2 block">{challenge.category}</span>
                  <h3 className="text-2xl font-black text-foreground/80 tracking-tight leading-tight">{language === 'ar' ? challenge.name : challenge.enName}</h3>
               </div>
               <div className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-foreground/40 shadow-sm">
                  <Timer className="w-4 h-4 text-primary/40" /> {challenge.time}
               </div>
            </div>

            <div className="space-y-6 px-4 rtl:px-0 rtl:pr-4 mb-10">
               <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-foreground/30">
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4" /> {challenge.participants} {language === 'ar' ? 'مشاركة' : 'Joined'}
                  </span>
                  <span>{challenge.progress}% Complete</span>
               </div>
               <div className="w-full bg-secondary/30 h-3 rounded-full overflow-hidden shadow-inner flex relative">
                  <div className={`h-full bg-gradient-to-r ${challenge.color} rounded-full transition-all duration-[1.5s] delay-300 relative z-10`} style={{ width: `${challenge.progress}%` }}></div>
                  <div className="absolute inset-0 bg-white/5 opacity-50 glass-shine"></div>
               </div>
            </div>

            <div className="px-4 rtl:px-0 rtl:pr-4">
               {challenge.joined ? (
                 <div className="flex gap-4">
                    <button className="flex-1 py-5 bg-emerald-500/10 text-emerald-600 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 border border-emerald-500/10 shadow-sm cursor-default">
                       <CheckCircle2 className="w-5 h-5 fill-emerald-500 text-white" /> {language === 'ar' ? 'تم الانضمام' : 'Ongoing'}
                    </button>
                    <button className="p-5 bg-white rounded-2xl text-primary shadow-xl border border-primary/5 hover:scale-110 active:scale-95 transition-all">
                       <ArrowUpRight className="w-5 h-5" />
                    </button>
                 </div>
               ) : (
                 <button 
                   onClick={() => joinChallenge(challenge.id)}
                   className="w-full py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all group/btn"
                 >
                   <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" /> {language === 'ar' ? 'انضمي الآن' : 'Join Now'}
                 </button>
               )}
            </div>
            
            {/* Background Accent */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          </div>
        ))}

        {/* Create Custom Challenge Card */}
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-8 rounded-[3rem] border-2 border-dashed border-primary/20 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-primary/10 transition-all min-h-[300px]">
           <div className="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center shadow-xl mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
              <Plus className="w-8 h-8" strokeWidth={3} />
           </div>
           <h3 className="text-xl font-black text-primary/70 mb-2 uppercase tracking-widest">{language === 'ar' ? 'خطوة جديدة؟' : 'Custom Challenge'}</h3>
           <p className="text-[10px] font-black uppercase tracking-widest text-primary/30">{language === 'ar' ? 'اصنعي تحديك الخاص وشاركي أصدقائك' : 'Create & Challenge your Friends'}</p>
        </div>
      </div>

      <div className="mt-16 pt-10 border-t border-primary/5 flex flex-col md:flex-row items-center justify-between gap-6 opacity-40 grayscale group hover:opacity-100 hover:grayscale-0 transition-all">
         <div className="flex items-center gap-4">
            <Trophy className="w-10 h-10 text-yellow-500 drop-shadow-lg" />
            <div>
               <h4 className="font-black text-lg tracking-tight leading-none">{language === 'ar' ? 'صندوق الهدايا' : 'Reward Vault'}</h4>
               <span className="text-[10px] font-black uppercase tracking-widest">3 Rewards unclaimed</span>
            </div>
         </div>
         <div className="flex gap-3">
            {[1, 2, 3].map(i => <div key={i} className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center font-black text-primary border border-primary/5">🎁</div>)}
         </div>
      </div>
    </div>
  );
};

export default Challenges;
