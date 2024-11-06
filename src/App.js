import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Herro from "./components/Herro";
import AptitudeBar from "./components/aptitudeBar";
import Card from "./components/Card";
import Bento from "./components/bento";
import Contact from "./components/contact";
import CardWork from './components/CardWork';
import Footer from "./components/Footer";
import insta from './assets/Card/instagram-2.webp';
import cart from './assets/Card/Carto.webp';
import actifit from './assets/Card/actifit.webp';
import mario from './assets/Card/mario.webp';
import ctk from './assets/Card/ctk2.webp';
import virus from './assets/Card/virus.webp';
import unif from './assets/Card/unif.webp'
import but from './assets/Card/Logo-BUT.svg.webp'
import './Styles/App.css';

import Cartograhy from './PagesProjects/Cartography';
import InstaGramClone from './PagesProjects/InstaGramClone';
import SportApplication from './PagesProjects/SportApplication';
import AdminInterface from './PagesProjects/AdminInterface';
import PlatformerGame from './PagesProjects/PlaformerGame';
import Ransomware from './PagesProjects/Ransomware';
import { useEffect } from 'react';
import hero from './assets/herroBanner.webp'

function App() {
  useEffect(() => {
    const img = new Image();
    img.src = hero; 
  }, []);
  useEffect(() => {
    const cursor = document.querySelector('.cursor');
  
    if (cursor) {
      const handleMouseMove = (e) => {
        cursor.style.top = `${e.pageY - 20}px`;
        cursor.style.left = `${e.pageX - 20}px`;
      };
  
      const handleClick = () => {
        cursor.classList.add('expand');
  
        setTimeout(() => {
          if (cursor) {
            cursor.classList.remove('expand');
          }
        }, 500);
      };
  
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('click', handleClick);
  
      // Nettoyage des écouteurs d'événements lors du démontage
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('click', handleClick);
      };
    } else {
      console.error("L'élément avec la classe '.cursor' n'a pas été trouvé.");
    }
  }, []);

  return (
    <Router>
      <div className="main">
      <div className='cursor'></div>
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
                <h1>I worked at</h1>
                <div className='work-app-container'>
                    <CardWork nom={"Intern Development Engineer"} duré={"10 weeks"} boite={"Uniformation"} img={unif}/>
                    <CardWork nom={"Intern"} duré={"1 week"} boite={"BUT"} img={but}/>
                </div>
                <h1 id="Projects">My Projects</h1>
                <div className="grid-project">
                  <Card titre={"Cartography"} categorie={"Web App"} image={cart} lien={'/cartography'}/>
                  <Card titre={"Instagram clone"} categorie={"Web Developement"} image={insta} lien={'/instagram-clone'} />
                  <Card titre={"Sport Application"} categorie={"Mobile Developement"} image={actifit} lien={'/sport-app'} />
                  <Card titre={"Administration Interface"} categorie={"Python"} image={ctk} lien={'/admin-interface'}/>
                  <Card titre={"Platformer Game"} categorie={"Video Game"} image={mario} lien={"/platformer-game"}/>
                  <Card titre={"Cybersecurity "} categorie={"Python"} image={virus} lien={'/ransomware'} />
                </div>
                <h1 id="Contact">Contact</h1>
                <p id="contactText">If you want to contact me or work with me.</p>
                <Contact/>
              </div>
              <Footer/>
            </>
          )} />
          
          <Route path="/cartography" element={<Cartograhy />} />
          <Route path="/instagram-clone" element={<InstaGramClone />} />
          <Route path="/sport-app" element={<SportApplication />} />
          <Route path="/admin-interface" element={<AdminInterface />} />
          <Route path="/platformer-game" element={<PlatformerGame />} />
         <Route path="/ransomware" element={<Ransomware />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;