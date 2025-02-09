import imgtest from '../assets/Card/actifit.webp';
import rea from '../assets/Pages/react.webp';
import js from '../assets/Pages/JavaScript-logo.webp';
import expo from '../assets/Pages/expo-1.webp';
import NavBar from '../components/NavBar';
import GithubButton from '../components/GithubButton';
import '../Styles/PagesProjects.css';

export default function SportApplication() {
    return (
        <div className='project-container'>
            <NavBar />
            <div className='project-card'>
                <img src={imgtest} alt="Aperçu de l'application" className='project-image' />
                <div className='project-info'>
                    <h2 className='project-title'>ActiFit</h2>
                    <p className='project-description'>
                        Il s'agit d'une application sportive conçue pour vous proposer des séances d'entraînement personnalisées ainsi que des options d'exercices, tout en affichant votre progression. J'ai également utilisé React Native pour garantir sa compatibilité avec tous les types d'appareils.
                    </p>
                    <div className='tech-stack'>
                        <div className='tech-item'>
                            <img src={rea} alt="React" />
                            <p>React</p>
                        </div>
                        <div className='tech-item'>
                            <img src={js} alt="JavaScript" />
                            <p>JavaScript</p>
                        </div>
                        <div className='tech-item'>
                            <img src={expo} alt="Expo" />
                            <p>Expo</p>
                        </div>
                    </div>
                    <a href="https://github.com/Hugo-Galley/ActiFit" target="_blank" rel="noreferrer" className='github-link'>
                        <GithubButton />
                    </a>
                </div>
            </div>
        </div>
    );
}
