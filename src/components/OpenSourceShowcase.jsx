import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../hooks/useUmami';
import '../Styles/OpenSourceShowcase.css';

export default function OpenSourceShowcase() {
  const { t } = useLanguage();
  const [stars, setStars] = useState(null);
  const [publicRepos, setPublicRepos] = useState(null);
  const [totalStars, setTotalStars] = useState(null);

  // Fetch LeafWiki stars (contribution majeure)
  useEffect(() => {
    fetch('https://api.github.com/repos/perber/leafwiki')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.stargazers_count === 'number') {
          setStars(data.stargazers_count);
        }
      })
      .catch((err) => console.error('Erreur fetch GitHub stars:', err));
  }, []);

  // Fetch profil GitHub Hugo → repos publics + cumul stars
  useEffect(() => {
    fetch('https://api.github.com/users/Hugo-Galley')
      .then((res) => res.json())
      .then((userData) => {
        if (userData && typeof userData.public_repos === 'number') {
          setPublicRepos(userData.public_repos);
        }

        // Cumul des stars sur tous les repos
        return fetch('https://api.github.com/users/Hugo-Galley/repos?per_page=100&type=owner');
      })
      .then((res) => res.json())
      .then((repos) => {
        if (Array.isArray(repos)) {
          const total = repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
          setTotalStars(total);
        }
      })
      .catch((err) => console.error('Erreur fetch GitHub profil:', err));
  }, []);

  const handleLinkClick = (name, url) => {
    trackEvent('opensource-click', { target: name, url });
  };

  const leafwikiTechs = ['Docker', 'GitHub Actions', 'CI/CD', 'CSS3', 'DevOps'];

  return (
    <section className="os-showcase-section" aria-labelledby="OpenSource">

      {/* Section Header intégré */}
      <div className="os-section-header">
        <span className="os-section-badge" aria-hidden="true">Open Source</span>
        <h2 id="OpenSource" className="os-section-title">{t('openSource.title')}</h2>
        <p className="os-section-subtitle">{t('openSource.subtitle')}</p>

        <div className="os-stats-row" aria-label="GitHub statistics">
          <div className="os-stat-item">
            <span className="os-stat-num">
              {publicRepos !== null ? publicRepos : '—'}
            </span>
            <span className="os-stat-label">{t('openSource.statRepos')}</span>
          </div>
          <div className="os-stat-divider" aria-hidden="true" />
          <div className="os-stat-item">
            <span className="os-stat-num">1</span>
            <span className="os-stat-label">{t('openSource.statPackage')}</span>
          </div>
          <div className="os-stat-divider" aria-hidden="true" />
          <div className="os-stat-item">
            <span className="os-stat-num">
              {totalStars !== null ? (totalStars > 0 ? totalStars : '—') : '—'}
            </span>
            <span className="os-stat-label">{t('openSource.statStars')}</span>
          </div>
        </div>
      </div>

      <div className="os-grid">
        {/* Carte Principale : LeafWiki Feature */}
        <article className="os-card os-card-main">
          <div className="os-card-header">
            <div className="os-badge-group">
              <span className="os-pill-badge os-pill-accent">
                <span className="os-pulse-dot" aria-hidden="true"></span>
                {t('openSource.featuredBadge')}
              </span>
              {stars !== null && (
                <div className="os-stars-badge" title={`${stars} GitHub stars`}>
                  <svg
                    className="os-star-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <span>{stars} stars</span>
                </div>
              )}
            </div>

            <div className="os-title-wrapper">
              <div className="os-logo-disc" aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  fill="currentColor"
                >
                  <path d="M12,2A10,10,0,0,0,8.84,21.5c.5.08.66-.23.66-.5V19.31C6.73,19.91,6.14,18,6.14,18A2.69,2.69,0,0,0,5,16.5c-.91-.62.07-.6.07-.6a2.1,2.1,0,0,1,1.53,1,2.15,2.15,0,0,0,2.91.83,2.16,2.16,0,0,1,.63-1.34C8,16.17,5.62,15.31,5.62,11.5a3.87,3.87,0,0,1,1-2.71,3.58,3.58,0,0,1,.1-2.64s.84-.27,2.75,1a9.63,9.63,0,0,1,5,0c1.91-1.29,2.75-1,2.75-1a3.58,3.58,0,0,1,.1,2.64,3.87,3.87,0,0,1,1,2.71c0,3.82-2.34,4.66-4.57,4.91a2.39,2.39,0,0,1,.69,1.85V21c0,.27.16.59.67.5A10,10,0,0,0,12,2Z" />
                </svg>
              </div>
              <div>
                <h3 className="os-project-name">LeafWiki</h3>
                <p className="os-project-role">{t('openSource.leafwikiRole')}</p>
              </div>
            </div>
          </div>

          <div className="os-card-body">
            <p className="os-description">{t('openSource.leafwikiIntro')}</p>

            <div className="os-contributions-box">
              <h4 className="os-contributions-title">{t('openSource.contributionsTitle')}</h4>
              <ul className="os-contributions-list">
                <li>
                  <span className="os-bullet-icon" aria-hidden="true">⚡</span>
                  <span>{t('openSource.contribution1')}</span>
                </li>
                <li>
                  <span className="os-bullet-icon" aria-hidden="true">🐳</span>
                  <span>{t('openSource.contribution2')}</span>
                </li>
                <li>
                  <span className="os-bullet-icon" aria-hidden="true">🎨</span>
                  <span>{t('openSource.contribution3')}</span>
                </li>
              </ul>
            </div>

            <div className="os-tech-tags" aria-label="Technologies">
              {leafwikiTechs.map((tech) => (
                <span key={tech} className="os-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="os-card-footer">
            <a
              href="https://github.com/perber/leafwiki"
              target="_blank"
              rel="noreferrer"
              className="os-cta-button os-cta-primary"
              onClick={() => handleLinkClick('leafwiki-repo', 'https://github.com/perber/leafwiki')}
            >
              <span>{t('openSource.viewRepo')}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="os-external-icon"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </article>

        {/* Carte Complémentaire : Profil & Projets Open Source Hugo */}
        <article className="os-card os-card-side">
          <div className="os-card-header">
            <span className="os-pill-badge os-pill-subtle">{t('openSource.hubBadge')}</span>
            <h3 className="os-side-title">{t('openSource.hubTitle')}</h3>
          </div>

          <div className="os-card-body">
            <p className="os-side-desc">{t('openSource.hubDesc')}</p>

            {/* Mini-card EasyWorkEnv (création personnelle open source) */}
            <div className="os-package-spotlight">
              <div className="os-package-header">
                <span className="os-pill-mini">{t('openSource.myPackageBadge')}</span>
                <span className="os-package-pypi-badge">PyPI / GitHub</span>
              </div>
              <h4 className="os-package-title">{t('openSource.myPackageTitle')}</h4>
              <p className="os-package-desc">{t('openSource.myPackageDesc')}</p>
              <div className="os-package-tags">
                <span className="os-tag-mini">Python</span>
                <span className="os-tag-mini">PyPI</span>
                <span className="os-tag-mini">Automation</span>
              </div>
            </div>
          </div>

          <div className="os-card-footer">
            <a
              href="https://github.com/Hugo-Galley"
              target="_blank"
              rel="noreferrer"
              className="os-cta-button os-cta-secondary"
              onClick={() => handleLinkClick('hugo-github-profile', 'https://github.com/Hugo-Galley')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="os-btn-github-icon"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>{t('openSource.viewProfile')}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="os-external-icon"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
