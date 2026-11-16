import shot from '../assets/Projects/cartography.webp';
import cs from '../assets/Bento/cs.webp';
import net from '../assets/Pages/NET_Core_Logo.svg.webp';
import blazor from '../assets/Pages/Blazor.webp';
import GithubButton from '../components/GithubButton';
import ProjectLayout from '../components/ProjectLayout';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../hooks/useUmami';

const TECHS = [
  { src: cs, name: 'C#' },
  { src: net, name: '.NET' },
  { src: blazor, name: 'Blazor' },
];

export default function Cartography() {
  const { t } = useLanguage();
  return (
    <ProjectLayout
      slug="cartography"
      title={t('projectPages.cartography.title')}
      description={t('projectPages.cartography.description')}
      image={shot}
      imageAlt="Aperçu de Cartography"
      techs={TECHS}
      actions={
        <a href="https://github.com/Hugo-Galley/Cartography" target="_blank" rel="noreferrer" className="github-link" onClick={() => trackEvent('github-repo-click', { repo: 'Hugo-Galley/Cartography' })}>
          <GithubButton />
        </a>
      }
    />
  );
}
