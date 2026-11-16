import shot from '../assets/Projects/gmail-ai-sort.webp';
import python from '../assets/Pages/Python-logo-notext.svg.webp';
import ollama from '../assets/Pages/ollama.png';
import meta from '../assets/Pages/meta.webp';
import GithubButton from '../components/GithubButton';
import ProjectLayout from '../components/ProjectLayout';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../hooks/useUmami';

const TECHS = [
  { src: python, name: 'Python' },
  { src: ollama, name: 'Ollama' },
  { src: meta, name: 'Llama 3' },
];

export default function GmailAiSort() {
  const { t } = useLanguage();
  return (
    <ProjectLayout
      slug="gmail-ai-sort"
      title={t('projectPages.gmailAiSort.title')}
      description={t('projectPages.gmailAiSort.description')}
      image={shot}
      imageAlt="Aperçu de GmailAiSort"
      techs={TECHS}
      actions={
        <a href="https://github.com/Hugo-Galley/GmailAiSort" target="_blank" rel="noreferrer" className="github-link" onClick={() => trackEvent('github-repo-click', { repo: 'Hugo-Galley/GmailAiSort' })}>
          <GithubButton />
        </a>
      }
    />
  );
}
