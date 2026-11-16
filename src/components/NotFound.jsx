import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/NotFound.css';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../hooks/useUmami';
import Footer from './Footer';

/* 404: same look as the rest of the site, above the globe seen as a horizon */
function NotFound() {
  const { t } = useLanguage();

  useEffect(() => {
    trackEvent('404-hit', { path: window.location.pathname });
  }, []);

  return (
    <>
      <div className="error-container container">
        <div className="error-content">
          <p className="error-kicker">{t('notFound.kicker')}</p>
          <h1 className="error-title">
            {t('notFound.title')} <span className="section-muted">{t('notFound.muted')}</span>
          </h1>
          <p className="error-description">{t('notFound.description')}</p>
          <div className="error-actions">
            <Link to="/" className="btn btn--primary btn--lg">
              {t('notFound.button')}
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
            <Link to="/" state={{ scrollTo: 'Projects' }} className="btn btn--ghost btn--lg">
              {t('notFound.projects')}
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default NotFound;
