import '../Styles/Herro.css'
import DownLoadButton from './DownloadButton';
import { useNavigate } from 'react-router-dom';

export default function Herro() {
      const navigate = useNavigate();
  
      const handleNavigation = (section) => {
          navigate('/');
          
          setTimeout(() => {
              const element = document.getElementById(section);
              if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
              }
          }, 100);
      };
  

  return (
    <div className='herroBanner'>
      <div className='herro'>
        <div className='herro-description'>
          <h1 className="hero-title">
            Hello,<br/>
            <span 
              className="gradient-text">
              Je suis Hugo Galley
            </span>
          </h1>
          
          <p 
            className="hero-subtitle">
            Je suis un jeune développeur actuellement en recherche d'une alternance. 
          </p>

          <div 
            className='button-div'>
            <a id='herro-button1' onClick={() => handleNavigation('AboutMe')} style={{ cursor: 'pointer' }}>A Propos</a>
            <a id='herro-button2' onClick={() => handleNavigation('Projects')} style={{ cursor: 'pointer' }}>Mon Travail</a>
          </div>
          
          <a id='DownloadButton' href="https://cvdesignr.com/p/635c197aeaa16?hl=fr_FR" target='_blank'>
            <DownLoadButton/>
          </a>
        </div>
        <div class="radial-glow"/>

      </div>
    </div>
  );
}
