import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Tasks = () => {
  const { t, language } = useAppContext();
  
  const [tasks, setTasks] = useState([
    { id: 1, text: 'شراء بازلاء', enText: 'Buy peas', done: false, priority: 'عادي' },
    { id: 2, text: 'إنهاء التقرير الشهري', enText: 'Finish monthly report', done: true, priority: 'مهم' },
    { id: 3, text: 'التسجيل في النادي', enText: 'Register at gym', done: false, priority: 'عادي' },
  ]);

  const [newTask, setNewTask] = useState('');

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
      priority: 'عادي' 
    }, ...tasks]);
    setNewTask('');
  };

  return (
    <div className="flex-1 glass rounded-3xl p-8 flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary">{t('tasks')}</h2>
      </div>

      <form onSubmit={addTask} className="mb-8 flex gap-4">
        <input 
          type="text" 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder={language === 'ar' ? 'إضافة مهمة جديدة...' : 'Add a new task...'}
          className="flex-1 bg-secondary/50 border border-secondary p-4 rounded-2xl focus:border-primary/50 outline-none transition-colors"
        />
        <button type="submit" className="bg-primary text-primary-foreground px-6 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-md">
          <Plus className="w-5 h-5" /> 
        </button>
      </form>

      <div className="space-y-4 overflow-y-auto flex-1 pr-2">
        {tasks.map((task) => (
          <div key={task.id} className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${task.done ? 'bg-secondary/30 border-secondary opacity-70' : 'bg-white dark:bg-card/50 border-primary/20 shadow-sm'}`}>
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => toggleTask(task.id)}>
              {task.done ? <CheckCircle2 className="w-6 h-6 text-primary" /> : <Circle className="w-6 h-6 text-foreground/40" />}
              <span className={`text-lg ${task.done ? 'line-through text-foreground/50' : 'font-semibold'}`}>
                {language === 'ar' ? task.text : task.enText}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${task.priority === 'مهم' ? 'bg-red-100 text-red-600' : 'bg-primary/10 text-primary'}`}>
                 {task.priority}
              </span>
              <button onClick={() => deleteTask(task.id)} className="text-foreground/40 hover:text-red-500 transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
