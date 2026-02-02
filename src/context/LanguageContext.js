import React, { createContext, useState, useEffect, useContext, useMemo, useCallback } from 'react';
import { translations } from '../translations';

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
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      console.log('Langue sauvegardée:', savedLanguage);
      return savedLanguage;
    }

    // Détection automatique basée sur la localisation
    const browserLang = navigator.language || navigator.userLanguage || '';
    console.log('Langue du navigateur:', browserLang);
    
    if (browserLang.toLowerCase().startsWith('fr')) {
      console.log('Détection: Français (navigateur)');
      return 'fr';
    }

    // 2. Vérifier la timezone (pour les utilisateurs avec navigateur en anglais mais en France)
    try {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      console.log('Timezone:', userTimezone);
      if (userTimezone.includes('Paris')) {
        console.log('Détection: Français (timezone Paris)');
        return 'fr';
      }
    } catch (e) {
      // Ignorer les erreurs de timezone
      console.error('Erreur timezone:', e);
    }
    
    console.log('Détection: Anglais (défaut)');
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage(prevLang => prevLang === 'fr' ? 'en' : 'fr');
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
