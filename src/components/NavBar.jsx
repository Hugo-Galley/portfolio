import '../Styles/Herro.css'
import logo from '../assets/logo.webp'

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/#Home" className="navbar-logo-link">
          <img className="navbar-logo" src={logo} alt="logo" />
        </a>
        <ul className="navbar-right">
          <li className="navbar-item">
            <a href="/#Home">Home</a>
          </li>
          <li className="navbar-item">
            <a href="/#AboutMe">About</a>
          </li>
          <li className="navbar-item">
            <a href="/#Projects">Projects</a>
          </li>
          <li className="navbar-item">
            <a href="/#Contact">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}