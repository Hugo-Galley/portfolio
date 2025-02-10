import imgtest from '../assets/Card/Carto.webp';
import cs from '../assets/Bento/cs.webp';
import net from '../assets/Pages/NET_Core_Logo.svg.webp';
import blazor from '../assets/Pages/Blazor.webp';
import GithubButton from '../components/GithubButton';
import '../Styles/PagesProjects.css';
import React from 'react';

export default function Cartography() {
    return (
        <div className='project-container'>
            <div className='project-card'>
                <img src={imgtest} alt="Aperçu de l'application" className='project-image' />
                <div className='project-info'>
                    <h2 className='project-title'>Cartographie</h2>
                    <p className='project-description'>
                        Ceci est une application conçue pour cartographier tous les serveurs de l'entreprise afin d'identifier sur quel serveur une application est localisée ou non, ainsi que pour permettre la recherche, le tri et l'ajout de fichiers de recherche.
                        Pour cette application, je crée la base de données, les batchs, l'API, l'application web et le déploiement.
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
