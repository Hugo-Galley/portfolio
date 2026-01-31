import imgtest from '../assets/Pages/phantom.png';
import pyth from '../assets/Pages/Python-logo-notext.svg.webp';
import js from '../assets/Pages/JavaScript-logo.webp'
import GithubButton from '../components/GithubButton';
import '../Styles/PagesProjects.css';
import { useLanguage } from '../context/LanguageContext';

export default function Phantom() {
    const { t } = useLanguage();
    
    return (
        <div className='project-container'>
            <div className='project-card'>
                <img src={imgtest} alt="Aperçu de l'interface" className='project-image' />
                <div className='project-info'>
                    <h2 className='project-title'>{t('projectPages.phantom.title')}</h2>
                    <p className='project-description'>
                       {t('projectPages.phantom.description')}
                    </p>
                    <div className='tech-stack'>
                        <div className='tech-item'>
                            <img src={pyth} alt="Python" />
                            <p>Python</p>
                        </div>
                        <div className='tech-item'>
                            <img src={js} alt="CustomTkinter" />
                            <p>JS</p>
                        </div>
                    </div>
                    <a href="https://github.com/Hugo-Galley/Phantom" target="_blank" rel="noreferrer" className='github-link'>
                        <GithubButton />
                    </a>
                </div>
            </div>
        </div>
    );
}
