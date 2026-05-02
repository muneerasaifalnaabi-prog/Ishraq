import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Habits from './pages/Habits';
import Planner from './pages/Planner';
import Wellness from './pages/Wellness';
import Mood from './pages/Mood';
import Insights from './pages/Insights';
import Challenges from './pages/Challenges';
import Journal from './pages/Journal';
import VisionBoard from './pages/VisionBoard';
import Settings from './pages/Settings';
import Notification from './components/Notification';
import { useAppContext } from './context/AppContext';

function App() {
  const { language, isMobileMenuOpen, setIsMobileMenuOpen } = useAppContext();

  return (
    <Router>
      <Notification />
      {/* Global Generative Noise Layer */}
      <div className="noise-overlay" />

      {/* Main Immersive Canvas */}
      <div className={`flex h-screen overflow-hidden ${language === 'ar' ? 'text-right' : 'text-left'} transition-all duration-1000 relative bg-background`}>
        
        {/* Dynamic Global Ambient Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[hsl(var(--glow-1))] rounded-full blur-[140px] opacity-40 mix-blend-multiply dark:mix-blend-screen pointer-events-none animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] bg-[hsl(var(--glow-2))] rounded-full blur-[160px] opacity-40 mix-blend-multiply dark:mix-blend-screen pointer-events-none animate-[float_10s_ease-in-out_infinite_reverse]" />
        <div className="absolute top-[30%] left-[40%] w-[40vw] h-[40vw] bg-[hsl(var(--glow-3))] rounded-full blur-[150px] opacity-20 mix-blend-multiply dark:mix-blend-screen pointer-events-none animate-[float_12s_ease-in-out_infinite]" />

        {/* Mobile Backdrop */}
        {isMobileMenuOpen ? (
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-xl z-[45] lg:hidden animate-in fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        ) : null}

        {/* Floating Sidebar Container */}
        <div className="z-40 h-full py-4 pl-4 md:py-6 md:pl-6 drop-shadow-2xl">
           <Sidebar />
        </div>

        {/* Content Area - Designed as a beautiful recessed inner canvas */}
        <div className="flex-1 flex flex-col m-4 md:m-6 rounded-[3rem] bg-white/30 dark:bg-black/20 backdrop-blur-sm border border-white/50 dark:border-white/5 shadow-[inset_0_0_40px_rgba(0,0,0,0.02)] overflow-hidden relative z-10 transition-all duration-700">
          
          <div className="px-6 md:px-10 pt-6 md:pt-8 relative z-20">
            <Header />
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar px-6 md:px-10 pb-10 relative z-10 w-full animate-in fade-in slide-in-from-bottom-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/habits" element={<Habits />} />
              <Route path="/planner" element={<Planner />} />
              <Route path="/wellness" element={<Wellness />} />
              <Route path="/mood" element={<Mood />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/challenges" element={<Challenges />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/vision" element={<VisionBoard />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>

      </div>
    </Router>
  );
}

export default App;
