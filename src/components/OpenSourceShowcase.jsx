import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../hooks/useUmami';
import '../Styles/OpenSourceShowcase.css';

const GITHUB_PROFILE = 'https://github.com/Hugo-Galley';

function ArrowIcon() {
  return (
    <svg
      className="os-entry-arrow"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="7" y1="17" x2="17" y2="7"></line>
      <polyline points="8 7 17 7 17 16"></polyline>
    </svg>
  );
}

export default function OpenSourceShowcase() {
  const { t } = useLanguage();
  const [stars, setStars] = useState(null);

  // Stars LeafWiki (contribution principale)
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

  const entries = [
    {
      owner: 'perber',
      repo: 'leafwiki',
      url: 'https://github.com/perber/leafwiki',
      role: t('openSource.leafwikiRole'),
      desc: t('openSource.leafwikiDesc'),
      stack: ['Go', 'Docker', 'GitHub Actions'],
      meta: stars !== null ? `★ ${stars.toLocaleString()}` : null,
    },
    {
      owner: 'Hugo-Galley',
      repo: 'EasyWorkEnv',
      url: 'https://github.com/Hugo-Galley/EasyWorkEnv',
      role: t('openSource.easyWorkEnvRole'),
      desc: t('openSource.easyWorkEnvDesc'),
      stack: ['Python'],
      meta: 'PyPI',
    },
  ];

  const handleLinkClick = (name, url) => {
    trackEvent('opensource-click', { target: name, url });
  };

  return (
    <section className="os-section" aria-labelledby="OpenSource">
      <h2 id="OpenSource">{t('openSource.title')}</h2>

      <ol className="os-log">
        {entries.map((entry) => (
          <li key={entry.url} className="os-entry">
            <div className="os-entry-head">
              <a
                href={entry.url}
                target="_blank"
                rel="noreferrer"
                className="os-entry-name"
                onClick={() => handleLinkClick(entry.repo, entry.url)}
              >
                <span className="os-entry-owner">{entry.owner}/</span>
                {entry.repo}
              </a>
              {entry.meta && <span className="os-entry-meta">{entry.meta}</span>}
              <ArrowIcon />
            </div>
            <p className="os-entry-role">{entry.role}</p>
            <p className="os-entry-desc">{entry.desc}</p>
            <p className="os-entry-stack">{entry.stack.join(' · ')}</p>
          </li>
        ))}
      </ol>

      <a
        href={GITHUB_PROFILE}
        target="_blank"
        rel="noreferrer"
        className="os-more"
        onClick={() => handleLinkClick('hugo-github-profile', GITHUB_PROFILE)}
      >
        {t('openSource.viewProfile')} ↗
      </a>
    </section>
  );
}
