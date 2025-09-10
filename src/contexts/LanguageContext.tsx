import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { dict, LangKey } from "@/i18n/translations";

interface LangContextType {
  lang: LangKey;
  setLang: (l: LangKey) => void;
  t: (key: keyof typeof dict["en"]) => string;
}

const LangContext = createContext<LangContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<LangKey>((localStorage.getItem("lang") as LangKey) || "en");
  const setLang = (l: LangKey) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useMemo(() => (key: keyof typeof dict["en"]) => dict[lang][key] || dict.en[key], [lang]);

  const value = { lang, setLang, t };
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
};

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
