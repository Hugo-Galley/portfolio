import '../Styles/Herro.css'
import heroImg from'../assets/herroBanner.webp'
import DownLoadButton from './DownloadButton';
import ScrollButton from './ScrollButton';

export default function Herro() {
  return (
    <div className='herroBanner'>
      <div className='herro'>
      <div className='herro-description'>
        <p id='hello'>Hello</p>
        <p id='herro-name'>Je suis <strong>Hugo Galley</strong></p>
        <p id='herro-desc'>Je suis un jeune développeur actuellement en études</p>
        <div className='button-div'>
          <a id='herro-button1' href='#AboutMe'>A Propos</a>
          <a id='herro-button2' href='#Projects'>Mon Travail</a>
        </div>
        <a id='DownloadButton' href="https://cvdesignr.com/p/635c197aeaa16?hl=fr_FR" target='_blanck'><DownLoadButton/></a>
        
      </div>
      <div>
      <img src={heroImg} id='herro-logo' alt='Herro'/>
      <div id='ScrollButton'><ScrollButton/></div> 
      </div>

      </div>
      
    </div>
  );
}
