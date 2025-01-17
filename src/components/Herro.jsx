import '../Styles/Herro.css'
import heroImg from'../assets/herroBanner.webp'
import DownLoadButton from './DownloadButton';

export default function Herro() {
  return (
    <div className='herroBanner'>
      <div className='herro'>
      <div className='herro-description'>
        <p id='hello'>Hello</p>
        <p id='herro-name'>I'm <strong>Hugo Galley</strong></p>
        <p id='herro-desc'>I'm a French Developer actually in Study</p>
        <div className='button-div'>
          <a id='herro-button1' href='#AboutMe'>About Me</a>
          <a id='herro-button2' href='#Projects'>My Works</a>
        </div>
        <a id='DownloadButton' href="https://cvdesignr.com/p/635c197aeaa16?hl=fr_FR" target='_blanck'><DownLoadButton/></a>

      </div>
      <img src={heroImg} id='herro-logo' alt='Herro'/>
      </div>
    </div>
  );
}
