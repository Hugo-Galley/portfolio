import '../Styles/GithubButton.css';
import { useLanguage } from '../context/LanguageContext';

export default function DemoButton() {
  const { t } = useLanguage();

  return (
    <span className="github-button">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
        <rect fill="none" height={24} width={24} />
        <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
      </svg>
      {t('github.demo')}
    </span>
  );
}
