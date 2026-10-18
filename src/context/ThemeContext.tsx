import React, { createContext, useState, useContext, useMemo, useEffect, ReactNode } from 'react';
import { readStorage, writeStorage } from '../storage';

type ThemeType = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * The theme resolved by the boot script in index.html, which runs before the
 * first paint and publishes its answer as data-boot-theme on <html>.
 *
 * Consuming that answer is what keeps the two ends from drifting apart — and
 * they had already drifted: the boot script guards its storage access and this
 * did not, so a visitor whose browser blocks storage got a SecurityError inside
 * the first render. React never mounted, and because dismissBootLoader() runs
 * only from App's mount effect, the boot overlay stayed on screen forever.
 *
 * The fallback below is reached only when the boot script did not run at all.
 */
function getInitialTheme(): ThemeType {
  const boot = document.documentElement.getAttribute('data-boot-theme');
  if (boot === 'light' || boot === 'dark') return boot;

  const stored = readStorage('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>(getInitialTheme);

  useEffect(() => {
    writeStorage('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    // Keep the published value truthful: anything reading data-boot-theme after
    // mount must not be told the theme the page had at boot.
    document.documentElement.setAttribute('data-boot-theme', theme);
  }, [theme]);

  const toggleTheme = (): void => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
