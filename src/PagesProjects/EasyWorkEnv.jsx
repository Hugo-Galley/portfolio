import imgtest from '../assets/Pages/Screenshot 2022-11-05 at 10.44.06 PM.webp';
import pyth from '../assets/Pages/Python-logo-notext.svg.webp';
import pypi from '../assets/Card/PyPI-Logo-notext.svg.png';
import github from '../assets/Contact/github.webp';
import GithubButton from '../components/GithubButton';
import '../Styles/PagesProjects.css';

export default function EasyWorkEnv() {
    return (
        <div className='project-container'>
            <div className='project-card'>
                <img src={imgtest} alt="Aperçu de l'interface" className='project-image' />
                <div className='project-info'>
                    <h2 className='project-title'>EasyWorkEnv</h2>
                    <p className='project-description'>
                       Il s'agit de la création d'un package en python permetant de gerer facilement ses variables d'environement grace a un objet.
                    </p>
                    <div className='tech-stack'>
                        <div className='tech-item'>
                            <img src={pyth} alt="Python" />
                            <p>Python</p>
                        </div>
                        <div className='tech-item'>
                            <img src={pypi} alt="CustomTkinter" />
                            <p>PyPi</p>
                        </div>
                        <div className='tech-item'>
                            <img src={github} alt="SQLite" />
                            <p>Github Actions</p>
                        </div>
                    </div>
                    <a href="https://github.com/Hugo-Galley/EasyWorkEnv" target="_blank" rel="noreferrer" className='github-link'>
                        <GithubButton />
                    </a>
                </div>
            </div>
        </div>
    );
}
