import React, { createContext, useState, useContext, useMemo, useEffect, ReactNode } from 'react';

type LanguageType = 'en' | 'es';

interface LanguageContextType {
  language: LanguageType;
  toggleLanguage: () => void;
}

interface LanguageProviderProps {
  children: ReactNode;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getInitialLanguage(): LanguageType {
  const urlLang = new URLSearchParams(window.location.search).get('lang');
  if (urlLang === 'en' || urlLang === 'es') return urlLang;
  const stored = localStorage.getItem('language');
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
    localStorage.setItem('language', language);
  }, [language]);

  // Sync document language, title, and search/social meta tags with the active language
  useEffect(() => {
    document.documentElement.lang = language;

    const localized =
      language === 'en'
        ? {
            title: 'Sergio M. Curbelo — Fullstack Web Developer',
            description:
              'Fullstack Web Developer — I build real solutions for businesses and brands. React, Node.js, TypeScript, Electron, Spring Boot & more.',
            url: 'https://smcurbelo.com/',
          }
        : {
            title: 'Sergio M. Curbelo — Desarrollador Fullstack',
            description:
              'Desarrollador Fullstack — Construyo soluciones reales para empresas y marcas. React, Node.js, TypeScript, Electron, Spring Boot y más.',
            url: 'https://smcurbelo.com/?lang=es',
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
