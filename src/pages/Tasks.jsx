import React, { useState, useMemo, useEffect } from 'react';
import { Plus, Trash2, CheckCircle2, Circle, AlertCircle, Info, Filter } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { taskService } from '../services/api';

const Tasks = () => {
  const { t, language } = useAppContext();
  
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
    <div className="glass rounded-[2rem] p-6 md:p-8 transition-all duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className={`text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r ${language === 'ar' ? 'from-primary to-foreground' : 'from-foreground to-primary'}`}>
          {t('tasks')}
        </h2>
        <div className="flex items-center gap-3">
           <div className="flex bg-secondary/40 p-1 rounded-xl border border-secondary/50 shadow-sm">
             <button 
                onClick={() => setFilter('all')}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all shadow-sm tracking-tight ${filter === 'all' ? 'bg-white text-primary' : 'text-foreground/40 hover:text-primary'}`}
             >
                {language === 'ar' ? 'الكل' : 'All'}
             </button>
             <button 
                onClick={() => setFilter('high')}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all shadow-sm tracking-tight ${filter === 'high' ? 'bg-white text-primary' : 'text-foreground/40 hover:text-primary'}`}
             >
                {language === 'ar' ? 'مهم' : 'High'}
             </button>
           </div>
           <button className="p-2.5 bg-secondary/40 rounded-xl hover:bg-primary/10 transition-colors">
             <Filter className="w-4 h-4 text-primary" />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
         <div className="bg-primary/5 border border-primary/10 p-4 rounded-3xl text-center">
            <span className="text-[9px] uppercase font-black tracking-widest text-primary/60 block mb-1">{language === 'ar' ? 'الإجمالي' : 'Total'}</span>
            <span className="text-xl font-black text-primary leading-none">{taskStats.total}</span>
         </div>
         <div className="bg-orange-500/5 border border-orange-500/10 p-4 rounded-3xl text-center">
            <span className="text-[9px] uppercase font-black tracking-widest text-orange-500/60 block mb-1">{language === 'ar' ? 'متبقي' : 'Left'}</span>
            <span className="text-xl font-black text-orange-500 leading-none">{taskStats.pending}</span>
         </div>
         <div className="bg-green-500/5 border border-green-500/10 p-4 rounded-3xl text-center">
            <span className="text-[9px] uppercase font-black tracking-widest text-green-500/60 block mb-1">{language === 'ar' ? 'تم' : 'Done'}</span>
            <span className="text-xl font-black text-green-500 leading-none">{taskStats.completed}</span>
         </div>
      </div>

      <form onSubmit={addTask} className="mb-8 flex flex-col gap-4 bg-white/40 dark:bg-card/40 p-5 md:p-6 rounded-[2rem] border border-primary/5 shadow-xl backdrop-blur-xl">
        <div className="flex gap-3 flex-col sm:flex-row">
          <input 
            type="text" 
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder={language === 'ar' ? 'ما هي خطتك القادمة يا بطلة؟' : 'What is your next mission?'}
            className="flex-1 bg-white/60 dark:bg-card border-0 p-4 rounded-xl focus:ring-4 focus:ring-primary/5 outline-none transition-all placeholder:text-foreground/20 text-sm md:text-base font-bold shadow-inner"
          />
          <button type="submit" className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary/95 transition-all shadow-lg active:scale-95 shrink-0">
            <Plus className="w-4 h-4" strokeWidth={3} /> 
          </button>
        </div>

        <div className="flex items-center gap-4 px-2">
           <span className="text-[8px] font-black uppercase tracking-widest text-foreground/30">{language === 'ar' ? 'الأولوية:' : 'Priority:'}</span>
           <div className="flex gap-2 bg-secondary/20 p-1 rounded-xl">
              <button 
                type="button"
                onClick={() => setPriority('عادي')}
                className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all ${priority === 'عادي' ? 'bg-white shadow-sm text-primary' : 'text-foreground/30 hover:text-foreground'}`}
              >
                {language === 'ar' ? 'عادي' : 'Normal'}
              </button>
              <button 
                type="button"
                onClick={() => setPriority('مهم')}
                className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all ${priority === 'مهم' ? 'bg-red-500 text-white shadow-sm' : 'text-foreground/30 hover:text-foreground'}`}
              >
                {language === 'ar' ? 'مهم' : 'Urgent'}
              </button>
           </div>
        </div>
      </form>

      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div key={task.id} className={`flex items-center justify-between p-5 md:p-6 rounded-[2rem] border transition-all ${task.done ? 'bg-secondary/10 border-secondary/20 opacity-50 shadow-sm' : 'bg-white dark:bg-card/30 border-white shadow-md'}`}>
            <div className="flex items-center gap-5 cursor-pointer group flex-1" onClick={() => toggleTask(task.id)}>
              <div className="relative">
                {task.done ? (
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center animate-in zoom-in-50">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full border-4 border-primary/20 group-hover:border-primary/40 transition-colors" />
                )}
              </div>
              <span className={`text-base md:text-lg transition-all ${task.done ? 'line-through text-foreground/30 italic' : 'font-black text-foreground/70'}`}>
                {language === 'ar' ? task.text : task.enText}
              </span>
            </div>
            
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                {task.priority === 'مهم' && <AlertCircle className="w-4 h-4 text-red-500" />}
                <span className={`text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${task.priority === 'مهم' ? 'bg-red-500 text-white' : 'bg-primary/10 text-primary'}`}>
                  {language === 'ar' ? task.priority : (task.priority === 'مهم' ? 'High' : 'Normal')}
                </span>
              </div>
              <button 
                onClick={() => deleteTask(task.id)} 
                className="text-foreground/10 hover:text-red-500 transition-all p-2 hover:bg-red-50 rounded-xl"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
        {filteredTasks.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center opacity-20">
             <CheckCircle2 className="w-12 h-12 text-primary mb-6" strokeWidth={1} />
             <p className="font-black text-xl uppercase tracking-widest">
                {language === 'ar' ? (filter === 'all' ? 'لا توجد مهام' : 'لا توجد مهام مهمة') : (filter === 'all' ? 'All Clear' : 'No Urgent Items')}
             </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
