import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState("vibrant"); // vibrant, calm, elegant
  const [language, setLanguage] = useState("ar"); // ar, en

  // Apply theme class to body
  useEffect(() => {
    document.body.className = "";
    if (theme === "calm") document.body.classList.add("theme-calm");
    if (theme === "elegant") document.body.classList.add("theme-elegant");
  }, [theme]);

  // Apply RTL/LTR and font
  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
    if (language === "ar") {
      document.body.style.fontFamily = "'Cairo', sans-serif";
    } else {
      document.body.style.fontFamily = "'Inter', sans-serif";
    }
  }, [language]);

  // Dictionary for basic translations
  const t = (key) => {
    const dictionary = {
      overview: { ar: "نظرة عامة", en: "Overview" },
      tasks: { ar: "إدارة المهام", en: "Tasks" },
      habits: { ar: "تتبع العادات", en: "Habits" },
      planner: { ar: "الجدول اليومي", en: "Daily Planner" },
      wellness: { ar: "الصحة والعناية", en: "Wellness" },
      mood: { ar: "تتبع المزاج", en: "Mood Tracker" },
      insights: { ar: "التحليلات", en: "Insights" },
      challenges: { ar: "التحديات", en: "Challenges" },
      journal: { ar: "يومياتي", en: "Journal" },
      vision: { ar: "لوحة الأهداف", en: "Vision Board" },
      settings: { ar: "الإعدادات", en: "Settings" },
      assistant: { ar: "المساعد الذكي", en: "Smart Assistant" },
      hello: { ar: "مرحباً، إشراق ✨", en: "Hello, Ishraq ✨" },
      quote: {
        ar: "خطوة صغيرة كل يوم تصنع إنجازاً عظيماً.",
        en: "A small step every day creates a great achievement.",
      },
      vibrant: { ar: "وردي حيوي", en: "Vibrant Pink" },
      calm: { ar: "هادئ ومريح", en: "Calm Pastel" },
      elegant: { ar: "فخم وأنيق", en: "Elegant Dark" },
    };
    return dictionary[key]?.[language] || key;
  };

  return (
    <AppContext.Provider value={{ theme, setTheme, language, setLanguage, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
