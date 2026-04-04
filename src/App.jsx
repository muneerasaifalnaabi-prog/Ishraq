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
import { useAppContext } from './context/AppContext';

function App() {
  const { language } = useAppContext();

  return (
    <Router>
      <div className={`flex h-screen overflow-hidden ${language === 'ar' ? 'flex-row-reverse text-right' : 'text-left'}`}>
        <Sidebar />
        <div className="flex-1 flex flex-col pt-4 px-6 pb-6 overflow-hidden">
          <Header />
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-10">
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
