import imgtest from '../assets/Pages/InstaPreview.webp'
import rea from '../assets/Pages/react.webp'
import js from '../assets/Pages/JavaScript-logo.webp'
import NavBar from '../components/NavBar'
import '../Styles/PagesProjects.css'

export default function InstaGramClone(){
    return(
        <div className='ProjectPages'>
        <NavBar/>
        <div className='Pages'>

        <div className='Pages-top'>
            <img src={imgtest} alt="CardSlide" id='Slide'/>
            <div className='pages-info'>
                <div className='pages-info-prc'>
                <p className="projects-nom">Instagram Clone</p>
                <h2>Techno Use</h2>
                <div className='pages-techo'>
            <div>
                <img src={rea} alt="React" />
                <p>React</p>
            </div>
            <div>
                <img src={js} alt="JS" />
                <p>JS</p>
            </div>
        </div>
                </div>
                <p className="projects-desc">Il s'agit d'un site web développé en React, visant à reproduire Instagram. Le site se concentre sur le front-end et m'a permis d'apprendre les bases de React.</p>
                <a id='GithubLink' href="https://github.com/Hugo-Galley/Instagrim" target="_blank" rel="noreferrer">Github</a>
            </div>
        </div>
        



        </div>
        </div>
    )
}