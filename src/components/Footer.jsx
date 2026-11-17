import { trackEvent } from '../hooks/useUmami';
import { useLanguage } from '../context/LanguageContext';
import { GithubGlyph, LinkedinGlyph, useEmail } from './Contact';
import '../Styles/Footer.css';

export default function Footer() {
  const { t, language, toggleLanguage } = useLanguage();
  const year = new Date().getFullYear();
  const email = useEmail();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p className="site-footer-copy">
          © {year} Hugo Galley — {t('sections.built')}
        </p>
        <nav className="site-footer-links" aria-label="Liens">
          <button type="button" className="site-footer-lang" onClick={toggleLanguage} aria-label={t('sections.language')}>
            <span className={language === 'fr' ? 'is-on' : ''}>FR</span>
            <span aria-hidden="true">/</span>
            <span className={language === 'en' ? 'is-on' : ''}>EN</span>
          </button>
          {email && <a href={`mailto:${email}`} onClick={() => trackEvent('email-click', { from: 'footer' })}>{email}</a>}
          <a href="https://github.com/Hugo-Galley" target="_blank" rel="noreferrer" aria-label="GitHub" onClick={() => trackEvent('github-profile', { from: 'footer' })}><GithubGlyph /></a>
          <a href="https://www.linkedin.com/in/hugo-galley/" target="_blank" rel="noreferrer" aria-label="LinkedIn" onClick={() => trackEvent('linkedin-open', { from: 'footer' })}><LinkedinGlyph /></a>
        </nav>
      </div>
    </footer>
  );
}
