import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../hooks/useUmami';
import '../Styles/OpenSourceShowcase.css';

const GITHUB_PROFILE = 'https://github.com/Hugo-Galley';

const svgProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
};

function ArrowIcon({ size = 18 }) {
  return (
    <svg {...svgProps} width={size} height={size}>
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="8 7 17 7 17 16" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M12,2A10,10,0,0,0,8.84,21.5c.5.08.66-.23.66-.5V19.31C6.73,19.91,6.14,18,6.14,18A2.69,2.69,0,0,0,5,16.5c-.91-.62.07-.6.07-.6a2.1,2.1,0,0,1,1.53,1,2.15,2.15,0,0,0,2.91.83,2.16,2.16,0,0,1,.63-1.34C8,16.17,5.62,15.31,5.62,11.5a3.87,3.87,0,0,1,1-2.71,3.58,3.58,0,0,1,.1-2.64s.84-.27,2.75,1a9.63,9.63,0,0,1,5,0c1.91-1.29,2.75-1,2.75-1a3.58,3.58,0,0,1,.1,2.64,3.87,3.87,0,0,1,1,2.71c0,3.82-2.34,4.66-4.57,4.91a2.39,2.39,0,0,1,.69,1.85V21c0,.27.16.59.67.5A10,10,0,0,0,12,2Z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="#f1c40f" stroke="#f1c40f" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

const ICONS = {
  pipeline: (size) => (
    <svg {...svgProps} width={size} height={size}>
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  ),
  box: (size) => (
    <svg {...svgProps} width={size} height={size}>
      <path d="M21 8l-9-5-9 5v8l9 5 9-5z" />
      <path d="M3 8l9 5 9-5" />
      <line x1="12" y1="13" x2="12" y2="21" />
    </svg>
  ),
  code: (size) => (
    <svg {...svgProps} width={size} height={size}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  wallet: (size) => (
    <svg {...svgProps} width={size} height={size}>
      <path d="M20 12V8H6a2 2 0 0 1 0-4h12v4" />
      <path d="M4 6v12a2 2 0 0 0 2 2h14v-4" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
    </svg>
  ),
  eyeOff: (size) => (
    <svg {...svgProps} width={size} height={size}>
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ),
};

function Tags({ items }) {
  return (
    <ul className="os-tags">
      {items.map((tag) => (
        <li key={tag} className="os-tag">{tag}</li>
      ))}
    </ul>
  );
}

export default function OpenSourceShowcase() {
  const { t, language } = useLanguage();
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

  const handleLinkClick = (name, url) => {
    trackEvent('opensource-click', { target: name, url });
  };

  const leafwiki = {
    owner: 'perber',
    repo: 'leafwiki',
    url: 'https://github.com/perber/leafwiki',
  };

  const contributions = [
    { icon: 'pipeline', n: 1 },
    { icon: 'box', n: 2 },
    { icon: 'code', n: 3 },
  ].map(({ icon, n }) => ({
    icon,
    title: t(`openSource.leafwikiC${n}Title`),
    sub: t(`openSource.leafwikiC${n}Sub`),
  }));

  const projects = [
    {
      owner: 'Hugo-Galley',
      repo: 'Numera',
      url: 'https://github.com/Hugo-Galley/numera',
      role: t('openSource.numeraRole'),
      desc: t('openSource.numeraDesc'),
      stack: ['Python', 'React', 'Docker'],
      icon: 'wallet',
      badge: null,
    },
    {
      owner: 'Hugo-Galley',
      repo: 'EasyWorkEnv',
      url: 'https://github.com/Hugo-Galley/EasyWorkEnv',
      role: t('openSource.easyWorkEnvRole'),
      desc: t('openSource.easyWorkEnvDesc'),
      stack: ['Python'],
      icon: 'box',
      badge: 'PyPI',
    },
    {
      owner: 'Hugo-Galley',
      repo: 'clean-feed',
      url: 'https://github.com/Hugo-Galley/clean-feed',
      role: t('openSource.cleanFeedRole'),
      desc: t('openSource.cleanFeedDesc'),
      stack: ['JavaScript', 'WebExtensions'],
      icon: 'eyeOff',
      badge: 'Firefox',
    },
  ];

  return (
    <section className="os-section" aria-labelledby="OpenSource">
      <div className="os-blob os-blob-1" aria-hidden="true"></div>
      <div className="os-blob os-blob-2" aria-hidden="true"></div>

      <div className="os-inner">
        <header className="os-head">
          <div>
            <p className="os-eyebrow">{t('openSource.eyebrow')}</p>
            <h2 id="OpenSource">{t('openSource.title')}</h2>
            <p className="os-intro">{t('openSource.intro')}</p>
          </div>
          <a
            href={GITHUB_PROFILE}
            target="_blank"
            rel="noreferrer"
            className="os-more"
            onClick={() => handleLinkClick('hugo-github-profile', GITHUB_PROFILE)}
          >
            <GithubIcon />
            {t('openSource.viewProfile')}
            <ArrowIcon size={16} />
          </a>
        </header>

        <a
          href={leafwiki.url}
          target="_blank"
          rel="noreferrer"
          className="os-card os-featured"
          aria-label={`${leafwiki.owner}/${leafwiki.repo} — ${t('openSource.leafwikiRole')}`}
          onClick={() => handleLinkClick(leafwiki.repo, leafwiki.url)}
        >
          <div className="os-feat">
            <div className="os-feat-main">
              <div>
                <div className="os-badges">
                  <span className="os-role os-role-solid">{t('openSource.leafwikiRole')}</span>
                  {stars !== null && (
                    <span className="os-role os-stars">
                      <StarIcon />
                      {stars.toLocaleString(language === 'fr' ? 'fr-FR' : 'en-US')} {t('openSource.stars')}
                    </span>
                  )}
                </div>
                <h3 className="os-feat-name">
                  <span className="os-owner">{leafwiki.owner}/</span>
                  {leafwiki.repo}
                </h3>
                <p className="os-feat-intro">{t('openSource.leafwikiIntro')}</p>
              </div>
              <div className="os-feat-foot">
                <Tags items={['Go', 'Docker', 'GitHub Actions']} />
                <span className="os-arrow os-arrow-lg"><ArrowIcon size={20} /></span>
              </div>
            </div>

            <div className="os-contribs">
              <p className="os-contribs-label">{t('openSource.contributions')}</p>
              {contributions.map((c) => (
                <div key={c.icon} className="os-contrib">
                  <span className="os-icon os-icon-sm">{ICONS[c.icon](22)}</span>
                  <div>
                    <p className="os-contrib-title">{c.title}</p>
                    <p className="os-contrib-sub">{c.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </a>

        <div className="os-grid">
          {projects.map((p) => (
            <a
              key={p.url}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="os-card os-project"
              aria-label={`${p.owner}/${p.repo} — ${p.role}`}
              onClick={() => handleLinkClick(p.repo, p.url)}
            >
              <div className="os-project-top">
                <span className="os-icon">{ICONS[p.icon](26)}</span>
                <div className="os-badges">
                  {p.badge && <span className="os-role os-role-tint">{p.badge}</span>}
                  <span className="os-role">{p.role}</span>
                </div>
              </div>
              <h3 className="os-project-name">
                <span className="os-owner">{p.owner}/</span>
                {p.repo}
              </h3>
              <p className="os-project-desc">{p.desc}</p>
              <div className="os-feat-foot os-project-foot">
                <Tags items={p.stack} />
                <span className="os-arrow"><ArrowIcon size={18} /></span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
