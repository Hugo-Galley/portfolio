import imgtest from '../assets/Card/actifit.webp'
import rea from '../assets/Pages/react.webp'
import js from '../assets/Pages/JavaScript-logo.webp'
import NavBar from '../components/NavBar'
import expo from '../assets/Pages/expo-1.webp'
import '../Styles/PagesProjects.css'

export default function SportApplication(){
    return(
        <div className='ProjectPages'>
        <NavBar/>
        <div className='Pages'>

        <div className='Pages-top'>
            <img src={imgtest} alt="CardSlide" id='Slide' />
            <div className='pages-info'>
                <div className='pages-info-prc'>
                <p className="projects-nom">ActiFit</p>
                <div className='pages-techo'>
            <div>
                <img src={rea} alt="React" />
                <p>React</p>
            </div>
            <div>
                <img src={js} alt="JS" />
                <p>JS</p>
            </div>
            <div>
                <img src={expo} alt="Expo" />
                <p>Expo</p>
            </div>
        </div>
                </div>
                <p className="projects-desc">Il s'agit d'une application sportive conçue pour vous proposer des séances d'entraînement personnalisées ainsi que des options d'exercices, tout en affichant votre progression. J'ai également utilisé React Native pour garantir sa compatibilité avec tous les types d'appareils.</p>
                <a id='GithubLink' href="https://github.com/Hugo-Galley/ActiFit" target="_blank" rel="noreferrer">Github</a>
            </div>
        </div>
        </div>
        </div>
    )
}