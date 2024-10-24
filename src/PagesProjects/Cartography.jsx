import imgtest from '../assets/Card/Carto.png'
import cs from '../assets/Bento/cs.png'
import net from '../assets/Pages/NET_Core_Logo.svg.png'
import blazor from '../assets/Pages/Blazor.png'
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
                <p className="projects-techno">Techno use : C#</p>
                </div>
                <p className="projects-desc">This is an application designed to map all the company’s servers in order to identify on which server an application is located or not, as well as to allow searching, sorting, and adding search files.</p>
                <a href="">Github</a>
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