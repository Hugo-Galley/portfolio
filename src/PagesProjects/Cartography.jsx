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
                <p className="projects-desc">This is an application designed to map all the company’s servers in order to identify on which server an application is located or not, as well as to allow searching, sorting, and adding search files. For this application I create BDD & Batch & API & WEB APP & Deployement</p>
            </div>
        </div>
        </div>
        </div>
    )
}