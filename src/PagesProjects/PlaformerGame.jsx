import imgtest from '../assets/Card/mario.webp'
import pyth from '../assets/Pages/Python-logo-notext.svg.webp'
import NavBar from '../components/NavBar'
import pygame from '../assets/Pages/Pygame_logo.svg.webp'
import GithubButton from '../components/GithubButton'
import '../Styles/PagesProjects.css'

export default function PlatformerGame(){
    return(
        <div className='ProjectPages'>
        <NavBar/>
        <div className='Pages'>

        <div className='Pages-top'>
            <img src={imgtest} alt="CardSlide" id='Slide' />
            <div className='pages-info'>
                <div className='pages-info-prc'>
                <p className="projects-nom">Mario Briss</p>
                <div className='pages-techo'>
            <div>
                <img src={pyth} alt="Python" />
                <p>Python</p>
            </div>
            <div>
                <img src={pygame} alt="Pygame" />
                <p>Pygame</p>
            </div>
        </div>
                </div>
                <p className="projects-desc">It’s a platformer game imitating Mario, made in Python with Pygame. There is a little easter egg hidden in it</p>
                <a id='GithubLink' href="https://github.com/Hugo-Galley/Mario-in-Pygame" target="_blank" rel="noreferrer"> <GithubButton/></a>
            </div>
        </div>
        </div>
        </div>
    )
}