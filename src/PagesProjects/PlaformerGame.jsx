import imgtest from '../assets/Card/mario.webp';
import pyth from '../assets/Pages/Python-logo-notext.svg.webp';
import pygame from '../assets/Pages/Pygame_logo.svg.webp';
import GithubButton from '../components/GithubButton';
import '../Styles/PagesProjects.css';
import { useLanguage } from '../context/LanguageContext';

export default function PlatformerGame() {
    const { t } = useLanguage();
    
    return (
        <div className='project-container'>
            <div className='project-card'>
                <img src={imgtest} alt="Aperçu du projet" className='project-image' />
                <div className='project-info'>
                    <h2 className='project-title'>{t('projectPages.platformerGame.title')}</h2>
                    <div className='tech-stack'>
                        <div className='tech-item'>
                            <img src={pyth} alt="Python" />
                            <p>Python</p>
                        </div>
                        <div className='tech-item'>
                            <img src={pygame} alt="Pygame" />
                            <p>Pygame</p>
                        </div>
                    </div>
                    <p className="project-description">
                        {t('projectPages.platformerGame.description')}
                    </p>
                    <a href="https://github.com/Hugo-Galley/Mario-in-Pygame" target="_blank" rel="noreferrer" className='github-link'>
                        <GithubButton />
                    </a>
                </div>
            </div>
        </div>
    );
}
