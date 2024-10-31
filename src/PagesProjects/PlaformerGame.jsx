import imgtest from '../assets/Card/mario.png'
import pyth from '../assets/Pages/Python-logo-notext.svg.png'
import NavBar from '../components/NavBar'
import pygame from '../assets/Pages/Pygame_logo.svg.png'
import '../Styles/PagesProjects.css'

export default function PlatformerGame(){
    return(
        <div>
        <NavBar/>
        <div className='Pages'>

        <div className='Pages-top'>
            <img src={imgtest} alt="" />
            <div className='pages-info'>
                <div className='pages-info-prc'>
                <p className="projects-nom">Mario Briss</p>
                <p className="projects-techno">Techno use : Python, Pygame</p>
                </div>
                <p className="projects-desc">It’s a platformer game imitating Mario, made in Python with Pygame. There is a little easter egg hidden in it</p>
                <a id='GithubLink' href="https://github.com/Hugo-Galley/Mario-in-Pygame" target="_blank">Github</a>
            </div>
        </div>
        <h1>Techno Use</h1>
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
        </div>
    )
}