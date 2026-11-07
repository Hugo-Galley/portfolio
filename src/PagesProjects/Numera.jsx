import numeraImg from '../assets/Projects/numera.webp';
import react from '../assets/Pages/react.webp';
import pyth from '../assets/Pages/Python-logo-notext.svg.webp';
import sqlite from '../assets/Pages/sqlite.webp';
import docker from '../assets/Card/docker-icon-seeklogo.png';
import GithubButton from '../components/GithubButton';
import DemoButton from '../components/DemoButton';
import '../Styles/PagesProjects.css';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../hooks/useUmami';

export default function Numera() {
    const { t } = useLanguage();

    return (
        <div className='project-container'>
            <div className='project-card'>
                <img src={numeraImg} alt="Tableau de bord de Numera" className='project-image' />
                <div className='project-info'>
                    <h1 className='project-title'>{t('projectPages.numera.title')}</h1>
                    <p className='project-description'>
                        {t('projectPages.numera.description')}
                    </p>
                    <div className='tech-stack'>
                        <div className='tech-item'>
                            <img src={pyth} alt="Python" />
                            <p>FastAPI</p>
                        </div>
                        <div className='tech-item'>
                            <img src={react} alt="React" />
                            <p>React</p>
                        </div>
                        <div className='tech-item'>
                            <img src={sqlite} alt="SQLite" />
                            <p>SQLite</p>
                        </div>
                        <div className='tech-item'>
                            <img src={docker} alt="Docker" />
                            <p>Docker</p>
                        </div>
                    </div>
                    <div className='project-actions'>
                        <a href="https://demo-budget.galleyhugo.com" target="_blank" rel="noreferrer" className='github-link' onClick={() => trackEvent('demo-click', { project: 'numera' })}>
                            <DemoButton />
                        </a>
                        <a href="https://github.com/Hugo-Galley/numera" target="_blank" rel="noreferrer" className='github-link' onClick={() => trackEvent('github-repo-click', { repo: 'Hugo-Galley/numera' })}>
                            <GithubButton />
                        </a>
                    </div>
                    <p className='project-note'>{t('github.demoNote')}</p>
                </div>
            </div>
        </div>
    );
}
