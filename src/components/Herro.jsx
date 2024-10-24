import '../Styles/Herro.css'
import heroImg from'../assets/herroBanner.png'
import logo from '../assets/logo.png'

export default function Herro() {
  return (
    <div className='herroBanner'>
      <nav className='navbar'>
      <a href="#Home"><img className='navbar-logo' src={logo} alt='logo' /></a>
        <ul className='navbar-right'>
          <a href="#Home"><li className='navbar-items'>Home</li></a> 
          <a href="#AboutMe"><li className='navbar-items'>About</li></a> 
          <a href="#Projects"><li className='navbar-items'>Projects</li></a> 
          <a href="#Contact"><li className='navbar-items'>Contact</li></a> 
          
        </ul>
      </nav>
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
