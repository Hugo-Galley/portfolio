import '../Styles/Herro.css'
import logo from '../assets/logo.webp'
export default function NavBar(){
    return(
        <nav className='navbar'>
        <a href="/#Home"><img className='navbar-logo' src={logo} alt='logo' /></a>
        </nav>
    )
}