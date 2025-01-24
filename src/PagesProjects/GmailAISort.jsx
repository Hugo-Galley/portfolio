import imgtest from '../assets/Card/gmailAi.webp'
import python from '../assets/Pages/Python-logo-notext.svg.webp'
import ollama from '../assets/Pages/ollama.png'
import meta from '../assets/Pages/meta.webp'
import NavBar from '../components/NavBar'
import '../Styles/PagesProjects.css'
import React from 'react'
import GithubButton from '../components/GithubButton'

export default function GmailAiSort(){
    return(
        <div className='ProjectPages'>
        <NavBar/>
        <div className='Pages'>

        <div className='Pages-top'>
            <img src={imgtest} alt="CardSlide" id='Slide'/>
            <div className='pages-info'>
                <div className='pages-info-prc'>
                <p className="projects-nom">Gmail Ai Sort</p>
                <div className='pages-techo'>
            <div>
                
                <img src={python} alt="Python" />
                <p>Python</p>
            </div>
            <div>
                <img id='NET' src={ollama} alt=".Ollama" />
                <p>Ollama</p>
            </div>
            <div>
                <img src={meta} alt="Llama 3" />
                <p>Llama 3</p>
            </div>
        </div>
                </div>
                <p className="projects-desc">Ce projet vise à trier vos e-mails en cinq catégories principales à l'aide de l'IA. En utilisant Llama 3, il permet de communiquer avec Gmail. Ce code vous permet d'organiser facilement vos e-mails par étiquette afin de les retrouver plus facilement.</p>
                <a id='GithubLink' href="https://github.com/Hugo-Galley/GmailAiSort" target="_blank" rel="noreferrer"><GithubButton/></a>
            </div>
        </div>
        </div>
        </div>
    )
}