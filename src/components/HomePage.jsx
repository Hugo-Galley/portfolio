import { lazy, Suspense, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Hero from './Hero';
import Projects from './Projects';
import About from './About';
import Stack from './Stack';
import Experience from './Experience';
import OpenSourceShowcase, { GithubProfileLink } from './OpenSourceShowcase';
import Contact from './Contact';
import Footer from './Footer';
import SectionHead from './SectionHead';
import '../Styles/Home.css';

const GlobeScene = lazy(() => import('./GlobeScene'));

// The 3D globe is desktop-only: on phones it costs too much for too little
const DESKTOP_QUERY = '(min-width: 769px)';
function useIsDesktop() {
  const [desktop, setDesktop] = useState(() => window.matchMedia(DESKTOP_QUERY).matches);
  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    const onChange = (e) => setDesktop(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);
  return desktop;
}

export default function HomePage() {
  const { t } = useLanguage();
  const location = useLocation();
  const isDesktop = useIsDesktop();

  useEffect(() => {
    const section = location.state?.scrollTo;
    if (!section) return;
    const element = document.getElementById(section);
    if (element) {
      setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [location.state]);

  return (
    <>
      {isDesktop && (
        <Suspense fallback={null}>
          <GlobeScene />
        </Suspense>
      )}
      <div id="Home">
        <Hero />
      </div>

      <div className="home">
        <section className="home-section">
          <SectionHead id="AboutMe" title={t('sections.aboutTitle')} muted={t('sections.aboutMuted')} />
          <About />
        </section>

        <section className="home-section home-section--stack">
          <SectionHead title={t('sections.stackTitle')} muted={t('sections.stackMuted')} align="center" />
          <Stack />
        </section>

        <section className="home-section">
          <SectionHead id="WorkAt" title={t('sections.workTitle')} muted={t('sections.workMuted')} />
          <Experience />
        </section>

        <section className="home-section" aria-labelledby="OpenSource">
          <SectionHead
            id="OpenSource"
            title={t('sections.osTitle')}
            muted={t('sections.osMuted')}
            action={<GithubProfileLink />}
          />
          <OpenSourceShowcase />
        </section>

        <section className="home-section">
          <SectionHead id="Projects" title={t('sections.projectsTitle')} muted={t('sections.projectsMuted')} />
          <Projects />
        </section>

        <section className="home-section home-section--contact">
          <SectionHead id="Contact" title={t('sections.contactTitle')} muted={t('sections.contactMuted')} align="center" />
          <Contact />
        </section>
      </div>
      <Footer />
    </>
  );
}
