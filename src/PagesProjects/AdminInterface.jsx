import imgtest from '../assets/Card/ctk2.webp';
import pyth from '../assets/Pages/Python-logo-notext.svg.webp';
import ctk from '../assets/Pages/customctk.webp';
import sqlite from '../assets/Pages/sqlite.webp';
import GithubButton from '../components/GithubButton';
import '../Styles/PagesProjects.css';
import { useLanguage } from '../context/LanguageContext';

export default function AdminInterface() {
    const { t } = useLanguage();
    return (
        <div className='project-container'>
            <div className='project-card'>
                <img src={imgtest} alt={t('projectPages.adminInterface.title') + ' - Aperçu'} className='project-image' />
                <div className='project-info'>
                    <h1 className='project-title'>{t('projectPages.adminInterface.title')}</h1>
                    <p className='project-description'>
                        {t('projectPages.adminInterface.description')}
                    </p>
                    <div className='tech-stack'>
                        <div className='tech-item'>
                            <img src={pyth} alt="Python" />
                            <p>Python</p>
                        </div>
                        <div className='tech-item'>
                            <img src={ctk} alt="CustomTkinter" />
                            <p>CustomTkinter</p>
                        </div>
                        <div className='tech-item'>
                            <img src={sqlite} alt="SQLite" />
                            <p>SQLite</p>
                        </div>
                    </div>
                    <a href="https://github.com/Hugo-Galley/Portail_App" target="_blank" rel="noreferrer" className='github-link'>
                        <GithubButton />
                    </a>
                </div>
            </div>
        </div>
    );
}
