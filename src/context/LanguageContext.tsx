import React, { createContext, useState, useContext, useMemo, useEffect, ReactNode } from 'react';
import { readStorage, writeStorage } from '../storage';

type LanguageType = 'en' | 'es';

interface LanguageContextType {
  language: LanguageType;
  toggleLanguage: () => void;
}

interface LanguageProviderProps {
  children: ReactNode;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * The language resolved by the boot script in index.html, published as
 * data-boot-lang on <html>. Consuming it instead of resolving the language a
 * second time is what keeps the boot loader's label and the mounted app from
 * disagreeing. The fallback below is reached only when the boot script did not
 * run at all.
 */
function getInitialLanguage(): LanguageType {
  const boot = document.documentElement.getAttribute('data-boot-lang');
  if (boot === 'en' || boot === 'es') return boot;

  const urlLang = new URLSearchParams(window.location.search).get('lang');
  if (urlLang === 'en' || urlLang === 'es') return urlLang;
  const stored = readStorage('language');
  if (stored === 'en' || stored === 'es') return stored;
  return 'en';
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageType>(getInitialLanguage);

  useEffect(() => {
    writeStorage('language', language);
  }, [language]);

  // Sync document language, title, and search/social meta tags with the active language
  useEffect(() => {
    document.documentElement.lang = language;
    // Same reason as data-boot-theme in ThemeContext: never leave the value the
    // boot script published misreporting the language the page is in.
    document.documentElement.setAttribute('data-boot-lang', language);

    const localized =
      language === 'en'
        ? {
            title: 'Sergio M. Curbelo — Fullstack Product Engineer',
            description:
              'Fullstack Product Engineer — I build real solutions for businesses and brands. React, Node.js, TypeScript, Electron, Spring Boot & more.',
            url: 'https://smcurbelo.vercel.app/',
          }
        : {
            title: 'Sergio M. Curbelo — Desarrollador Fullstack',
            description:
              'Desarrollador Fullstack — Construyo soluciones reales para empresas y marcas. React, Node.js, TypeScript, Electron, Spring Boot y más.',
            url: 'https://smcurbelo.vercel.app/?lang=es',
          };

    const setMeta = (selector: string, attr: string, value: string): void => {
      const meta = document.querySelector(selector);
      if (meta) meta.setAttribute(attr, value);
    };

    document.title = localized.title;
    setMeta('meta[name="description"]', 'content', localized.description);
    setMeta('meta[property="og:title"]', 'content', localized.title);
    setMeta('meta[property="og:description"]', 'content', localized.description);
    setMeta('meta[property="og:url"]', 'content', localized.url);
    setMeta('meta[name="twitter:title"]', 'content', localized.title);
    setMeta('meta[name="twitter:description"]', 'content', localized.description);
  }, [language]);

  const toggleLanguage = (): void => {
    setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'es' : 'en'));
  };

  const value = useMemo(() => ({ language, toggleLanguage }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
