import imgtest from '../assets/Card/ctk2.webp';
import pyth from '../assets/Pages/Python-logo-notext.svg.webp';
import ctk from '../assets/Pages/customctk.webp';
import sqlite from '../assets/Pages/sqlite.webp';
import NavBar from '../components/NavBar';
import GithubButton from '../components/GithubButton';
import '../Styles/PagesProjects.css';

export default function AdminInterface() {
    return (
        <div className='project-container'>
            <NavBar />
            <div className='project-card'>
                <img src={imgtest} alt="Aperçu de l'interface" className='project-image' />
                <div className='project-info'>
                    <h2 className='project-title'>AdminInterface</h2>
                    <p className='project-description'>
                        Ceci est une interface de connexion pour un laboratoire simulé visant à tester l'utilisation de la bibliothèque graphique CustomTkinter en Python.
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
