import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Herro from "./components/Herro";
import AptitudeBar from "./components/aptitudeBar";
import Card from "./components/Card";
import Bento from "./components/bento";
import Contact from "./components/contact";
import Footer from "./components/Footer";
import insta from './assets/Card/instagram.webp';
import cart from './assets/Card/Carto.png';
import actifit from './assets/Card/actifit.png';
import mario from './assets/Card/mario.png';
import ctk from './assets/Card/ctk.png';
import virus from './assets/Card/virus.png';
import './Styles/App.css';

// Importation des pages associées aux projets
import Cartograhy from './PagesProjects/Cartography';
// import InstagramClone from './pages/InstagramClone';
// import SportApp from './pages/SportApp';
// import AdminInterface from './pages/AdminInterface';
// import PlatformerGame from './pages/PlatformerGame';
// import Ransomware from './pages/Ransomware';

function App() {
  return (
    <Router>
      <div className="main">
        <Routes>
          <Route path="/" element={(
            <>
            <NavBar/>
              <div id="Home">
                <Herro/>
              </div>
              <AptitudeBar/>
              <div className="projectPage">
                <h1 id="AboutMe">About Me</h1>
                <Bento/>
                <h1 id="Projects">My Projects</h1>
                <div className="grid-project">
                  <Card titre={"Cartography"} categorie={"Web App"} image={cart} lien={'/cartography'}/>
                  <Card titre={"Instagram clone"} categorie={"Web Developement"} image={insta} />
                  <Card titre={"Sport Application"} categorie={"Mobile Developement"} image={actifit} />
                  <Card titre={"Administartion Interface"} categorie={"Python"} image={ctk} />
                  <Card titre={"Platformer Game"} categorie={"Video Game"} image={mario} />
                  <Card titre={"Ransomware"} categorie={"Python"} image={virus} />
                </div>
                <h1 id="Contact">Contact</h1>
                <p id="contactText">If you want to contact me or work with me.</p>
                <Contact/>
              </div>
              <Footer/>
            </>
          )} />
          
          <Route path="/cartography" element={<Cartograhy />} />
          {/* <Route path="/instagram-clone" element={<InstagramClone />} />
          <Route path="/sport-app" element={<SportApp />} />
          <Route path="/admin-interface" element={<AdminInterface />} />
          <Route path="/platformer-game" element={<PlatformerGame />} />
          <Route path="/ransomware" element={<Ransomware />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;