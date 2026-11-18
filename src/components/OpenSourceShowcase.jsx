import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../hooks/useUmami';
import { GithubGlyph } from './Contact';

const GITHUB_PROFILE = 'https://github.com/Hugo-Galley';
const LEAFWIKI = { owner: 'perber', repo: 'leafwiki', url: 'https://github.com/perber/leafwiki' };

const trackRepo = (repo) => trackEvent('opensource-repo', { repo });

/* Open source: the LeafWiki contribution first, then a plain list of my own repositories */
export default function OpenSourceShowcase() {
  const { t, language } = useLanguage();
  const [stars, setStars] = useState(null);

  useEffect(() => {
    // not during pre-rendering: the HTML must match the first client render (no stars yet)
    if (navigator.webdriver) return;
    fetch('https://api.github.com/repos/perber/leafwiki')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.stargazers_count === 'number') setStars(data.stargazers_count);
      })
      .catch(() => {});
  }, []);

  const contributions = [1, 2, 3].map((n) => ({
    title: t(`openSource.leafwikeC${n}Title`),
    sub: t(`openSource.leafwikeC${n}Sub`),
  }));

  const projects = [
    // each row opens the project page (screenshot, demo, links) rather than the bare repo
    { repo: 'Numera', project: 'Numera', to: '/numera/', desc: t('openSource.numeraDesc'), meta: 'Python · React · Docker' },
    { repo: 'EasyWorkEnv', project: 'EasyWorkEnv', to: '/easyworkenv/', desc: t('openSource.easyWorkEnvDesc'), meta: 'Python · PyPI' },
    { repo: 'clean-feed', project: 'Clean Feed', to: '/clean-feed/', desc: t('openSource.cleanFeedDesc'), meta: 'JavaScript · Firefox, Chrome' },
  ];

  const meta = [
    stars !== null ? `★ ${stars.toLocaleString(language === 'fr' ? 'fr-FR' : 'en-US')} ${t('openSource.stars')}` : null,
    'Go · Docker · GitHub Actions',
  ].filter(Boolean).join('  ·  ');

  return (
    <div className="os container">
      <div className="os-lead">
        <div>
          <p className="os-role">{t('openSource.leafwikiRole')}</p>
          <h3 className="os-repo">
            <a href={LEAFWIKI.url} target="_blank" rel="noreferrer" onClick={() => trackRepo(`${LEAFWIKI.owner}/${LEAFWIKI.repo}`)}>
              <span className="os-owner">{LEAFWIKI.owner}/</span>{LEAFWIKI.repo}
            </a>
          </h3>
          <p className="os-meta">{meta}</p>
          <p className="os-intro">{t('openSource.leafwikeIntro')}</p>
        </div>
        <ul className="os-contrib-list" aria-label={t('openSource.contributions')}>
          {contributions.map((c) => (
            <li key={c.title}>
              <strong>{c.title}</strong>
              <span>{c.sub}</span>
            </li>
          ))}
        </ul>
      </div>

      <ul className="os-list">
        {projects.map((p) => (
          <li key={p.to}>
            <Link className="os-row" to={p.to} onClick={() => trackEvent('project-open', { project: p.project, from: 'opensource' })}>
              <span className="os-row-name"><span className="os-owner">Hugo-Galley/</span>{p.repo}</span>
              <span className="os-row-desc">{p.desc}</span>
              <span className="os-row-meta">{p.meta}</span>
              <span className="os-row-arrow" aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function GithubProfileLink() {
  const { t } = useLanguage();
  return (
    <a
      href={GITHUB_PROFILE}
      target="_blank"
      rel="noreferrer"
      className="btn btn--ghost"
      onClick={() => trackEvent('github-profile', { from: 'opensource' })}
    >
      <GithubGlyph />
      {t('openSource.viewProfile')}
    </a>
  );
}
