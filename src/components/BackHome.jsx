import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import PROJECTS, { projectIndex } from '../data/projects';
import { trackEvent } from '../hooks/useUmami';

const PROJECT_PATHS = PROJECTS.map((p) => p.lien.replace(/\/$/, ''));

/* No navigation bar: project pages only get a discreet way back home */
export default function BackHome() {
  const { pathname } = useLocation();
  const { language } = useLanguage();
  if (!PROJECT_PATHS.includes(pathname.replace(/\/$/, ''))) return null;
  return (
    <Link
      to="/"
      state={{ scrollTo: 'Projects' }}
      className="back-home"
      onClick={() => trackEvent('project-back', { project: PROJECTS[projectIndex(pathname)]?.titre })}
    >
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
      {language === 'fr' ? 'Tous les projets' : 'All projects'}
    </Link>
  );
}
