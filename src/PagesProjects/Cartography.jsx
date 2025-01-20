import imgtest from '../assets/Card/Carto.webp'
import cs from '../assets/Bento/cs.webp'
import net from '../assets/Pages/NET_Core_Logo.svg.webp'
import blazor from '../assets/Pages/Blazor.webp'
import NavBar from '../components/NavBar'
import '../Styles/PagesProjects.css'
import React from 'react'

export default function Cartograhy(){
    return(
        <div className='ProjectPages'>
        <NavBar/>
        <div className='Pages'>

        <div className='Pages-top'>
            <img src={imgtest} alt="CardSlide" id='Slide'/>
            <div className='pages-info'>
                <div className='pages-info-prc'>
                <p className="projects-nom">Cartographie</p>
                <div className='pages-techo'>
            <div>
                
                <img src={cs} alt="C#" />
                <p>C#</p>
            </div>
            <div>
                <img id='NET' src={net} alt=".NET" />
                <p>.NET</p>
            </div>
            <div>
                <img src={blazor} alt="Blazor" />
                <p>C#</p>
            </div>
        </div>
                </div>
                <p className="projects-desc">Ceci est une application conçue pour cartographier tous les serveurs de l'entreprise afin d'identifier sur quel serveur une application est localisée ou non, ainsi que pour permettre la recherche, le tri et l'ajout de fichiers de recherche. Pour cette application, je crée la base de données, les batchs, l'API, l'application web et le déploiement.</p>
            </div>
        </div>
        </div>
        </div>
    )
}