import '../Styles/Herro.css'
import logo from '../assets/logo.webp'
export default function NavBar(){
    return(
        <nav className='navbar'>
        <a href="/#Home"><img className='navbar-logo' src={logo} alt='logo' /></a>
          <ul className='navbar-right'>
            <a href="/#Home"><li className='navbar-items'>Home</li></a> 
            <a href="/#AboutMe"><li className='navbar-items'>About</li></a> 
            <a href="/#Projects"><li className='navbar-items'>Projects</li></a> 
            <a href="/#Contact"><li className='navbar-items'>Contact</li></a> 
            
          </ul>
        </nav>
    )
}