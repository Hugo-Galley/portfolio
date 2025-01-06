import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import NavBar2 from './components/NavBar2';
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
import gmailAi from './assets/Card/gmailAi.webp'

import './Styles/App.css';

import Cartograhy from './PagesProjects/Cartography';
import InstaGramClone from './PagesProjects/InstaGramClone';
import SportApplication from './PagesProjects/SportApplication';
import AdminInterface from './PagesProjects/AdminInterface';
import PlatformerGame from './PagesProjects/PlaformerGame';
import Ransomware from './PagesProjects/Ransomware';
import GmailAiSort from './PagesProjects/GmailAISort';
import { useEffect } from 'react';
import hero from './assets/herroBanner.webp'

function App() {
  useEffect(() => {
    const img = new Image();
    img.src = hero; 
  }, []);
  useEffect(() => {
    // Gestion de l'activation des éléments du navbar
    document.querySelectorAll('.navbar2-items').forEach(item => {
      item.addEventListener('click', () => {
        document.querySelectorAll('.navbar2-items').forEach(el => el.classList.remove('active'));
        item.classList.add('active');
      });
    });
  
    // Initialisation pour suivre l'état du curseur sur la page
    let isCursorOnPage = false;
  
    const handleMouseEnter = () => {
      isCursorOnPage = true;
      console.log('Le curseur est sur la page.');
      const cursorElements = document.querySelectorAll('.cursor');
      cursorElements.forEach(el => el.style.display = 'flex');
    };
  
    const handleMouseLeave = () => {
      isCursorOnPage = false;
      console.log('Le curseur a quitté la page.');
      const cursorElements = document.querySelectorAll('.cursor');
      cursorElements.forEach(el => el.style.display = 'none');
    };
  
    // Ajout des événements de détection d'entrée et de sortie
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
  
    // Gestion du curseur personnalisé
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
  
      // Cleanup
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('click', handleClick);
        document.removeEventListener('mouseenter', handleMouseEnter);
        document.removeEventListener('mouseleave', handleMouseLeave);
      };
    } else {
      console.error("L'élément avec la classe '.cursor' n'a pas été trouvé.");
    }
  }, []);

  return (
    <Router>
            <div className='cursor'></div>
      <div className="main">
      <NavBar2/>
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
                    <CardWork nom={"Career discovery intern"} duré={"1 week"} boite={"BUT"} img={but}/>
                </div>
                <h1 id="Projects">My Projects</h1>
                <div className="grid-project">
                  <Card titre={"Cartography"} categorie={"Web App"} image={cart} lien={'/cartography'}/>
                  <Card titre={"Instagram clone"} categorie={"Web Developement"} image={insta} lien={'/instagram-clone'} />
                  <Card titre={"Sport Application"} categorie={"Mobile Developement"} image={actifit} lien={'/sport-app'} />
                  <Card titre={"Administration Interface"} categorie={"Python"} image={ctk} lien={'/admin-interface'}/>
                  <Card titre={"Platformer Game"} categorie={"Video Game"} image={mario} lien={"/platformer-game"}/>
                  <Card titre={"Cybersecurity "} categorie={"Python"} image={virus} lien={'/ransomware'} />
                  <Card titre={"GmailAiSort "} categorie={"Python | AI"} image={gmailAi} lien={'/gmail-ai-sort'} />
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
          <Route path="/gmail-ai-sort" element={<GmailAiSort />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;