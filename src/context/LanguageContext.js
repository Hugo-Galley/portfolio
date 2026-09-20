import { createContext, useState, useEffect, useContext, useMemo, useCallback } from 'react';
import { translations } from '../translations';
import { trackEvent } from '../hooks/useUmami';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // 1. Check URL query param (e.g. ?lang=fr or ?lang=en)
    if (typeof window !== 'undefined' && window.location.search) {
      const urlParams = new URLSearchParams(window.location.search);
      const paramLang = urlParams.get('lang');
      if (paramLang === 'fr' || paramLang === 'en') {
        return paramLang;
      }
    }

    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      return savedLanguage;
    }

    const browserLang = navigator.language || navigator.userLanguage || '';

    if (browserLang.toLowerCase().startsWith('fr')) {
      return 'fr';
    }

    try {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (userTimezone.includes('Paris')) {
        return 'fr';
      }
    } catch (e) {
      console.error('Erreur timezone:', e);
    }

    return 'en';
  });

  useEffect(() => {
    // Sync with URL query parameter if present
    if (typeof window !== 'undefined' && window.location.search) {
      const urlParams = new URLSearchParams(window.location.search);
      const paramLang = urlParams.get('lang');
      if ((paramLang === 'fr' || paramLang === 'en') && paramLang !== language) {
        setLanguage(paramLang);
        return;
      }
    }

    localStorage.setItem('language', language);
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage(prevLang => {
        const newLang = prevLang === 'fr' ? 'en' : 'fr';
        trackEvent('language-switch', { from: prevLang, to: newLang });
        return newLang;
    });
  }, []);

  const t = useCallback((key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  }, [language]);

  const contextValue = useMemo(() => ({
    language,
    toggleLanguage,
    t
  }), [language, toggleLanguage, t]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};
