import React, { createContext, useContext, useState, useEffect } from "react";
import { settingsService } from "../services/api";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState("vibrant");
  const [language, setLanguage] = useState("ar");
  const [userName, setUserName] = useState("إشراق");
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [confirmState, setConfirmState] = useState(null);
  const confirmResolverRef = React.useRef(null);

  // Load settings from DB on mount
  useEffect(() => {
    settingsService.getSettings().then(data => {
      if (data) {
        setUserName(data.user_name);
        setAvatarIndex(data.avatar_index);
        setTheme(data.theme);
        setLanguage(data.language);
      }
    });
  }, []);

  // Notification helper
  const showNotification = (message, type = "success") => {
    const id = Date.now();
    setNotification({ id, message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Confirm dialog helper — usage: const ok = await confirm({ title, message });
  const confirm = ({ title, message, confirmLabel, cancelLabel, danger = true }) => {
    return new Promise((resolve) => {
      confirmResolverRef.current = resolve;
      setConfirmState({
        title,
        message,
        danger,
        confirmLabel: confirmLabel || (language === 'ar' ? 'تأكيد' : 'Confirm'),
        cancelLabel: cancelLabel || (language === 'ar' ? 'إلغاء' : 'Cancel'),
      });
    });
  };

  const resolveConfirm = (result) => {
    if (confirmResolverRef.current) confirmResolverRef.current(result);
    confirmResolverRef.current = null;
    setConfirmState(null);
  };

  // Sync settings helper
  const updateProfile = async (updates) => {
    const newSettings = {
      user_name: updates.userName !== undefined ? updates.userName : userName,
      avatar_index: updates.avatarIndex !== undefined ? updates.avatarIndex : avatarIndex,
      theme: updates.theme !== undefined ? updates.theme : theme,
      language: updates.language !== undefined ? updates.language : language,
      notifications_enabled: 1
    };
    
    await settingsService.updateSettings(newSettings);
    
    if (updates.userName !== undefined) setUserName(updates.userName);
    if (updates.avatarIndex !== undefined) setAvatarIndex(updates.avatarIndex);
    if (updates.theme !== undefined) setTheme(updates.theme);
    if (updates.language !== undefined) setLanguage(updates.language);
    
    showNotification(language === 'ar' ? 'تم تحديث الإعدادات بنجاح! ✨' : 'Settings updated successfully! ✨');
  };

  // Apply theme class to document
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    if (theme === "dark" || theme === "elegant") {
      document.documentElement.classList.add("dark");
    }
  }, [theme]);

  // Apply RTL/LTR
  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
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
      hello: { ar: `مرحباً، ${userName} ✨`, en: `Hello, ${userName} ✨` },
      quote: {
        ar: "خطوة صغيرة كل يوم تصنع إنجازاً عظيماً.",
        en: "A small step every day creates a great achievement.",
      },
      vibrant: { ar: "وردي حيوي", en: "Vibrant Pink" },
      calm: { ar: "هادئ ومريح", en: "Calm Pastel" },
      elegant: { ar: "فخم وأنيق", en: "Elegant Dark" },
      add: { ar: "إضافة", en: "Add" },
      save: { ar: "حفظ", en: "Save" },
      cancel: { ar: "إلغاء", en: "Cancel" },
      delete: { ar: "حذف", en: "Delete" },
      edit: { ar: "تعديل", en: "Edit" },
      close: { ar: "إغلاق", en: "Close" },
      loading: { ar: "جارٍ التحميل...", en: "Loading..." },
      errorGeneric: { ar: "حدث خطأ، حاولي مرة أخرى.", en: "Something went wrong. Please try again." },
      confirmDeleteTitle: { ar: "هل أنتِ متأكدة؟", en: "Are you sure?" },
      confirmDeleteTask: { ar: "سيتم حذف هذه المهمة نهائياً ولا يمكن التراجع عن ذلك.", en: "This task will be permanently deleted. This can't be undone." },
      confirmDeleteVision: { ar: "سيتم حذف هذه الصورة من لوحة إلهامك نهائياً.", en: "This image will be permanently removed from your vision board." },
      level: { ar: "المستوى", en: "Level" },
    };
    return dictionary[key]?.[language] || key;
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        language,
        setLanguage,
        userName,
        setUserName,
        avatarIndex,
        setAvatarIndex,
        updateProfile,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        notification,
        showNotification,
        confirmState,
        confirm,
        resolveConfirm,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
