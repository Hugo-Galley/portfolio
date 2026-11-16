import { useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import PROJECTS, { PROJECT_EVENT } from '../data/projects';
import useReveal from '../hooks/useReveal';
import SectionHead from './SectionHead';
import Footer from './Footer';
import '../Styles/PagesProjects.css';
import '../Styles/GithubButton.css';

/*
 * Every project page, in the same language as the home page:
 * the title next to the globe turned towards the project, the screenshot in large,
 * the tools as stack chips, then the next project (the globe turns to it on the way).
 */
export default function ProjectLayout({ slug, title, description, image, imageAlt, techs, actions, note }) {
  const { t } = useLanguage();
  const index = PROJECTS.findIndex((p) => p.lien === `/${slug}/`);
  const project = PROJECTS[index];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const nextRef = useRef(null);
  useReveal(slug);

  // a new project always starts at the top (instantly, the page itself does not scroll)
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  // reaching "next project" turns the globe towards it, scrolling back turns it back
  useEffect(() => {
    const el = nextRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([e]) => {
      window.dispatchEvent(new CustomEvent(PROJECT_EVENT, {
        detail: e.isIntersecting ? (index + 1) % PROJECTS.length : index,
      }));
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [index]);

  return (
    <>
      <article className="pp">
        <header className="pp-hero container">
          <div className="pp-hero-text">
            <p className="pp-kicker">
              <span className="pp-count">{String(index + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}</span>
              {project && <span>{project.categorie}</span>}
            </p>
            <h1 className="project-title">{title}</h1>
            <p className="pp-lead">{description}</p>
            {actions && <div className="project-actions">{actions}</div>}
            {note && <p className="project-note">{note}</p>}
          </div>
        </header>

        <section id="ProjectShot" className="pp-shot container" aria-label={imageAlt}>
          <figure className="pp-frame">
            <img src={image} alt={imageAlt} width="1200" height="660" decoding="async" />
          </figure>
        </section>

        {techs && techs.length > 0 && (
          <section className="pp-stack">
            <SectionHead title={t('sections.builtWith')} muted={t('sections.builtWithMuted')} />
            <ul className="pp-tech container">
              {techs.map((tech) => (
                <li key={tech.name} className="stack-chip">
                  <img src={tech.src} alt="" width="40" height="40" loading="lazy" decoding="async" />
                  {tech.name}
                </li>
              ))}
            </ul>
          </section>
        )}

        <nav id="ProjectNext" ref={nextRef} className="pp-next container" aria-label={t('sections.nextProject')}>
          <p className="pp-next-label">{t('sections.nextProject')}</p>
          <Link to={next.lien} className="pp-next-link">
            <span className="pp-next-name">{next.titre}</span>
            <span className="pp-next-cat">{next.categorie}</span>
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
        </nav>
      </article>
      <Footer />
    </>
  );
}
