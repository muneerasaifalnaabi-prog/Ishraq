import React, { useState, useEffect } from "react";
import {
  Droplet, Dumbbell, BookOpen, Sparkles, Plus, Play,
  Calendar as CalendarIcon, ArrowRight, Activity, CheckCircle2
} from "lucide-react";
import { useAppContext } from "../context/AppContext";

const Dashboard = () => {
  const { t, language } = useAppContext();
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const habits = [
    { title: "شرب الماء", enTitle: "Water", icon: Droplet, done: 4, target: 8 },
    { title: "رياضة", enTitle: "Workout", icon: Dumbbell, done: 1, target: 1 },
    { title: "قراءة", enTitle: "Reading", icon: BookOpen, done: 0, target: 1 },
    { title: "تأمل", enTitle: "Meditation", icon: Sparkles, done: 0, target: 1 },
  ];

  const tasks = [
    { text: "الرد على الإيميلات", enText: "Reply to emails", enPri: "Normal", priority: "عادي", time: "10:00 AM", done: true },
    { text: "تحضير وجبة الغداء", enText: "Prepare lunch", enPri: "Urgent", priority: "مهم", time: "01:30 PM", done: false },
    { text: "جلسة العناية المسائية 🧴", enText: "Evening Skincare 🧴", enPri: "Normal", priority: "عادي", time: "09:00 PM", done: false },
  ];

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 auto-rows-max px-2 md:px-6 pb-16 relative transition-all duration-1000 ease-out ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

      {/* Ambient glows */}
      <div className="absolute top-0 left-[20%] w-[45vw] h-[45vw] bg-[hsl(var(--glow-1))] rounded-full blur-[160px] opacity-30 pointer-events-none animate-[float_10s_ease-in-out_infinite]" />
      <div className="absolute bottom-0 right-0 w-[30vw] h-[30vw] bg-[hsl(var(--glow-2))] rounded-full blur-[120px] opacity-20 pointer-events-none animate-[float_14s_ease-in-out_infinite_reverse]" />

      {/* ── Header ── */}
      <div className="lg:col-span-12 flex flex-col md:flex-row justify-between items-start md:items-end mb-4 gap-6 relative z-10">
        <div>
          <h1 className="text-5xl md:text-6xl font-serif tracking-tight text-foreground flex items-center gap-5 mb-4">
            {language === 'ar' ? 'مرحباً بكِ' : 'Welcome Back'}
            <Sparkles className="w-10 h-10 text-primary" />
          </h1>
          <p className="text-[11px] md:text-xs uppercase tracking-[0.5em] text-foreground/50 font-bold">
            {language === 'ar' ? 'إليك نظرة عامة على يومك' : "Here's your day at a glance"}
          </p>
        </div>
      </div>

      {/* ── LEFT COLUMN ── */}
      <div className="lg:col-span-8 flex flex-col gap-8 relative z-10">

        {/* Habit Tracker */}
        <section className="glass-premium rounded-[2.5rem] p-10 relative overflow-hidden group hover:-translate-y-1 transition-all duration-500">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[hsl(var(--glow-1))] opacity-10 rounded-full blur-[80px] pointer-events-none" />
          <div className="flex justify-between items-center mb-12 relative z-10">
            <h2 className="text-3xl font-serif tracking-tight text-foreground flex items-center gap-4">
              <Activity className="w-7 h-7 text-primary" />
              {t("habits")}
            </h2>
            <button className="bg-secondary hover:bg-primary text-foreground hover:text-primary-foreground p-3.5 rounded-full transition-all duration-300 border border-secondary group/btn shadow-sm hover:shadow-md">
              <Plus className="w-5 h-5 group-hover/btn:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 relative z-10">
            {habits.map((h, i) => {
              const pct = (h.done / h.target) * 100;
              const isDone = h.done === h.target;
              return (
                <div key={i} className={`flex flex-col items-center justify-center p-7 rounded-[2rem] border cursor-pointer transition-all duration-500 hover:-translate-y-2 ${isDone ? 'bg-foreground/5 border-foreground/10 shadow-sm' : 'bg-background/50 border-secondary hover:border-primary/30 shadow-sm hover:shadow-lg'}`}>
                  <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center mb-5 transition-all duration-500 ${isDone ? 'bg-primary border-primary shadow-[0_8px_24px_rgba(0,0,0,0.15)]' : 'bg-secondary border-secondary'}`}>
                    <h.icon className={`w-7 h-7 ${isDone ? 'text-primary-foreground' : 'text-foreground/60'}`} />
                  </div>
                  <h3 className="font-serif text-base text-center mb-1 tracking-tight text-foreground">{language === "ar" ? h.title : h.enTitle}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/50 mb-5">{h.done} / {h.target}</p>
                  <div className="w-full bg-secondary rounded-full h-1.5 overflow-hidden">
                    <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Tasks */}
        <section className="glass-premium rounded-[2.5rem] p-10 relative overflow-hidden hover:-translate-y-1 transition-all duration-500">
          <div className="flex justify-between items-center mb-10 relative z-10">
            <h2 className="text-3xl font-serif tracking-tight text-foreground flex items-center gap-4">
              <CheckCircle2 className="w-7 h-7 text-primary" />
              {t("tasks")}
            </h2>
            <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/50 hover:text-primary transition-colors duration-300">
              {language === 'ar' ? 'عرض الكل' : 'Show all'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4 relative z-10">
            {tasks.map((task, i) => (
              <div key={i} className={`group flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-[1.5rem] border transition-all duration-300
                ${task.done ? 'bg-background/20 border-transparent opacity-50' : 'bg-background/50 border-secondary hover:border-primary/20 shadow-sm hover:shadow-md'}`}>
                <div className="flex items-center gap-5">
                  <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-300
                    ${task.done ? 'border-primary bg-primary/10' : 'border-secondary group-hover:border-primary/40'}`}>
                    {task.done && <CheckCircle2 className="w-5 h-5 text-primary" />}
                  </div>
                  <div>
                    <h4 className={`font-serif text-xl tracking-tight transition-all ${task.done ? 'line-through text-foreground/40' : 'text-foreground'}`}>
                      {language === "ar" ? task.text : task.enText}
                    </h4>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40 mt-1">{task.time}</p>
                  </div>
                </div>
                {task.priority === 'مهم' && !task.done && (
                  <span className="mt-4 sm:mt-0 self-start sm:self-auto text-[9px] font-bold uppercase tracking-[0.3em] px-5 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 shadow-sm">
                    {language === "ar" ? task.priority : task.enPri}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── RIGHT COLUMN ── */}
      <div className="lg:col-span-4 flex flex-col gap-8 relative z-10">

        {/* AI Assistant — inverted card for bold contrast */}
        <div className="bg-foreground rounded-[2.5rem] p-10 relative overflow-hidden group shadow-[0_32px_80px_rgba(0,0,0,0.25)]">
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-primary/30 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/50 transition-colors duration-1000" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
               <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-background/50">{t("assistant")}</span>
               <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            </div>
            <p className="text-xl md:text-2xl font-serif text-background/90 leading-relaxed mb-10 italic">
              {language === "ar"
                ? "« أنجزتِ ٥٠٪ من مهامك اليوم. جلسة العناية المسائية في انتظارك. »"
                : "\u201cYou\u2019ve completed 50% of your tasks. Your evening skincare is next.\u201d"}
            </p>
            <button className="w-full bg-primary text-primary-foreground px-6 py-4 rounded-full font-bold text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-[0_8px_30px_rgba(0,0,0,0.3)] active:scale-95 group/btn">
              {language === "ar" ? "نعم، ذكرني" : "Yes, remind me"}
              <Play className="w-4 h-4 fill-current group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Mini Planner */}
        <section className="glass-premium rounded-[2.5rem] p-9 hover:-translate-y-1 transition-all duration-500">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-serif tracking-tight text-foreground">{t("planner")}</h2>
            <div className="p-3 bg-secondary rounded-full border border-secondary">
               <CalendarIcon className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="space-y-6 relative before:absolute before:inset-y-2 before:left-2 rtl:before:left-auto rtl:before:right-2 before:w-[2px] before:bg-gradient-to-b before:from-primary/40 before:to-transparent">
            {["08:00 AM", "12:00 PM", "04:00 PM"].map((time, i) => (
              <div key={i} className="flex gap-6 relative group">
                <div className="absolute left-[3px] top-2 rtl:left-auto rtl:right-[3px] w-2.5 h-2.5 rounded-full bg-primary border-2 border-background shadow-sm group-hover:scale-150 transition-transform" />
                <div className="w-16 pt-0.5 text-right rtl:text-left shrink-0 ml-4 rtl:ml-0 rtl:mr-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-foreground/50 block">{time.split(' ')[0]}</span>
                  <span className="text-[9px] font-black text-primary uppercase tracking-widest">{time.split(' ')[1]}</span>
                </div>
                <div className="flex-1 bg-background/50 border border-secondary p-4 rounded-[1.2rem] shadow-sm group-hover:shadow-md group-hover:border-primary/20 transition-all">
                  <p className="font-serif text-foreground tracking-tight">
                    {i === 0 ? (language === "ar" ? "روتين الصباح" : "Morning Routine")
                      : i === 1 ? (language === "ar" ? "عمل عميق" : "Deep Work")
                      : (language === "ar" ? "رياضة" : "Exercise")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mini Mood */}
        <section className="glass-premium rounded-[2.5rem] p-9 hover:-translate-y-1 transition-all duration-500">
          <h2 className="text-2xl font-serif tracking-tight text-foreground mb-8">{t("mood")}</h2>
          <div className="flex justify-between items-center bg-background/50 p-3 rounded-full border border-secondary">
            {["😢", "😐", "😊", "😍", "🤩"].map((emoji, i) => (
              <button key={i} className={`text-2xl w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-125 hover:bg-background
                 ${i === 3 ? "bg-background shadow-md border border-secondary scale-110" : "grayscale hover:grayscale-0"}`}>
                {emoji}
              </button>
            ))}
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-center text-foreground/50 mt-6">
            {language === "ar" ? "أنتِ تشعرين بالسعادة اليوم! ✨" : "You're feeling happy today! ✨"}
          </p>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
