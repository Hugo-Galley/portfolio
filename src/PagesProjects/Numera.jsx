import shot from '../assets/Projects/numera.webp';
import react from '../assets/Pages/react.webp';
import pyth from '../assets/Pages/Python-logo-notext.svg.webp';
import sqlite from '../assets/Pages/sqlite.webp';
import docker from '../assets/Card/docker-icon-seeklogo.png';
import GithubButton from '../components/GithubButton';
import DemoButton from '../components/DemoButton';
import ProjectLayout from '../components/ProjectLayout';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../hooks/useUmami';

const TECHS = [
  { src: pyth, name: 'FastAPI' },
  { src: react, name: 'React' },
  { src: sqlite, name: 'SQLite' },
  { src: docker, name: 'Docker' },
];

export default function Numera() {
  const { t } = useLanguage();
  return (
    <ProjectLayout
      slug="numera"
      title={t('projectPages.numera.title')}
      description={t('projectPages.numera.description')}
      image={shot}
      imageAlt="Tableau de bord de Numera"
      techs={TECHS}
      note={t('github.demoNote')}
      actions={
        <>
          <a href="https://demo-budget.galleyhugo.com" target="_blank" rel="noreferrer" className="github-link" onClick={() => trackEvent('project-link', { project: 'Numera', link: 'demo' })}>
            <DemoButton />
          </a>
          <a href="https://github.com/Hugo-Galley/numera" target="_blank" rel="noreferrer" className="github-link" onClick={() => trackEvent('project-link', { project: 'Numera', link: 'repo' })}>
            <GithubButton />
          </a>
        </>
      }
    />
  );
}
