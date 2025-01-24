import imgtest from '../assets/Card/ctk2.webp'
import pyth from '../assets/Pages/Python-logo-notext.svg.webp'
import ctk from '../assets/Pages/customctk.webp'
import NavBar from '../components/NavBar'
import sqlite from '../assets/Pages/sqlite.webp'
import '../Styles/PagesProjects.css'
import GithubButton from '../components/GithubButton'

export default function AdminInterface(){
    return(
        <div>
        <NavBar/>
        <div className='Pages' id='TopEnter'>

        <div className='Pages-top'>
            <img src={imgtest} alt="CardSlide" id='Slide'/>
            <div className='pages-info'>
                <div className='pages-info-prc'>
                <p className="projects-nom">AdminInterface</p>
                <div className='pages-techo'>
            <div>
                <img src={pyth} alt="Python" />
                <p>Python</p>
            </div>
            <div>
                <img src={ctk} alt="CTK" />
                <p>CustomTkinter</p>
            </div>
            <div>
                <img src={sqlite} alt="Sqlite" />
                <p>Sqlite</p>
            </div>
        </div>
                </div>
                <p className="projects-desc">Ceci est une interface de connexion pour un laboratoire simulé visant à tester l'utilisation de la bibliothèque graphique CustomTkinter en Python.</p>
                <a id='GithubLink' href="https://github.com/Hugo-Galley/Portail_App" target="_blank" rel="noreferrer"><GithubButton/></a>
            </div>
        </div>
        </div>
        </div>
    )
}