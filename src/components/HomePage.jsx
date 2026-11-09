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

import insta from '../assets/Projects/instagram-clone-card.webp';
import cart from '../assets/Projects/cartography-card.webp';
import actifit from '../assets/Projects/sport-app-card.webp';
import virus from '../assets/Projects/ransomware-card.webp';
import unif from '../assets/Card/unif.webp';
import gmailAi from '../assets/Projects/gmail-ai-sort-card.webp';
import Sync from '../assets/Projects/sync-crd-crm-card.webp';
import axa from '../assets/Card/AXA_Logo.webp';
import phantom from '../assets/Projects/phantom-card.webp';
import numera from '../assets/Projects/numera-card.webp';
import pythonPackage from '../assets/Projects/easyworkenv-card.webp';
import cleanFeed from '../assets/Projects/clean-feed-card.webp';

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
        <h2 id="WorkAt">{t('work.title')}</h2>
        <div className="grid-work">
          <CardWork 
            nom={t('work.softwareEngineerIntern')} 
            duree={t('work.currently')} 
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
          <Card titre={"Clean Feed"} categorie={"Extension Firefox | Chrome"} image={cleanFeed} lien={'/clean-feed/'}/>
          <Card titre={"Numera"} categorie={"FastAPI | React"} image={numera} lien={'/numera/'}/>
          <Card titre={"Phantom"} categorie={"Python | JS"} image={phantom} lien={'/phantom/'}/>
          <Card titre={"EasyWorkEnv"} categorie={"Package Python"} image={pythonPackage} lien={'/easyworkenv/'}/>
          <Card titre={"Cartography"} categorie={".NET | Blazor"} image={cart} lien={'/cartography/'}/>
          <Card titre={"Instagram clone"} categorie={"React"} image={insta} lien={'/instagram-clone/'} />
          <Card titre={t('projects.sportApp')} categorie={"Expo | React Native"} image={actifit} lien={'/sport-app/'} />
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
