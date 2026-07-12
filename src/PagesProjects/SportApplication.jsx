import imgtest from '../assets/Card/actifit.webp';
import rea from '../assets/Pages/react.webp';
import js from '../assets/Pages/JavaScript-logo.webp';
import expo from '../assets/Pages/expo-1.webp';
import GithubButton from '../components/GithubButton';
import '../Styles/PagesProjects.css';
import { useLanguage } from '../context/LanguageContext';

export default function SportApplication() {
    const { t } = useLanguage();
    
    return (
        <div className='project-container'>
            <div className='project-card'>
                <img src={imgtest} alt="Aperçu de l'application" className='project-image' />
                <div className='project-info'>
                    <h1 className='project-title'>{t('projectPages.sportApp.title')}</h1>
                    <p className='project-description'>
                        {t('projectPages.sportApp.description')}
                    </p>
                    <div className='tech-stack'>
                        <div className='tech-item'>
                            <img src={rea} alt="React" />
                            <p>React</p>
                        </div>
                        <div className='tech-item'>
                            <img src={js} alt="JavaScript" />
                            <p>JavaScript</p>
                        </div>
                        <div className='tech-item'>
                            <img src={expo} alt="Expo" />
                            <p>Expo</p>
                        </div>
                    </div>
                    <a href="https://github.com/Hugo-Galley/ActiFit" target="_blank" rel="noreferrer" className='github-link'>
                        <GithubButton />
                    </a>
                </div>
            </div>
        </div>
    );
}
