import imgtest from '../assets/Card/virus.webp';
import pyth from '../assets/Pages/Python-logo-notext.svg.webp';
import GithubButton from '../components/GithubButton';
import '../Styles/PagesProjects.css';
import { useLanguage } from '../context/LanguageContext';

export default function Ransomware() {
    const { t } = useLanguage();
    
    return (
        <div className='project-container'>
            <div className='project-card'>
                <img src={imgtest} alt="Aperçu du projet" className='project-image' />
                <div className='project-info'>
                    <h2 className='project-title'>{t('projectPages.ransomware.title')}</h2>
                    <div className='tech-stack'>
                        <div className='tech-item'>
                            <img src={pyth} alt="Python" />
                            <p>Python</p>
                        </div>
                    </div>
                    <p className="project-description">
                        {t('projectPages.ransomware.description')}
                    </p>
                    <a href="https://github.com/Hugo-Galley/Ransomware" target="_blank" rel="noreferrer" className='github-link'>
                        <GithubButton />
                    </a>
                </div>
            </div>
        </div>
    );
}
