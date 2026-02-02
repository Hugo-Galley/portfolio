import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import NavBar2 from './components/NavBar2';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import HomePage from './components/HomePage';

import './Styles/App.css';

import Cartograhy from './PagesProjects/Cartography';
import InstaGramClone from './PagesProjects/InstaGramClone';
import SportApplication from './PagesProjects/SportApplication';
import AdminInterface from './PagesProjects/AdminInterface';
import PlatformerGame from './PagesProjects/PlaformerGame';
import Ransomware from './PagesProjects/Ransomware';
import GmailAiSort from './PagesProjects/GmailAISort';
import SyncCRD2CRM from './PagesProjects/SyncCRD2CRM';
import NotFound from './components/NotFound';
import Phantom from './PagesProjects/Phantom';
import EasyWorkEnv from './PagesProjects/EasyWorkEnv';



function App() {
  useEffect(() => {
  }, []);
  useEffect(() => {
    document.querySelectorAll('.navbar2-items').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.navbar2-items').forEach(el => el.classList.remove('active'));
            item.classList.add('active');
        });
    });

    const cursor = document.querySelector('.cursor');

    if (cursor) {
        const handleMouseMove = (e) => {
            cursor.style.top = `${e.clientY -20}px`;
            cursor.style.left = `${e.clientX -20}px`;
        };

        const handleClick = () => {
            cursor.classList.add('expand');
            setTimeout(() => {
                cursor.classList.remove('expand');
            }, 500);
        };

       
        const handleMouseEnter = () => {
            cursor.style.display = 'flex';
        };

        const handleMouseLeave = () => {
            cursor.style.display = 'none';
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
    } else {
        console.error("L'élément avec la classe '.cursor' n'a pas été trouvé.");
    }
}, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
      <Router>
        <div className='cursor'></div>
        <div className="main">
          <NavBar2/>
          <ThemeToggle />
          <Routes>
            <Route path="/" element={<HomePage />} />
          
          <Route path="/cartography" element={<Cartograhy />} />
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
      </div>
    </Router>
    </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;