import imgtest from '../assets/Card/Carto.webp';
import cs from '../assets/Bento/cs.webp';
import net from '../assets/Pages/NET_Core_Logo.svg.webp';
import blazor from '../assets/Pages/Blazor.webp';
import GithubButton from '../components/GithubButton';
import '../Styles/PagesProjects.css';
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Cartography() {
    const { t } = useLanguage();
    
    return (
        <div className='project-container'>
            <div className='project-card'>
                <img src={imgtest} alt="Aperçu de l'application" className='project-image' />
                <div className='project-info'>
                    <h2 className='project-title'>{t('projectPages.cartography.title')}</h2>
                    <p className='project-description'>
                        {t('projectPages.cartography.description')}
                    </p>
                    <div className='tech-stack'>
                        <div className='tech-item'>
                            <img src={cs} alt="C#" />
                            <p>C#</p>
                        </div>
                        <div className='tech-item'>
                            <img src={net} alt=".NET" />
                            <p>.NET</p>
                        </div>
                        <div className='tech-item'>
                            <img src={blazor} alt="Blazor" />
                            <p>Blazor</p>
                        </div>
                    </div>
                    <a href="https://github.com/Hugo-Galley/Cartography" target="_blank" rel="noreferrer" className='github-link'>
                        <GithubButton />
                    </a>
                </div>
            </div>
        </div>
    );
}
