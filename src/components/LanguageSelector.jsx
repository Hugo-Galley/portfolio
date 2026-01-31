import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import '../Styles/LanguageSelector.css';

export default function LanguageSelector() {
  const { language, toggleLanguage } = useLanguage();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleLanguage();
    }
  };

  return (
    <button 
      className="language-selector" 
      onClick={toggleLanguage}
      onKeyDown={handleKeyDown}
      aria-label={`Switch to ${language === 'fr' ? 'English' : 'French'}`}
    >
      <span className={`lang-option ${language === 'fr' ? 'active' : ''}`}>
        FR
      </span>
      <span className={`lang-option ${language === 'en' ? 'active' : ''}`}>
        EN
      </span>
    </button>
  );
}
