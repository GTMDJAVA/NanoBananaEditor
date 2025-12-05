import React from 'react';
import { en } from './locales/en';
import { zh } from './locales/zh';

type Lang = 'en' | 'zh';

const dictionaries: Record<Lang, Record<string, string>> = {
  en,
  zh,
};

type I18nContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
};

const I18nContext = React.createContext<I18nContextValue | null>(null);

function getInitialLang(): Lang {
  const stored = typeof window !== 'undefined' ? window.localStorage.getItem('lang') : null;
  if (stored === 'zh' || stored === 'en') return stored;
  const nav = typeof navigator !== 'undefined' ? navigator.language.toLowerCase() : 'en';
  if (nav.startsWith('zh')) return 'zh';
  return 'en';
}

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = React.useState<Lang>(getInitialLang());

  const setLang = React.useCallback((next: Lang) => {
    setLangState(next);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('lang', next);
    }
  }, []);

  const t = React.useCallback(
    (key: string) => {
      const dict = dictionaries[lang];
      return dict[key] ?? dictionaries.en[key] ?? key;
    },
    [lang]
  );

  const value: I18nContextValue = { lang, setLang, t };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export function useI18n() {
  const ctx = React.useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
