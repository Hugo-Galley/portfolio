import { useState } from 'react';
import { trackEvent } from '../hooks/useUmami';
import { useLanguage } from '../context/LanguageContext';

const EMAIL = 'contact@galleyhugo.com';

export const GithubGlyph = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-3.16 19.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5A10 10 0 0 0 12 2Z" />
  </svg>
);

export const LinkedinGlyph = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

/* Final call to action: a single panel over the globe turned towards Paris */
export default function Contact() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const copy = () => {
    if (navigator.clipboard) navigator.clipboard.writeText(EMAIL).catch(() => {});
    setCopied(true);
    trackEvent('contact-email-copy');
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="contact container">
      <div className="surface contact-panel">
        <p className="contact-text">{t('sections.contactText')}</p>
        <button type="button" className="contact-email" onClick={copy}>
          <span className="contact-email-addr">{EMAIL}</span>
          <span className={`contact-email-hint${copied ? ' is-copied' : ''}`}>
            {copied ? t('contact.copied') : t('sections.copyEmail')}
          </span>
        </button>
        <div className="contact-actions">
          <a className="btn btn--primary" href={`mailto:${EMAIL}`} onClick={() => trackEvent('contact-email')}>
            {t('sections.writeMe')}
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
          <a className="btn btn--ghost" href="https://github.com/Hugo-Galley" target="_blank" rel="noreferrer" onClick={() => trackEvent('contact-github-profile')}>
            <GithubGlyph /> GitHub
          </a>
          <a className="btn btn--ghost" href="https://www.linkedin.com/in/hugo-galley/" target="_blank" rel="noreferrer" onClick={() => trackEvent('contact-linkedin')}>
            <LinkedinGlyph /> LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
