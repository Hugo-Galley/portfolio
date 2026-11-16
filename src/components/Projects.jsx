import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../hooks/useUmami';
import { useLanguage } from '../context/LanguageContext';
import PROJECTS, { PROJECT_EVENT } from '../data/projects';

const focusGlobe = (index) => window.dispatchEvent(new CustomEvent(PROJECT_EVENT, { detail: index }));

/*
 * Projects: an editorial list on the left, the globe on the right.
 * Each project is a named point on the globe; hovering (or focusing) a project
 * turns the globe towards it and opens its preview in the list.
 */
export default function Projects() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    focusGlobe(active);
  }, [active]);

  // While the section is on screen and nobody is pointing at it, walk through the projects
  const hovering = useRef(false);
  // hovering quickly across rows should not open every preview on the way: wait a beat
  const hoverTimer = useRef(null);
  const hoverTo = (i) => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setActive(i), 140);
  };
  useEffect(() => () => clearTimeout(hoverTimer.current), []);
  useEffect(() => {
    let visible = false;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.3 });
    io.observe(ref.current);
    const id = setInterval(() => {
      if (visible && !hovering.current && !document.hidden) setActive((i) => (i + 1) % PROJECTS.length);
    }, 5000);
    return () => {
      io.disconnect();
      clearInterval(id);
    };
  }, []);

  return (
    <div className="projects container" ref={ref}>
      <ol
        className="projects-list"
        onPointerEnter={() => { hovering.current = true; }}
        onPointerLeave={() => { hovering.current = false; clearTimeout(hoverTimer.current); }}
      >
        {PROJECTS.map((p, i) => (
          <li key={p.lien} className={`project-row${i === active ? ' is-active' : ''}`}>
            <Link
              to={p.lien}
              className="project-link"
              onPointerEnter={() => hoverTo(i)}
              onFocus={() => setActive(i)}
              onClick={() => trackEvent('project-click', { project: p.titre })}
            >
              <span className="project-index">{String(i + 1).padStart(2, '0')}</span>
              <span className="project-name">{p.titre}</span>
              <span className="project-cat">{p.categorie}</span>
              <span className="project-arrow" aria-hidden="true">↗</span>
            </Link>
            <div className="project-preview" aria-hidden={i !== active}>
              <div className="project-preview-inner">
                <Link to={p.lien} tabIndex={-1} className="project-shot" aria-label={`${t('sections.viewProject')} ${p.titre}`}>
                  <img src={p.image} alt="" width="1200" height="660" loading="lazy" decoding="async" />
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
