import imgtest from '../assets/Card/Carto.webp'
import cs from '../assets/Bento/cs.webp'
import net from '../assets/Pages/NET_Core_Logo.svg.webp'
import blazor from '../assets/Pages/Blazor.webp'
import NavBar from '../components/NavBar'
import '../Styles/PagesProjects.css'

export default function Cartograhy(){
    return(
        <div>
        <NavBar/>
        <div className='Pages'>

        <div className='Pages-top'>
            <img src={imgtest} alt="" />
            <div className='pages-info'>
                <div className='pages-info-prc'>
                <p className="projects-nom">Cartographie</p>
                <p className="projects-techno">Techno use : C#; .NET, Blazor, Rest</p>
                </div>
                <p className="projects-desc">This is an application designed to map all the company’s servers in order to identify on which server an application is located or not, as well as to allow searching, sorting, and adding search files. For this application I create BDD & Batch & API & WEB APP & Deployement</p>
            </div>
        </div>
        <h1>Techno Use</h1>
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
                <img src={blazor} alt="C#" />
                <p>C#</p>
            </div>
        </div>



        </div>
        </div>
    )
}