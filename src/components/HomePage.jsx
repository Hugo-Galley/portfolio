import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Herro from "./Herro";
import AptitudeBar from "./aptitudeBar";
import Card from "./Card";
import Bento from "./bento";
import Contact from "./contact";
import CardWork from './CardWork';
import Skills from './Skills';
import Footer from "./Footer";

import insta from '../assets/Card/instagram-2.webp';
import cart from '../assets/Card/Carto.webp';
import actifit from '../assets/Card/actifit.webp';
import mario from '../assets/Card/mario.webp';
import virus from '../assets/Card/virus.webp';
import unif from '../assets/Card/unif.webp';
import gmailAi from '../assets/Card/gmailAi.webp';
import Sync from '../assets/Pages/SyncCard.png';
import axa from '../assets/Card/AXA_Logo.svg-2.png';
import phantom from '../assets/Card/phantom-card.png';
import pythonPackage from '../assets/Pages/Screenshot 2022-11-05 at 10.44.06 PM.webp';

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      <div id="Home">
        <Herro/>
      </div>
      
      <AptitudeBar/>
      <div className="projectPage">
        <h1 id="AboutMe">{t('about.title')}</h1>
        <Bento/>
        <h1 id='MySkills'>{t('skills.title')}</h1>
        <Skills/>
        <h1 id='WorkAt'>{t('work.title')}</h1>
        <div className='work-app-container'>
          <CardWork 
            nom={t('work.softwareEngineerIntern')} 
            duré={t('work.currently')} 
            boite={"AXA"} 
            img={axa}
          />
          <CardWork 
            nom={t('work.devEngineerIntern')} 
            duré={`17 ${t('work.weeks')}`} 
            boite={"Uniformation"} 
            img={unif}
          />
        </div>
        <h1 id="Projects">{t('projects.title')}</h1>
        <div className="grid-project">
          <Card titre={"Phantom"} categorie={"Python | JS"} image={phantom} lien={'/phantom'}/>
          <Card titre={"EasyWorkEnv"} categorie={"Package Python"} image={pythonPackage} lien={'/easyworkenv'}/>
          <Card titre={"Cartography"} categorie={".NET | Blazor"} image={cart} lien={'/cartography'}/>
          <Card titre={"Instagram clone"} categorie={"React"} image={insta} lien={'/instagram-clone'} />
          <Card titre={t('projects.sportApp')} categorie={"Expo | React Native"} image={actifit} lien={'/sport-app'} />
          <Card titre={t('projects.platformerGame')} categorie={"Python"} image={mario} lien={"/platformer-game"}/>
          <Card titre={t('projects.cybersecurity')} categorie={"Python"} image={virus} lien={'/ransomware'} />
          <Card titre={"GmailAiSort"} categorie={"Python | AI"} image={gmailAi} lien={'/gmail-ai-sort'} />
          <Card titre={"SyncCRD2CRM"} categorie={".NET | Blazor"} image={Sync} lien={'/sync-crd-crm'}/>
        </div>
        <h1 id="Contact">{t('contact.title')}</h1>
        <p id="contactText">{t('contact.subtitle')}</p>
        <Contact/>
      </div>
      <Footer/>
    </>
  );
}
