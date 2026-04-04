import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, CheckSquare, Activity, Calendar, Heart, SmilePlus, Settings, Sparkles } from 'lucide-react';
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
    { name: t('settings'), icon: Settings, path: '/settings' },
  ];

  return (
    <div className={`glass w-64 h-[calc(100vh-2rem)] rounded-3xl m-4 p-6 flex flex-col justify-between hidden md:flex ${language==='ar' ? 'mr-4 ml-0' : 'ml-4 mr-0'}`}>
      <div>
        <div className="flex items-center gap-3 mb-10 text-primary font-bold text-2xl tracking-wide">
          <Sparkles className="w-8 h-8" strokeWidth={1.5} />
          <span>Ishraq ✨</span>
        </div>

        <div className="space-y-3">
          {navItems.map((item, idx) => (
            <NavLink 
              key={idx} 
              to={item.path}
              className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-300 block
                ${isActive ? 'bg-primary text-primary-foreground shadow-md font-semibold translate-x-1 outline-none mix-blend-normal' : 'hover:bg-primary/10 text-foreground/70 hover:text-primary'}`}
            >
              {({ isActive }) => (
                <>
                  <item.icon className={`w-5 h-5 ${isActive ? 'stroke-[2px]' : 'stroke-[1.5px]'}`} />
                  <span className="text-[15px]">{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10 mt-auto">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary/70">Level 5</span>
          <span className="text-xs font-bold text-primary">1,250 pt</span>
        </div>
        <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
          <div className="bg-primary h-full w-3/4 rounded-full"></div>
        </div>
        <p className="text-xs text-foreground/60 mt-3 text-center opacity-80 leading-relaxed font-medium">Keep shining beautifully today!</p>
      </div>
    </div>
  );
};

export default Sidebar;
