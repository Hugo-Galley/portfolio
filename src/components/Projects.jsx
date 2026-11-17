import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../hooks/useUmami';
import { useLanguage } from '../context/LanguageContext';
import PROJECTS, { PROJECT_EVENT, PICK_EVENT } from '../data/projects';

const focusGlobe = (index) => window.dispatchEvent(new CustomEvent(PROJECT_EVENT, { detail: index }));

/*
 * Projects: an editorial list on the left, the globe on the right.
 * Each project is a named point on the globe. A first click on a project unfolds its
 * preview (and turns the globe towards it), a second click opens its page.
 * Until the visitor clicks, the list walks through the projects on its own.
 */
export default function Projects() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    focusGlobe(active);
  }, [active]);

  const hovering = useRef(false);
  const interacted = useRef(false);

  const onRowClick = (e, i, titre) => {
    if (i !== active) {
      // first click: unfold this project instead of leaving the page
      e.preventDefault();
      interacted.current = true;
      setActive(i);
      return;
    }
    trackEvent('project-click', { project: titre });
  };

  // a click on a project's point on the globe unfolds that project here
  useEffect(() => {
    const onPick = (e) => {
      const i = Number(e.detail);
      if (!Number.isInteger(i) || !PROJECTS[i]) return;
      interacted.current = true;
      setActive(i);
      trackEvent('project-globe-pick', { project: PROJECTS[i].titre });
    };
    window.addEventListener(PICK_EVENT, onPick);
    return () => window.removeEventListener(PICK_EVENT, onPick);
  }, []);

  // While the section is on screen, nobody points at it and nothing was clicked yet,
  // walk through the projects
  useEffect(() => {
    let visible = false;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.3 });
    io.observe(ref.current);
    const id = setInterval(() => {
      if (visible && !hovering.current && !interacted.current && !document.hidden) {
        setActive((i) => (i + 1) % PROJECTS.length);
      }
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
        onPointerLeave={() => { hovering.current = false; }}
      >
        {PROJECTS.map((p, i) => (
          <li key={p.lien} className={`project-row${i === active ? ' is-active' : ''}`}>
            <Link
              to={p.lien}
              className="project-link"
              aria-expanded={i === active}
              onClick={(e) => onRowClick(e, i, p.titre)}
            >
              <span className="project-index">{String(i + 1).padStart(2, '0')}</span>
              <span className="project-name">{p.titre}</span>
              <span className="project-cat">{p.categorie}</span>
              <span className="project-arrow" aria-hidden="true">↗</span>
            </Link>
            <div className="project-preview" aria-hidden={i !== active}>
              <div className="project-preview-inner">
                <Link
                  to={p.lien}
                  tabIndex={-1}
                  className="project-shot"
                  aria-label={`${t('sections.viewProject')} ${p.titre}`}
                  onClick={() => trackEvent('project-click', { project: p.titre })}
                >
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
