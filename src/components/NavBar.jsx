import '../Styles/Herro.css'

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-right">
          <li className="navbar-item">
            <a href="/#Home">Home</a>
          </li>
          <li className="navbar-item">
            <a href="/#AboutMe">A Propos</a>
          </li>
          <li className="navbar-item">
            <a href="/#Projects">Projets</a>
          </li>
          <li className="navbar-item">
            <a href="/#Contact">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}