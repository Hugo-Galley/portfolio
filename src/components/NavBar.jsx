import '../Styles/Herro.css'
import logo from '../assets/logo.png'
export default function NavBar(){
    return(
        <nav className='navbar'>
        <a href="/portfolio/portfolio/#Home"><img className='navbar-logo' src={logo} alt='logo' /></a>
          <ul className='navbar-right'>
            <a href="/portfolio/#Home"><li className='navbar-items'>Home</li></a> 
            <a href="/portfolio/#AboutMe"><li className='navbar-items'>About</li></a> 
            <a href="/portfolio/#Projects"><li className='navbar-items'>Projects</li></a> 
            <a href="/portfolio/#Contact"><li className='navbar-items'>Contact</li></a> 
            
          </ul>
        </nav>
    )
}