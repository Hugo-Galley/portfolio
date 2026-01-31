import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/NotFound.css';
import { useLanguage } from '../context/LanguageContext';

function NotFound() {
  const { t } = useLanguage();
  
  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="title">{t('notFound.title')}</h1>
        <h2 className="subtitle">{t('notFound.subtitle')}</h2>
        <p className="description">
          {t('notFound.description')}
        </p>
        <Link to="/" className="home-button">
          {t('notFound.button')}
        </Link>
      </div>

    </div>
  );
}

export default NotFound;