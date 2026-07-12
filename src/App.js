import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import NavBar2 from './components/NavBar2';
import ThemeToggle from './components/ThemeToggle';
import SeoManager from './components/SeoManager';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import HomePage from './components/HomePage';
import NotFound from './components/NotFound';

import './Styles/App.css';

const Cartography = lazy(() => import('./PagesProjects/Cartography'));
const InstaGramClone = lazy(() => import('./PagesProjects/InstaGramClone'));
const SportApplication = lazy(() => import('./PagesProjects/SportApplication'));
const AdminInterface = lazy(() => import('./PagesProjects/AdminInterface'));
const PlatformerGame = lazy(() => import('./PagesProjects/PlatformerGame'));
const Ransomware = lazy(() => import('./PagesProjects/Ransomware'));
const GmailAiSort = lazy(() => import('./PagesProjects/GmailAISort'));
const SyncCRD2CRM = lazy(() => import('./PagesProjects/SyncCRD2CRM'));
const Phantom = lazy(() => import('./PagesProjects/Phantom'));
const EasyWorkEnv = lazy(() => import('./PagesProjects/EasyWorkEnv'));



function App() {
  useEffect(() => {
    const cursorWrapper = document.querySelector('.cursor-wrapper');
    const cursor = document.querySelector('.cursor');

    const isTouchOrMobile = 
      'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 || 
      window.innerWidth <= 1200;

    if (isTouchOrMobile) {
      if (cursorWrapper) {
        cursorWrapper.style.display = 'none';
      }
      return;
    }

    if (cursorWrapper && cursor) {
      const handleMouseMove = (e) => {
        cursorWrapper.style.transform = `translate3d(${e.clientX - 20}px, ${e.clientY - 20}px, 0)`;
      };

      const handleClick = () => {
        cursor.classList.add('expand');
        setTimeout(() => {
          cursor.classList.remove('expand');
        }, 500);
      };

      const handleMouseEnter = () => {
        cursorWrapper.style.display = 'flex';
      };

      const handleMouseLeave = () => {
        cursorWrapper.style.display = 'none';
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('click', handleClick);
      document.addEventListener('mouseenter', handleMouseEnter);
      document.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('click', handleClick);
        document.removeEventListener('mouseenter', handleMouseEnter);
        document.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
      <Router>
        <div className='cursor-wrapper'>
          <div className='cursor'></div>
        </div>
        <div className="bg-blobs">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>
        <div className="bg-noise"></div>
        <div className="main">
          <SeoManager />
          <NavBar2/>
          <ThemeToggle />
          <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
          
          <Route path="/cartography" element={<Cartography />} />
          <Route path="/instagram-clone" element={<InstaGramClone />} />
          <Route path="/sport-app" element={<SportApplication />} />
          <Route path="/admin-interface" element={<AdminInterface />} />
          <Route path="/platformer-game" element={<PlatformerGame />} />
          <Route path="/ransomware" element={<Ransomware />} />
          <Route path="/gmail-ai-sort" element={<GmailAiSort />} />
          <Route path="/sync-crd-crm" element={<SyncCRD2CRM />} />
          <Route path="/phantom" element={<Phantom />} />
          <Route path='/easyworkenv' element={<EasyWorkEnv/>}/>
          <Route path="*" element={<NotFound/>} />
        </Routes>
        </Suspense>
      </div>
    </Router>
    </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
