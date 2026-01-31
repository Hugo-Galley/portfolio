import imgtest from '../assets/Card/gmailAi.webp';
import python from '../assets/Pages/Python-logo-notext.svg.webp';
import ollama from '../assets/Pages/ollama.png';
import meta from '../assets/Pages/meta.webp';
import GithubButton from '../components/GithubButton';
import '../Styles/PagesProjects.css';
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function GmailAiSort() {
    const { t } = useLanguage();
    
    return (
        <div className='project-container'>
            <div className='project-card'>
                <img src={imgtest} alt="Aperçu du projet" className='project-image' />
                <div className='project-info'>
                    <h2 className='project-title'>{t('projectPages.gmailAiSort.title')}</h2>
                    <p className='project-description'>
                        {t('projectPages.gmailAiSort.description')}
                    </p>
                    <div className='tech-stack'>
                        <div className='tech-item'>
                            <img src={python} alt="Python" />
                            <p>Python</p>
                        </div>
                        <div className='tech-item'>
                            <img src={ollama} alt="Ollama" />
                            <p>Ollama</p>
                        </div>
                        <div className='tech-item'>
                            <img src={meta} alt="Llama 3" />
                            <p>Llama 3</p>
                        </div>
                    </div>
                    <a href="https://github.com/Hugo-Galley/GmailAiSort" target="_blank" rel="noreferrer" className='github-link'>
                        <GithubButton />
                    </a>
                </div>
            </div>
        </div>
    );
}
