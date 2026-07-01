import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { en, ar, fr } from "./translations";

export type Locale = "en" | "ar" | "fr";
type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { en, ar, fr };

interface LanguageContextType {
  locale: Locale;
  setLocale: (loc: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  dir: "ltr" | "rtl";
  isAr: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    return (localStorage.getItem("thabbit_locale") as Locale) || "ar";
  });

  const setLocale = (loc: Locale) => {
    setLocaleState(loc);
    localStorage.setItem("thabbit_locale", loc);
  };

  const dir: "rtl" | "ltr" = locale === "ar" ? "rtl" : "ltr";
  const isAr = locale === "ar";

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  const t = (path: string, params?: Record<string, string | number>) => {
    const keys = path.split(".");
    let current: any = dictionaries[locale];
    
    for (const key of keys) {
      if (current === undefined || current[key] === undefined) {
        console.warn(`Translation missing for key: ${path} in locale: ${locale}`);
        return path;
      }
      current = current[key];
    }
    
    let str = current as string;
    
    if (params) {
      Object.keys(params).forEach((k) => {
        str = str.replace(new RegExp(`{${k}}`, "g"), String(params[k]));
      });
    }
    
    return str;
  };

  const value = useMemo(() => ({ locale, setLocale, t, dir, isAr }), [locale, dir, isAr]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}
