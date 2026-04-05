import React from "react";
import {
  Droplet,
  Dumbbell,
  BookOpen,
  Sparkles,
  Plus,
  Play,
  Calendar as CalendarIcon,
  ArrowRight,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";

const Dashboard = () => {
  const { t, language } = useAppContext();

  const habits = [
    {
      title: "شرب الماء",
      enTitle: "Water",
      icon: Droplet,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      done: 4,
      target: 8,
    },
    {
      title: "رياضة (تمارين مقاومة)",
      enTitle: "Workout",
      icon: Dumbbell,
      color: "text-primary",
      bg: "bg-primary/10",
      done: 1,
      target: 1,
    },
    {
      title: "قراءة 20 صفحة",
      enTitle: "Read 20 pages",
      icon: BookOpen,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      done: 0,
      target: 1,
    },
    {
      title: "وقت لنفسي (تأمل)",
      enTitle: "Meditation",
      icon: Sparkles,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      done: 0,
      target: 1,
    },
  ];

  const tasks = [
    {
      text: "الرد على الإيميلات",
      enText: "Reply to emails",
      priority: "عادي",
      enPri: "Normal",
      time: "10:00 AM",
    },
    {
      text: "تحضير وجبة الغداء",
      enText: "Prepare lunch",
      priority: "مهم",
      enPri: "High",
      time: "01:30 PM",
    },
    {
      text: "جلسة العناية المسائية 🧴",
      enText: "Evening Skincare 🧴",
      priority: "عادي",
      enPri: "Normal",
      time: "09:00 PM",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-max pr-2 pb-10">
      {/* LEFT COLUMN (Habits & Smart Assistant) */}
      <div className="lg:col-span-2 space-y-6">
        {/* Habit Tracker */}
        <section className="glass rounded-3xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary">
              {t("habits")}
            </h2>
            <button className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors">
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {habits.map((h, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center p-4 rounded-2xl bg-secondary/50 border border-transparent hover:border-primary/20 hover:scale-[1.02] transition-all cursor-pointer"
              >
                <div
                  className={`w-14 h-14 rounded-full ${h.bg} ${h.color} flex items-center justify-center mb-3 shadow-inner`}
                >
                  <h.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-sm text-center mb-1 leading-tight">
                  {language === "ar" ? h.title : h.enTitle}
                </h3>
                <p className="text-xs text-foreground/50">
                  {h.done} / {h.target}
                </p>
                <div className="w-full bg-black/5 rounded-full h-1.5 mt-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-primary to-accent h-full"
                    style={{ width: `${(h.done / h.target) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Daily Tasks */}
        <section className="glass rounded-3xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary">
              {t("tasks")}
            </h2>
            <button className="flex items-center gap-2 text-sm text-primary font-semibold hover:opacity-80 transition-opacity">
              Show all <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {tasks.map((t, i) => (
              <div
                key={i}
                className="group flex items-center justify-between p-4 bg-secondary/30 rounded-2xl hover:bg-white dark:hover:bg-card border border-transparent hover:border-primary/20 transition-all shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-md border-2 border-primary/30 flex items-center justify-center cursor-pointer group-hover:border-primary transition-colors"></div>
                  <div>
                    <h4 className="font-semibold text-sm">
                      {language === "ar" ? t.text : t.enText}
                    </h4>
                    <p className="text-xs text-foreground/50 mt-0.5">
                      {t.time}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-bold px-3 py-1 rounded-full ${t.priority === "مهم" ? "bg-red-100 text-red-600" : "bg-primary/10 text-primary"}`}
                >
                  {language === "ar" ? t.priority : t.enPri}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* RIGHT COLUMN (Planner, Mood, Assistant) */}
      <div className="space-y-6">
        {/* Smart Assistant Card */}
        <div className="bg-gradient-to-br from-primary to-accent rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-white/90" />
              <h3 className="font-bold text-lg">{t("assistant")}</h3>
            </div>
            <p className="text-sm text-white/90 leading-relaxed font-medium mb-5">
              {language === "ar"
                ? "يبدو أنك أنجزت 50% من مهامك اليوم وتنتظرك جلسة عناية مسائية. هل ترغبين بتذكيرك بها عند التاسعة؟"
                : "You've completed 50% of your tasks today. Your evening skincare routing is up next. Shall I remind you at 9 PM?"}
            </p>
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-5 py-2.5 rounded-xl font-bold text-sm w-full transition-colors flex justify-center items-center gap-2 shadow-sm">
              {language === "ar" ? "نعم، ذكرني" : "Yes, remind me"}{" "}
              <Play className="w-4 h-4 fill-white border-0" />
            </button>
          </div>
        </div>

        {/* Mood Tracker */}
        <section className="glass rounded-3xl p-6">
          <h2 className="text-xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary">
            {t("mood")}
          </h2>
          <div className="flex justify-between items-center bg-secondary/50 p-2 rounded-full">
            {["😢", "😐", "😊", "😍", "🤩"].map((emoji, i) => (
              <button
                key={i}
                className={`text-2xl w-12 h-12 flex items-center justify-center rounded-full transition-transform hover:scale-125 hover:bg-white ${i === 3 ? "bg-white shadow-sm border border-primary/20 scale-110" : ""}`}
              >
                {emoji}
              </button>
            ))}
          </div>
          <p className="text-xs text-center text-foreground/50 mt-4 font-medium">
            {language === "ar"
              ? "أنت تشعرين بالسعادة اليوم! استمري"
              : "You're feeling happy today! Keep it up"}
          </p>
        </section>

        {/* Mini Daily Planner */}
        <section className="glass rounded-3xl p-6">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary">
              {t("planner")}
            </h2>
            <CalendarIcon className="w-5 h-5 text-primary" />
          </div>
          <div className="space-y-4 relative before:absolute before:inset-y-0 before:left-3 md:before:left-auto md:before:right-3 before:w-0.5 before:bg-primary/20">
            {["08:00 AM", "12:00 PM", "04:00 PM"].map((time, i) => (
              <div key={i} className="flex gap-4">
                <span className="text-xs font-bold text-primary w-16 pt-1 text-right">
                  {time}
                </span>
                <div className="flex-1 bg-secondary/50 p-3 rounded-xl border border-transparent hover:border-primary/20 shadow-sm relative z-10 transition-colors">
                  <p className="text-sm font-semibold">
                    {i === 0
                      ? language === "ar"
                        ? "روتين الصباح"
                        : "Morning Routine"
                      : i === 1
                        ? language === "ar"
                          ? "عمل عميق"
                          : "Deep Work"
                        : language === "ar"
                          ? "رياضة"
                          : "Exercise"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
