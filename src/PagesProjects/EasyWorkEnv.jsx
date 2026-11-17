import shot from '../assets/Projects/easyworkenv.webp';
import pyth from '../assets/Pages/Python-logo-notext.svg.webp';
import pypi from '../assets/Card/PyPI-Logo-notext.svg.png';
import github from '../assets/Contact/github.webp';
import GithubButton from '../components/GithubButton';
import ProjectLayout from '../components/ProjectLayout';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../hooks/useUmami';

const TECHS = [
  { src: pyth, name: 'Python' },
  { src: pypi, name: 'PyPI' },
  { src: github, name: 'GitHub Actions' },
];

export default function EasyWorkEnv() {
  const { t } = useLanguage();
  return (
    <ProjectLayout
      slug="easyworkenv"
      title={t('projectPages.easyWorkEnv.title')}
      description={t('projectPages.easyWorkEnv.description')}
      image={shot}
      imageAlt="Aperçu d'EasyWorkEnv"
      techs={TECHS}
      actions={
        <a href="https://github.com/Hugo-Galley/EasyWorkEnv" target="_blank" rel="noreferrer" className="github-link" onClick={() => trackEvent('project-link', { project: 'EasyWorkEnv', link: 'repo' })}>
          <GithubButton />
        </a>
      }
    />
  );
}
