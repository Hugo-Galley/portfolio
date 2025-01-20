import imgtest from '../assets/Card/virus.webp'
import pyth from '../assets/Pages/Python-logo-notext.svg.webp'
import NavBar from '../components/NavBar'
import '../Styles/PagesProjects.css'

export default function Ransomware(){
    return(
        <div className='ProjectPages'>
        <NavBar/>
        <div className='Pages'>

        <div className='Pages-top'>
            <img src={imgtest} alt="CardSlide" id='Slide'/>
            <div className='pages-info'>
                <div className='pages-info-prc'>
                <p className="projects-nom">Ransomware</p>
                <div className='pages-techo'>
            <div>
                <img src={pyth} alt="Python" />
                <p>Python</p>
            </div>
        </div>
                </div>
                <p className="projects-desc">Il s'agit d'un ransomware conçu pour sensibiliser à la cybersécurité et en apprendre davantage sur la protection des données.</p>
                <a id='GithubLink' href="https://github.com/Hugo-Galley/Ransomware" target="_blank" rel="noreferrer">Github</a>
            </div>
        </div>
        </div>
        </div>
    )
}