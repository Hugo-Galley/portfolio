import imgtest from '../assets/Card/virus.webp'
import pyth from '../assets/Pages/Python-logo-notext.svg.webp'
import NavBar from '../components/NavBar'
import '../Styles/PagesProjects.css'

export default function Ransomware(){
    return(
        <div>
        <NavBar/>
        <div className='Pages'>

        <div className='Pages-top'>
            <img src={imgtest} alt="CardSlide" />
            <div className='pages-info'>
                <div className='pages-info-prc'>
                <p className="projects-nom">Ransomware</p>
                <p className="projects-techno">Techno use : Python</p>
                </div>
                <p className="projects-desc">It is a ransomware aimed at raising awareness about cybersecurity and learning more about data protection</p>
                <a id='GithubLink' href="https://github.com/Hugo-Galley/Ransomware" target="_blank">Github</a>
            </div>
        </div>
        <h1>Techno Use</h1>
        <div className='pages-techo'>
            <div>
                <img src={pyth} alt="Python" />
                <p>Python</p>
            </div>
        </div>
        </div>
        </div>
    )
}