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
 * On desktop the scroll unfolds them one by one (the section is pinned meanwhile).
 */
export default function Projects() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    focusGlobe(active);
  }, [active]);

  // scroll-driven unfolding: where the scroll is (target) and what is unfolded (shown)
  const target = useRef(-1);
  const shown = useRef(-1);

  const onRowClick = (e, i, titre) => {
    if (i !== active) {
      // first click: unfold this project instead of leaving the page
      e.preventDefault();
      shown.current = i;
      setActive(i);
      trackEvent('project-expand', { project: titre, source: 'list' });
      return;
    }
    trackEvent('project-open', { project: titre, from: 'home' });
  };

  // a click on a project's point on the globe unfolds that project here
  useEffect(() => {
    const onPick = (e) => {
      const i = Number(e.detail);
      if (!Number.isInteger(i) || !PROJECTS[i]) return;
      shown.current = i;
      setActive(i);
      trackEvent('project-expand', { project: PROJECTS[i].titre, source: 'globe' });
    };
    window.addEventListener(PICK_EVENT, onPick);
    return () => window.removeEventListener(PICK_EVENT, onPick);
  }, []);

  // Desktop: the section is pinned and the scroll unfolds the projects one by one.
  // A click still unfolds any project; the next step of scroll takes over again.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 769px)');
    const box = ref.current && ref.current.closest('.projects-scroll');
    if (!box) return undefined;
    let raf = null;
    let timer = null;
    // a fast scroll can jump several steps at once: unfold the projects in between one
    // after the other anyway, so none is skipped
    const advance = () => {
      timer = null;
      if (shown.current === target.current) return;
      shown.current += Math.sign(target.current - shown.current);
      setActive(shown.current);
      timer = setTimeout(advance, 350);
    };
    const update = () => {
      raf = null;
      if (!mq.matches) return;
      const r = box.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      if (span <= 0) return;
      const p = Math.min(1, Math.max(0, -r.top / span));
      const step = Math.min(PROJECTS.length - 1, Math.floor(p * PROJECTS.length));
      if (step === target.current) return;
      target.current = step;
      if (shown.current < 0) {
        // first measure (page load, coming back from a project): no walk-through
        shown.current = step;
        setActive(step);
      } else if (!timer) {
        advance();
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (timer) clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="projects container" ref={ref}>
      <ol className="projects-list">
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
                  onClick={() => trackEvent('project-open', { project: p.titre, from: 'home' })}
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
