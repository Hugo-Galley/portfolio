import { useEffect } from 'react';
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
import useReveal from '../hooks/useReveal';
import PROJECTS from '../data/projects';
import '../Styles/Home.css';

export default function HomePage() {
  const { t } = useLanguage();
  const location = useLocation();
  useReveal();

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
      <div id="Home">
        <Hero />
      </div>

      <div className="home">
        <section className="home-section">
          <SectionHead id="AboutMe" title={t('sections.aboutTitle')} muted={t('sections.aboutMuted')} />
          <About />
        </section>

        <section className="home-section home-section--full">
          <SectionHead title={t('sections.stackTitle')} muted={t('sections.stackMuted')} align="center" />
          <Stack />
        </section>

        <section className="home-section">
          <SectionHead id="WorkAt" title={t('sections.workTitle')} muted={t('sections.workMuted')} />
          <Experience />
        </section>

        <section className="home-section home-section--full home-section--os" aria-labelledby="OpenSource">
          <SectionHead
            id="OpenSource"
            title={t('sections.osTitle')}
            muted={t('sections.osMuted')}
            action={<GithubProfileLink />}
          />
          <OpenSourceShowcase />
        </section>

        {/* desktop: the section stays pinned while the scroll unfolds the projects one by one */}
        <section className="home-section home-section--projects" aria-labelledby="Projects">
          <div className="projects-scroll" style={{ '--steps': PROJECTS.length }}>
            <div className="projects-sticky">
              <SectionHead id="Projects" title={t('sections.projectsTitle')} muted={t('sections.projectsMuted')} />
              <Projects />
            </div>
          </div>
        </section>

        <section className="home-section home-section--full home-section--contact">
          <SectionHead id="Contact" title={t('sections.contactTitle')} muted={t('sections.contactMuted')} align="center" />
          <Contact />
        </section>
      </div>
      <Footer />
    </>
  );
}
