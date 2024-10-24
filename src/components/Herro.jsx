import '../Styles/Herro.css'
import heroImg from'../assets/herroBanner.png'

export default function Herro() {
  return (
    <div className='herroBanner'>
      <div className='herro'>
      <div className='herro-description'>
        <p id='hello'>Hello</p>
        <p id='herro-name'>I'm <strong>Hugo Galley</strong></p>
        <p id='herro-desc'>I'm a French Developer Actually in Study</p>
        <div className='button-div'>
          <a id='herro-button1' href='#AboutMe'>About Me</a>
          <a id='herro-button2' href='#Projects'>My Works</a>
        </div>
      </div>
      <img src={heroImg} id='herro-logo'/>
      </div>
    </div>
  );
}
