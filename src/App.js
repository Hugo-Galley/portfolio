import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import NavBar2 from './components/NavBar2';
import Herro from "./components/Herro";
import AptitudeBar from "./components/aptitudeBar";
import Card from "./components/Card";
import Bento from "./components/bento";
import Contact from "./components/contact";
import CardWork from './components/CardWork';
import Skills from './components/Skills';
import Footer from "./components/Footer";


import insta from './assets/Card/instagram-2.webp';
import cart from './assets/Card/Carto.webp';
import actifit from './assets/Card/actifit.webp';
import mario from './assets/Card/mario.webp';
import virus from './assets/Card/virus.webp';
import unif from './assets/Card/unif.webp'
import gmailAi from './assets/Card/gmailAi.webp'
import Sync from './assets/Pages/SyncCard.png'
import axa from './assets/Card/AXA_Logo.svg-2.png'

import Phantom from './PagesProjects/Phantom';
import EasyWorkEnv from './PagesProjects/EasyWorkEnv';

import './Styles/App.css';

import Cartograhy from './PagesProjects/Cartography';
import InstaGramClone from './PagesProjects/InstaGramClone';
import SportApplication from './PagesProjects/SportApplication';
import AdminInterface from './PagesProjects/AdminInterface';
import PlatformerGame from './PagesProjects/PlaformerGame';
import Ransomware from './PagesProjects/Ransomware';
import GmailAiSort from './PagesProjects/GmailAISort';
import SyncCRD2CRM from './PagesProjects/SyncCRD2CRM';
import NotFound from './components/NotFound';
import phantom from './assets/Card/phantom-card.png'
import pythonPackage from './assets/Pages/Screenshot 2022-11-05 at 10.44.06 PM.webp'



function App() {
  useEffect(() => {
  }, []);
  useEffect(() => {
    document.querySelectorAll('.navbar2-items').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.navbar2-items').forEach(el => el.classList.remove('active'));
            item.classList.add('active');
        });
    });

    const cursor = document.querySelector('.cursor');

    if (cursor) {
        const handleMouseMove = (e) => {
            cursor.style.top = `${e.clientY -20}px`;
            cursor.style.left = `${e.clientX -20}px`;
        };

        const handleClick = () => {
            cursor.classList.add('expand');
            setTimeout(() => {
                cursor.classList.remove('expand');
            }, 500);
        };

       
        const handleMouseEnter = () => {
            cursor.style.display = 'flex';
        };

        const handleMouseLeave = () => {
            cursor.style.display = 'none';
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('click', handleClick);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);

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
              <div id="Home">
                <Herro/>
              </div>
              

              <AptitudeBar/>
              <div className="projectPage">
                <h1 id="AboutMe">A Propos</h1>
                <Bento/>
                <h1 id='MySkills'>Mes Skills</h1>
                <Skills/>
                <h1 id='WorkAt'>Experiences Profesionelles</h1>
                <div className='work-app-container'>
                    <CardWork nom={"ALternant Ingénieur Logiciel"} duré={"Actuellement"} boite={"AXA"} img={axa}/>
                    <CardWork nom={"Stagiaire Ingénieur en Développement"} duré={"17 semaines"} boite={"Uniformation"} img={unif}/>
                    
                </div>
                <h1 id="Projects">Mes Projets</h1>
                <div className="grid-project">
                <Card titre={"Phantom"} categorie={"Python | JS"} image={phantom} lien={'/phantom'}/>
                 <Card titre={"EasyWorkEnv"} categorie={"Package Python"} image={pythonPackage} lien={'/easyworkenv'}/>
                  <Card titre={"Cartography"} categorie={".NET | Blazor"} image={cart} lien={'/cartography'}/>
                  <Card titre={"Instagram clone"} categorie={"React"} image={insta} lien={'/instagram-clone'} />
                  <Card titre={"Application de Sport"} categorie={"Expo | React Native"} image={actifit} lien={'/sport-app'} />
                  <Card titre={"Jeux Platformer"} categorie={"Python "} image={mario} lien={"/platformer-game"}/>
                  <Card titre={"Cybersecuritée "} categorie={"Python"} image={virus} lien={'/ransomware'} />
                  <Card titre={"GmailAiSort "} categorie={"Python | AI"} image={gmailAi} lien={'/gmail-ai-sort'} />
                  <Card titre={"SyncCRD2CRM"} categorie={".NET | Blazor"} image={Sync} lien={'/sync-crd-crm'}/>
                </div>
                <h1 id="Contact">Contact</h1>
                <p id="contactText">Si vous souhaitez me contacter ou collaborer avec moi.</p>
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
          <Route path="/sync-crd-crm" element={<SyncCRD2CRM />} />
          <Route path="/phantom" element={<Phantom />} />
          <Route path='/easyworkenv' element={<EasyWorkEnv/>}/>
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;