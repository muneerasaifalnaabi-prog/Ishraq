import React, { useState, useEffect } from 'react';
import { Target, Trophy, Users, Timer, Sparkles, CheckCircle2, ArrowUpRight, Plus } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Challenges = () => {
  const { t, language } = useAppContext();
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
      color: 'from-blue-400/20 to-blue-600/60',
      glow: 'bg-blue-500/20',
      textAccent: 'text-blue-500'
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
      color: 'from-purple-400/20 to-purple-600/60',
      glow: 'bg-purple-500/20',
      textAccent: 'text-purple-500'
    }
  ]);

  const joinChallenge = (id) => {
    setActiveChallenges(prev => prev.map(c => c.id === id ? { ...c, joined: true, participants: c.participants + 1 } : c));
  };

  const categories = language === 'ar' 
    ? ['الكل', 'صحة', 'عقل', 'روتين'] 
    : ['All', 'Health', 'Mind', 'Routine'];

  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className={`flex-1 w-full flex flex-col relative transition-all duration-1000 ease-out ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      
      {/* Background Ambience */}
      <div className="absolute top-[0%] right-[-5%] w-[40rem] h-[40rem] bg-gradient-to-br from-primary/10 via-blue-400/5 to-transparent rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[35rem] h-[35rem] bg-gradient-to-tr from-purple-400/10 to-transparent rounded-full blur-[100px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />

      {/* Elegant Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 relative z-10 px-2 md:px-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-foreground/90 flex items-center gap-4 mb-3">
            {language === 'ar' ? 'التحديات' : 'Challenges'}
            <Target className="w-8 h-8 text-primary opacity-80" />
          </h2>
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-foreground/40 font-bold ml-1">
             {language === 'ar' ? 'ارتقِ بمستوى حياتك' : 'Elevate your lifestyle'}
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-white/40 dark:bg-card/40 backdrop-blur-2xl p-2.5 rounded-full border border-white/60 shadow-sm overflow-x-auto max-w-full custom-scrollbar">
           <div className="flex bg-white/60 dark:bg-black/20 p-1.5 rounded-full relative">
             {categories.map((cat, i) => (
               <button 
                 key={i} 
                 onClick={() => setActiveCategory(i)}
                 className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-500 z-10 whitespace-nowrap ${activeCategory === i ? 'text-primary' : 'text-foreground/40 hover:text-foreground/70'}`}
               >
                 {cat}
               </button>
             ))}
             {/* Dynamic Slider (simplified logic for demo) */}
             <div 
               className="absolute top-1.5 bottom-1.5 bg-white dark:bg-card shadow-sm rounded-full transition-transform duration-500 border border-black/5" 
               style={{ 
                 width: `${100 / categories.length}%`, 
                 transform: `translateX(${activeCategory * 100}%)` 
               }} 
             />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10 px-2 md:px-6 mb-10">
        {activeChallenges.map((challenge, index) => (
          <div 
            key={challenge.id} 
            className="bg-gradient-to-br from-white/80 to-white/40 dark:from-card/80 dark:to-card/40 p-8 md:p-10 rounded-[2.5rem] border border-white/80 shadow-[0_16px_48px_rgba(0,0,0,0.06)] backdrop-blur-3xl relative overflow-hidden group hover:shadow-[0_24px_64px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-700 animate-in slide-in-from-bottom-4"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {/* Ambient Card Glow */}
            <div className={`absolute -right-20 -top-20 w-64 h-64 ${challenge.glow} rounded-full blur-[80px] group-hover:scale-125 transition-transform duration-1000 pointer-events-none`}></div>
            
            <div className="flex justify-between items-start mb-10 relative z-10">
               <div>
                  <span className={`text-[9px] font-bold uppercase tracking-[0.4em] ${challenge.textAccent} mb-3 block`}>{challenge.category}</span>
                  <h3 className="text-3xl font-serif text-foreground/90 tracking-tight leading-tight">{language === 'ar' ? challenge.name : challenge.enName}</h3>
               </div>
               <div className="flex items-center gap-2 bg-white/60 dark:bg-black/20 px-4 py-2.5 rounded-full border border-white/50 shadow-sm backdrop-blur-md">
                  <Timer className={`w-4 h-4 ${challenge.textAccent}`} />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/70">{challenge.time}</span>
               </div>
            </div>

            <div className="space-y-6 mb-12 relative z-10">
               <div className="flex justify-between items-center px-1">
                  <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40">
                    <Users className="w-4 h-4" /> {challenge.participants} {language === 'ar' ? 'مشاركة' : 'Joined'}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${challenge.textAccent}`}>{challenge.progress}% {language === 'ar' ? 'مكتمل' : 'Complete'}</span>
               </div>
               
               {/* Elegant Progress Bar */}
               <div className="w-full bg-black/5 dark:bg-white/5 h-4 rounded-full overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)] relative p-0.5">
                  <div 
                    className={`h-full bg-gradient-to-r ${challenge.color} rounded-full transition-all duration-[1.5s] ease-out relative z-10`} 
                    style={{ width: `${challenge.progress}%` }}
                  >
                     <div className="absolute inset-0 glass-shine opacity-40 rounded-full"></div>
                  </div>
               </div>
            </div>

            <div className="relative z-10">
               {challenge.joined ? (
                 <div className="flex gap-4">
                    <button className="flex-1 py-5 bg-emerald-500/10 text-emerald-600 rounded-full font-bold text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 border border-emerald-500/20 shadow-sm backdrop-blur-md cursor-default transition-all">
                       <CheckCircle2 className="w-5 h-5" strokeWidth={2.5} /> {language === 'ar' ? 'تم الانضمام' : 'Ongoing'}
                    </button>
                    <button className="w-16 h-16 bg-white dark:bg-card rounded-full text-foreground/70 shadow-lg border border-white/50 hover:scale-105 hover:text-primary active:scale-95 transition-all flex items-center justify-center group/btn">
                       <ArrowUpRight className="w-6 h-6 group-hover/btn:rotate-12 transition-transform" />
                    </button>
                 </div>
               ) : (
                 <button 
                   onClick={() => joinChallenge(challenge.id)}
                   className="w-full py-5 bg-foreground text-background rounded-full font-bold text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:bg-primary hover:text-white hover:-translate-y-1 active:translate-y-0 transition-all duration-300 group/join"
                 >
                   <Sparkles className="w-5 h-5 group-hover/join:scale-125 transition-transform duration-500" /> {language === 'ar' ? 'انضمي الآن' : 'Join Challenge'}
                 </button>
               )}
            </div>
          </div>
        ))}

        {/* Create Custom Challenge Card - Glassy minimal design */}
        <div className="bg-gradient-to-br from-white/30 to-white/10 dark:from-card/30 dark:to-card/10 p-8 md:p-10 rounded-[2.5rem] border-[3px] border-dashed border-white/60 dark:border-white/10 shadow-sm flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-white/50 transition-all duration-500 min-h-[350px] backdrop-blur-xl animate-in slide-in-from-bottom-4" style={{ animationDelay: '300ms' }}>
           <div className="w-20 h-20 bg-white/80 dark:bg-card border border-white/50 rounded-full flex items-center justify-center shadow-lg mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
              <Plus className="w-8 h-8 text-foreground/50 group-hover:text-white transition-colors" strokeWidth={2.5} />
           </div>
           <h3 className="text-2xl font-serif text-foreground/80 mb-3 tracking-tight">{language === 'ar' ? 'تحدي جديد؟' : 'Custom Challenge'}</h3>
           <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40">{language === 'ar' ? 'اصنعي تحديك الخاص وشاركي أصدقائك' : 'Create & Challenge your Friends'}</p>
        </div>
      </div>

      {/* Reward Vault - Cinematic Footer */}
      <div className="mx-2 md:mx-6 mt-6 p-8 md:p-12 bg-[#0f172a] rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
         <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
         <div className="absolute left-[-10%] top-[-50%] w-[30rem] h-[30rem] bg-yellow-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-yellow-500/20 transition-colors duration-1000"></div>
         
         <div className="flex items-center gap-6 relative z-10">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-2xl border border-yellow-500/30 flex items-center justify-center backdrop-blur-md shadow-[0_0_30px_rgba(234,179,8,0.2)] group-hover:scale-110 transition-transform duration-700">
              <Trophy className="w-10 h-10 text-yellow-500" strokeWidth={1.5} />
            </div>
            <div>
               <h4 className="font-serif text-3xl tracking-tight text-white/90 mb-2">{language === 'ar' ? 'صندوق الهدايا' : 'Reward Vault'}</h4>
               <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-yellow-500/70">3 {language === 'ar' ? 'جوائز بانتظارك' : 'Rewards unclaimed'}</span>
            </div>
         </div>
         
         <div className="flex gap-4 relative z-10">
            {[1, 2, 3].map((i, index) => (
              <div 
                key={i} 
                className="w-16 h-16 bg-white/10 hover:bg-white/20 rounded-2xl shadow-xl flex items-center justify-center font-black text-2xl border border-white/20 backdrop-blur-md cursor-pointer hover:-translate-y-2 transition-all duration-300 animate-in zoom-in-95"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                🎁
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default Challenges;
