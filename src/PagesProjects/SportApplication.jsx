import imgtest from '../assets/Card/actifit.png'
import rea from '../assets/Pages/react.png'
import js from '../assets/Pages/JavaScript-logo.png'
import NavBar from '../components/NavBar'
import expo from '../assets/Pages/expo-1.svg'
import '../Styles/PagesProjects.css'

export default function SportApplication(){
    return(
        <div>
        <NavBar/>
        <div className='Pages'>

        <div className='Pages-top'>
            <img src={imgtest} alt="" />
            <div className='pages-info'>
                <div className='pages-info-prc'>
                <p className="projects-nom">ActiFit</p>
                <p className="projects-techno">Techno use : React Native, Expo, JS</p>
                </div>
                <p className="projects-desc">This is a sports application designed to offer you personalized workout sessions as well as exercise options while showing you your progress. I also used React Native to ensure it is compatible with all types of devices</p>
                <a id='GithubLink' href="https://github.com/Hugo-Galley/ActiFit" target="_blank">Github</a>
            </div>
        </div>
        <h1>Techno Use</h1>
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
        </div>
    )
}