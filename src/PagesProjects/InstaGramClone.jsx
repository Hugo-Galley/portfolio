import imgtest from '../assets/Pages/InstaPreview.webp';
import rea from '../assets/Pages/react.webp';
import js from '../assets/Pages/JavaScript-logo.webp';
import GithubButton from '../components/GithubButton';
import '../Styles/PagesProjects.css';
import { useLanguage } from '../context/LanguageContext';

export default function InstaGramClone() {
    const { t } = useLanguage();
    
    return (
        <div className='project-container'>
            <div className='project-card'>
                <img src={imgtest} alt="Aperçu du projet" className='project-image' />
                <div className='project-info'>
                    <h2 className='project-title'>{t('projectPages.instaClone.title')}</h2>
                    <h3 className='tech-title'>{t('projectPages.instaClone.techTitle')}</h3>
                    <div className='tech-stack'>
                        <div className='tech-item'>
                            <img src={rea} alt="React" />
                            <p>React</p>
                        </div>
                        <div className='tech-item'>
                            <img src={js} alt="JavaScript" />
                            <p>JavaScript</p>
                        </div>
                    </div>
                    <p className="project-description">
                        {t('projectPages.instaClone.description')}
                    </p>
                    <a href="https://github.com/Hugo-Galley/Instagrim" target="_blank" rel="noreferrer" className='github-link'>
                        <GithubButton />
                    </a>
                </div>
            </div>
        </div>
    );
}
