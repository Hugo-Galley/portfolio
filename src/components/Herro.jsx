import '../Styles/Herro.css'
import DownLoadButton from './DownloadButton';

export default function Herro() {
  return (
    <div className='herroBanner'>
      <div className='herro'>
      <div className='herro-description'>
      <h1 class="hero-title">
            Hello,<br/>
            <span class="gradient-text">Je suis Hugo Galley</span>
        </h1>
        
        <p class="hero-subtitle">
            Je suis un jeune développeur actuellement en études
        </p>

        <div className='button-div'>
          <a id='herro-button1' href='#AboutMe'>A Propos</a>
          <a id='herro-button2' href='#Projects'>Mon Travail</a>
        </div>
        <a id='DownloadButton' href="https://cvdesignr.com/p/635c197aeaa16?hl=fr_FR" target='_blanck'><DownLoadButton/></a>
        
      </div>

      </div>
      
    </div>
  );
}
