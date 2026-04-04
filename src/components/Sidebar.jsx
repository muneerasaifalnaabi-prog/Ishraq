import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, CheckSquare, Activity, Calendar, Heart, SmilePlus, Settings, Sparkles, TrendingUp, Trophy, PenLine, LayoutGrid } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Sidebar = () => {
  const { t, language } = useAppContext();

  const navItems = [
    { name: t('overview'), icon: Home, path: '/' },
    { name: t('tasks'), icon: CheckSquare, path: '/tasks' },
    { name: t('habits'), icon: Activity, path: '/habits' },
    { name: t('planner'), icon: Calendar, path: '/planner' },
    { name: t('wellness'), icon: Heart, path: '/wellness' },
    { name: t('mood'), icon: SmilePlus, path: '/mood' },
    { name: t('insights'), icon: TrendingUp, path: '/insights' },
    { name: t('challenges'), icon: Trophy, path: '/challenges' },
    { name: t('journal'), icon: PenLine, path: '/journal' },
    { name: t('vision'), icon: LayoutGrid, path: '/vision' },
    { name: t('settings'), icon: Settings, path: '/settings' },
  ];

  return (
    <div className={`glass w-64 h-[calc(100vh-2rem)] rounded-3xl m-4 p-6 flex flex-col justify-between hidden lg:flex ${language==='ar' ? 'mr-4 ml-0' : 'ml-4 mr-0'}`}>
      <div className="overflow-y-auto pr-2 custom-scrollbar">
        <div className="flex items-center gap-3 mb-10 text-primary font-bold text-2xl tracking-wide">
          <Sparkles className="w-8 h-8" strokeWidth={1.5} />
          <span>Ishraq ✨</span>
        </div>

        <div className="space-y-2 pb-6">
          {navItems.map((item, idx) => (
            <NavLink 
              key={idx} 
              to={item.path}
              className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-300 block
                ${isActive ? 'bg-primary text-primary-foreground shadow-md font-semibold translate-x-1 outline-none mix-blend-normal' : 'hover:bg-primary/10 text-foreground/60 hover:text-primary'}`}
            >
              {({ isActive }) => (
                <>
                  <item.icon className={`w-5 h-5 ${isActive ? 'stroke-[2px]' : 'stroke-[1.5px]'}`} />
                  <span className="text-[14px]">{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10 mt-6 shrink-0">
        <div className="flex items-center justify-between mb-3 text-[10px] font-black uppercase tracking-widest text-primary/70">
          <span>Level 5</span>
          <span>1,250 pt</span>
        </div>
        <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
          <div className="bg-primary h-full w-3/4 rounded-full"></div>
        </div>
        <p className="text-[10px] text-foreground/40 mt-3 text-center uppercase tracking-widest leading-none font-black italic">Keep shining!</p>
      </div>
    </div>
  );
};

export default Sidebar;
