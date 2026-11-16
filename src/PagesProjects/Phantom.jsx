import shot from '../assets/Projects/phantom.webp';
import pyth from '../assets/Pages/Python-logo-notext.svg.webp';
import js from '../assets/Pages/JavaScript-logo.webp';
import GithubButton from '../components/GithubButton';
import ProjectLayout from '../components/ProjectLayout';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../hooks/useUmami';

const TECHS = [
  { src: pyth, name: 'Python' },
  { src: js, name: 'JavaScript' },
];

export default function Phantom() {
  const { t } = useLanguage();
  return (
    <ProjectLayout
      slug="phantom"
      title={t('projectPages.phantom.title')}
      description={t('projectPages.phantom.description')}
      image={shot}
      imageAlt="Aperçu de Phantom"
      techs={TECHS}
      actions={
        <a href="https://github.com/Hugo-Galley/Phantom" target="_blank" rel="noreferrer" className="github-link" onClick={() => trackEvent('github-repo-click', { repo: 'Hugo-Galley/Phantom' })}>
          <GithubButton />
        </a>
      }
    />
  );
}
