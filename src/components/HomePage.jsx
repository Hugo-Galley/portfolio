import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Hero from "./Hero";
import Card from "./Card";
import Bento from "./Bento";
import Contact from "./Contact";
import CardWork from './CardWork';
import OpenSourceShowcase from './OpenSourceShowcase';
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
import axa from '../assets/Card/AXA_Logo.webp';
import phantom from '../assets/Card/phantom-card.webp';
import pythonPackage from '../assets/Pages/Screenshot 2022-11-05 at 10.44.06 PM.webp';
import ctk from '../assets/Card/ctk2.webp';

export default function HomePage() {
  const { t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const section = location.state?.scrollTo;
    if (!section) {
      return;
    }

    const element = document.getElementById(section);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location.state]);

  return (
    <>
      <div id="Home">
        <Hero/>
      </div>
      <div className="projectPage">
        <h2 id="AboutMe">{t('about.title')}</h2>
        <Bento/>
        <Skills/>
        <h2 id="Work">{t('work.title')}</h2>
        <div className="grid-work">
          <CardWork 
            nom={t('work.softwareDevIntern')} 
            duree={`1 ${t('work.year')}`} 
            boite={"AXA France"} 
            img={axa}
            desc={t('work.axaDesc')}
          />
          <CardWork 
            nom={t('work.devEngineerIntern')} 
            duree={`2 ${t('work.stages')}`} 
            boite={"Uniformation"} 
            img={unif}
            desc={t('work.unifDesc')}
          />
        </div>
        <OpenSourceShowcase />
        <h2 id="Projects">{t('projects.title')}</h2>
        <div className="grid-project">
          <Card titre={"Phantom"} categorie={"Python | JS"} image={phantom} lien={'/phantom/'}/>
          <Card titre={"EasyWorkEnv"} categorie={"Package Python"} image={pythonPackage} lien={'/easyworkenv/'}/>
          <Card titre={"Cartography"} categorie={".NET | Blazor"} image={cart} lien={'/cartography/'}/>
          <Card titre={"Instagram clone"} categorie={"React"} image={insta} lien={'/instagram-clone/'} />
          <Card titre={t('projects.sportApp')} categorie={"Expo | React Native"} image={actifit} lien={'/sport-app/'} />
          <Card titre={t('projects.adminInterface') || "Admin Interface"} categorie={"Python"} image={ctk} lien={'/admin-interface/'}/>
          <Card titre={t('projects.platformerGame')} categorie={"Python"} image={mario} lien={"/platformer-game/"}/>
          <Card titre={t('projects.cybersecurity')} categorie={"Python"} image={virus} lien={'/ransomware/'} />
          <Card titre={"GmailAiSort"} categorie={"Python | AI"} image={gmailAi} lien={'/gmail-ai-sort/'} />
          <Card titre={"SyncCRD2CRM"} categorie={".NET | Blazor"} image={Sync} lien={'/sync-crd-crm/'}/>
        </div>
        <h2 id="Contact">{t('contact.title')}</h2>
        <p id="contactText">{t('contact.subtitle')}</p>
        <Contact/>
      </div>
      <Footer/>
    </>
  );
}
