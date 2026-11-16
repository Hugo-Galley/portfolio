import { lazy, Suspense, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { projectIndex } from '../data/projects';

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

/*
 * One globe for the whole site, mounted above the routes so it is never rebuilt:
 * going from the home page to a project (or from one project to the next) only
 * moves it and turns it towards the right point. Any other path is the 404.
 */
export default function GlobeHost() {
  const { pathname } = useLocation();
  const isDesktop = useIsDesktop();
  const home = pathname === '/' || pathname === '/index.html';
  const index = projectIndex(pathname);
  if (!isDesktop) return null;
  const page = home ? null : index >= 0 ? index : 'lost';
  return (
    <Suspense fallback={null}>
      <GlobeScene project={page} />
    </Suspense>
  );
}
