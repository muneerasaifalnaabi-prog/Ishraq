import React, { useState, useMemo, useEffect } from 'react';
import { Plus, Trash2, CheckCircle2, AlertCircle, Filter, Circle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { taskService } from '../services/api';

const Tasks = () => {
  const { t, language } = useAppContext();
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateIn(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    taskService.getTasks().then(data => {
      setTasks(data || []);
      setIsLoading(false);
    });
  }, []);

  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('عادي');
  const [filter, setFilter] = useState('all'); 

  const filteredTasks = useMemo(() => {
    if (filter === 'all') return tasks;
    return tasks.filter(t => t.priority === 'مهم');
  }, [tasks, filter]);

  const taskStats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.done).length;
    const pending = total - completed;
    return { total, completed, pending };
  }, [tasks]);

  const toggleTask = async (id) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    await taskService.updateTask(id, { done: !task.done });
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = async (id) => {
    await taskService.deleteTask(id);
    setTasks(prev => prev.filter(t => t.id !== id));
  };
  
  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const taskData = { 
      text: newTask, 
      enText: newTask, 
      priority: priority
    };
    const savedTask = await taskService.addTask(taskData);
    setTasks(prev => [savedTask, ...prev]);
    setNewTask('');
    setPriority('عادي');
    if (priority !== 'مهم' && filter === 'high') setFilter('all');
  };

  return (
    <div className={`flex-1 w-full flex flex-col relative transition-all duration-1000 ease-out ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      
      {/* Background Ambience */}
      <div className="absolute top-[10%] right-[-10%] w-[40rem] h-[40rem] bg-gradient-to-br from-blue-400/5 via-primary/5 to-transparent rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[35rem] h-[35rem] bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-[100px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />

      {/* Elegant Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 relative z-10 px-2 md:px-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-foreground/90 flex items-center gap-4 mb-3">
            {language === 'ar' ? 'المهام' : 'Tasks'}
            <CheckCircle2 className="w-8 h-8 text-primary opacity-80" />
          </h2>
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-foreground/40 font-bold ml-1">
             {language === 'ar' ? 'إدارة اليوم بفاعلية' : 'Master your day'}
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-white/40 dark:bg-card/40 backdrop-blur-2xl p-2.5 rounded-full border border-white/60 shadow-sm">
           <div className="flex bg-white/60 dark:bg-black/20 p-1.5 rounded-full relative">
             <button 
                onClick={() => setFilter('all')}
                className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-500 z-10 ${filter === 'all' ? 'text-primary' : 'text-foreground/40 hover:text-foreground/70'}`}
             >
                {language === 'ar' ? 'الكل' : 'All'}
             </button>
             <button 
                onClick={() => setFilter('high')}
                className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-500 z-10 ${filter === 'high' ? 'text-primary' : 'text-foreground/40 hover:text-foreground/70'}`}
             >
                {language === 'ar' ? 'مهم' : 'High'}
             </button>
             {/* Slider */}
             <div className={`absolute top-1.5 bottom-1.5 w-[calc(50%-0.375rem)] bg-white dark:bg-card shadow-sm rounded-full transition-transform duration-500 border border-black/5 ${filter === 'all' ? 'translate-x-0' : 'translate-x-full'}`} />
           </div>
           <button className="p-3 bg-white/60 dark:bg-black/20 rounded-full hover:bg-white dark:hover:bg-white/20 transition-all text-primary hover:shadow-sm">
             <Filter className="w-4 h-4" />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10 px-2 md:px-6 mb-10">
         {/* Stats Row */}
         <div className="md:col-span-4 bg-gradient-to-br from-primary/10 to-transparent p-8 rounded-[2.5rem] border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-3xl flex flex-col justify-between group hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-colors"></div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-foreground/40 mb-4 relative z-10">{language === 'ar' ? 'الإجمالي' : 'Total Mission'}</span>
            <span className="text-6xl font-serif text-foreground/90 tracking-tighter relative z-10">{taskStats.total}</span>
         </div>
         <div className="md:col-span-4 bg-gradient-to-br from-orange-500/10 to-transparent p-8 rounded-[2.5rem] border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-3xl flex flex-col justify-between group hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-orange-500/20 rounded-full blur-2xl group-hover:bg-orange-500/30 transition-colors"></div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-foreground/40 mb-4 relative z-10">{language === 'ar' ? 'متبقي' : 'Remaining'}</span>
            <span className="text-6xl font-serif text-foreground/90 tracking-tighter relative z-10">{taskStats.pending}</span>
         </div>
         <div className="md:col-span-4 bg-gradient-to-br from-emerald-500/10 to-transparent p-8 rounded-[2.5rem] border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-3xl flex flex-col justify-between group hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/20 rounded-full blur-2xl group-hover:bg-emerald-500/30 transition-colors"></div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-foreground/40 mb-4 relative z-10">{language === 'ar' ? 'تم' : 'Completed'}</span>
            <span className="text-6xl font-serif text-foreground/90 tracking-tighter relative z-10">{taskStats.completed}</span>
         </div>
      </div>

      <div className="px-2 md:px-6 relative z-10">
        {/* Floating Input Form */}
        <form onSubmit={addTask} className="mb-10 flex flex-col gap-6 bg-gradient-to-br from-white/80 to-white/40 dark:from-card/80 dark:to-card/40 p-6 md:p-8 rounded-[2.5rem] border border-white/80 shadow-[0_16px_48px_rgba(0,0,0,0.08)] backdrop-blur-3xl relative">
          <div className="flex gap-4 flex-col sm:flex-row">
            <input 
              type="text" 
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder={language === 'ar' ? 'ما هي خطتك القادمة يا بطلة؟' : 'What is your next mission?'}
              className="flex-1 bg-white/60 dark:bg-black/20 border-0 px-8 py-5 rounded-[1.5rem] focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-foreground/30 text-lg font-serif shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]"
            />
            <button type="submit" className="bg-primary hover:bg-foreground text-white px-10 py-5 rounded-[1.5rem] font-bold text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_8px_20px_rgba(var(--primary-rgb),0.3)] active:scale-95 shrink-0 group">
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" strokeWidth={2.5} /> 
              {language === 'ar' ? 'إضافة' : 'Add'}
            </button>
          </div>

          <div className="flex items-center gap-6 px-4 pt-2 border-t border-black/5 dark:border-white/5">
             <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-foreground/40">{language === 'ar' ? 'الأولوية' : 'Priority Level'}</span>
             <div className="flex gap-3">
                <button 
                  type="button"
                  onClick={() => setPriority('عادي')}
                  className={`px-6 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-300 border ${priority === 'عادي' ? 'bg-white border-white shadow-sm text-foreground' : 'border-transparent text-foreground/40 hover:bg-white/40'}`}
                >
                  {language === 'ar' ? 'عادي' : 'Normal'}
                </button>
                <button 
                  type="button"
                  onClick={() => setPriority('مهم')}
                  className={`px-6 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-300 border ${priority === 'مهم' ? 'bg-rose-500 border-rose-500 shadow-md shadow-rose-500/20 text-white' : 'border-transparent text-foreground/40 hover:bg-white/40'}`}
                >
                  {language === 'ar' ? 'مهم' : 'Urgent'}
                </button>
             </div>
          </div>
        </form>

        {/* List of Tasks */}
        <div className="space-y-4">
          {filteredTasks.map((task, index) => (
            <div 
              key={task.id} 
              className={`flex items-center justify-between p-6 md:p-8 rounded-[2rem] border transition-all duration-500 group animate-in slide-in-from-bottom-4
                ${task.done 
                  ? 'bg-white/20 dark:bg-card/10 border-white/30 shadow-none opacity-60' 
                  : 'bg-gradient-to-br from-white/70 to-white/30 dark:from-card/70 dark:to-card/30 border-white/60 shadow-lg hover:shadow-xl hover:-translate-y-1 backdrop-blur-xl'}`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-6 cursor-pointer flex-1" onClick={() => toggleTask(task.id)}>
                <div className="relative flex-shrink-0">
                  {task.done ? (
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30">
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full border-2 border-foreground/10 group-hover:border-primary/40 transition-colors flex items-center justify-center bg-white/50">
                      <div className="w-2 h-2 rounded-full bg-primary/0 group-hover:bg-primary/40 transition-colors"></div>
                    </div>
                  )}
                </div>
                <span className={`text-lg md:text-xl font-serif transition-all duration-500 ${task.done ? 'line-through text-foreground/40 italic' : 'text-foreground/90'}`}>
                  {language === 'ar' ? task.text : task.enText}
                </span>
              </div>
              
              <div className="flex items-center gap-6">
                {task.priority === 'مهم' && (
                  <div className="flex items-center gap-2 bg-rose-500/10 px-4 py-2 rounded-full border border-rose-500/20">
                    <AlertCircle className="w-4 h-4 text-rose-500" strokeWidth={2.5} />
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-rose-600 dark:text-rose-400">
                      {language === 'ar' ? 'مهم' : 'Urgent'}
                    </span>
                  </div>
                )}
                <button 
                  onClick={() => deleteTask(task.id)} 
                  className="text-foreground/20 hover:text-rose-500 transition-all p-3 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-full border border-transparent hover:border-rose-100"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          {filteredTasks.length === 0 && !isLoading && (
            <div className="py-24 flex flex-col items-center justify-center opacity-30">
               <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-8 border border-primary/20">
                 <CheckCircle2 className="w-10 h-10 text-primary" strokeWidth={1.5} />
               </div>
               <h3 className="font-serif text-3xl mb-3 tracking-tight">
                  {language === 'ar' ? (filter === 'all' ? 'لا توجد مهام' : 'لا توجد مهام مهمة') : (filter === 'all' ? 'All Clear' : 'No Urgent Items')}
               </h3>
               <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/50">
                  {language === 'ar' ? 'استرخي واستمتعي بيومك' : 'Relax and enjoy your day'}
               </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
