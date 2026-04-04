import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle2, Circle, AlertCircle, Info } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Tasks = () => {
  const { t, language } = useAppContext();
  
  const [tasks, setTasks] = useState([
    { id: 1, text: 'شراء بازلاء', enText: 'Buy peas', done: false, priority: 'عادي' },
    { id: 2, text: 'إنهاء التقرير الشهري', enText: 'Finish monthly report', done: true, priority: 'مهم' },
    { id: 3, text: 'التسجيل في النادي', enText: 'Register at gym', done: false, priority: 'عادي' },
  ]);

  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('عادي'); // 'عادي' or 'مهم'

  const toggleTask = (id) => setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));
  
  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([{ 
      id: Date.now(), 
      text: newTask, 
      enText: newTask, 
      done: false, 
      priority: priority
    }, ...tasks]);
    setNewTask('');
    setPriority('عادي'); // Reset to default
  };

  return (
    <div className="flex-1 glass rounded-3xl p-8 flex flex-col overflow-hidden h-full">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary">{t('tasks')}</h2>
      </div>

      <form onSubmit={addTask} className="mb-8 flex flex-col gap-4">
        <div className="flex gap-4">
          <input 
            type="text" 
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder={language === 'ar' ? 'ما هي خطتك القادمة؟' : 'What is your next plan?'}
            className="flex-1 bg-secondary/50 border border-secondary p-4 rounded-2xl focus:border-primary/50 outline-none transition-all placeholder:text-foreground/30 shadow-inner"
          />
          <button type="submit" className="bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg active:scale-95">
            <Plus className="w-5 h-5" /> 
          </button>
        </div>

        <div className="flex items-center gap-4">
           <span className="text-sm font-semibold text-foreground/60">{language === 'ar' ? 'الأولوية:' : 'Priority:'}</span>
           <div className="flex gap-2 bg-secondary/30 p-1.5 rounded-xl border border-secondary">
              <button 
                type="button"
                onClick={() => setPriority('عادي')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${priority === 'عادي' ? 'bg-white shadow-sm text-primary' : 'text-foreground/40 hover:text-foreground'}`}
              >
                {language === 'ar' ? 'عادي' : 'Normal'}
              </button>
              <button 
                type="button"
                onClick={() => setPriority('مهم')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${priority === 'مهم' ? 'bg-red-500 text-white shadow-md' : 'text-foreground/40 hover:text-foreground'}`}
              >
                {language === 'ar' ? 'مهم' : 'Important'}
              </button>
           </div>
        </div>
      </form>

      <div className="space-y-4 overflow-y-auto flex-1 pr-2">
        {tasks.map((task) => (
          <div key={task.id} className={`flex items-center justify-between p-5 rounded-3xl border transition-all hover:scale-[1.01] ${task.done ? 'bg-secondary/30 border-secondary/50 opacity-60' : 'bg-white dark:bg-card/50 border-primary/20 shadow-md ring-1 ring-black/5'}`}>
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => toggleTask(task.id)}>
              <div className="relative">
                {task.done ? <CheckCircle2 className="w-7 h-7 text-primary animate-in zoom-in-50" /> : <Circle className="w-7 h-7 text-primary/30" />}
              </div>
              <span className={`text-lg transition-all ${task.done ? 'line-through text-foreground/40 italic' : 'font-semibold text-foreground/80'}`}>
                {language === 'ar' ? task.text : task.enText}
              </span>
            </div>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1.5">
                {task.priority === 'مهم' ? <AlertCircle className="w-4 h-4 text-red-500" /> : <Info className="w-4 h-4 text-primary/40" />}
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${task.priority === 'مهم' ? 'bg-red-500/10 text-red-600' : 'bg-primary/10 text-primary'}`}>
                  {language === 'ar' ? task.priority : (task.priority === 'مهم' ? 'High' : 'Normal')}
                </span>
              </div>
              <button 
                onClick={() => deleteTask(task.id)} 
                className="text-foreground/30 hover:text-red-500 transition-all p-2 hover:bg-red-50 rounded-full"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
        {tasks.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center opacity-30 mt-20">
             <CheckCircle2 className="w-20 h-20 mb-4" strokeWidth={1} />
             <p className="font-bold">{language === 'ar' ? 'لا توجد مهام اليوم' : 'No tasks for today'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
