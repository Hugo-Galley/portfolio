import imgtest from '../assets/Pages/InstaPreview.png'
import rea from '../assets/Pages/react.png'
import js from '../assets/Pages/JavaScript-logo.png'
import NavBar from '../components/NavBar'
import '../Styles/PagesProjects.css'

export default function InstaGramClone(){
    return(
        <div>
        <NavBar/>
        <div className='Pages'>

        <div className='Pages-top'>
            <img src={imgtest} alt="" />
            <div className='pages-info'>
                <div className='pages-info-prc'>
                <p className="projects-nom">Instagram Clone</p>
                <p className="projects-techno">Techno use : React, JS</p>
                </div>
                <p className="projects-desc">This is a website developed in React aimed at copying Instagram. The site focuses on the front end and allowed me to learn the basics of React.</p>
                <a id='GithubLink' href="https://github.com/Hugo-Galley/Instagrim">Github</a>
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
        </div>



        </div>
        </div>
    )
}