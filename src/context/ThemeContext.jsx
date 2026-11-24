import { createContext, useState, useEffect, useContext } from 'react';
import { trackEvent } from '../hooks/useUmami';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

/*
 * Light mode is switched OFF for now: the redesign (3D globe, surfaces, contrast) was only
 * tuned for dark. All the light styles ([data-theme="light"] rules) and this toggle logic are
 * kept so it can be brought back later: set LIGHT_MODE_ENABLED to true and add a theme
 * button (e.g. next to the language switch in Footer.jsx) that calls toggleTheme.
 */
export const LIGHT_MODE_ENABLED = false;

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (!LIGHT_MODE_ENABLED) return 'dark';
    let savedTheme = null;
    try {
      savedTheme = localStorage.getItem('theme');
    } catch (e) {
      // localStorage indisponible (navigation privée, stockage bloqué)
    }
    return savedTheme === 'light' ? 'light' : 'dark';
  });

  useEffect(() => {
    if (LIGHT_MODE_ENABLED) {
      try {
        localStorage.setItem('theme', theme);
      } catch (e) {
        // localStorage indisponible
      }
    }
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    if (!LIGHT_MODE_ENABLED) return;
    setTheme(prevTheme => {
        const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
        trackEvent('theme-switch', { theme: newTheme });
        return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
