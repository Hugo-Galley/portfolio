import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SeoManager from './components/SeoManager';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import HomePage from './components/HomePage';
import NotFound from './components/NotFound';
import BackHome from './components/BackHome';
import GlobeHost from './components/GlobeHost';

import './Styles/App.css';

import Cartography from './PagesProjects/Cartography';
import GmailAiSort from './PagesProjects/GmailAISort';
import SyncCRD2CRM from './PagesProjects/SyncCRD2CRM';
import Phantom from './PagesProjects/Phantom';
import Numera from './PagesProjects/Numera';
import EasyWorkEnv from './PagesProjects/EasyWorkEnv';
import CleanFeed from './PagesProjects/CleanFeed';

/* Project pages are small (one shared layout): bundled with the app rather than lazy-loaded,
   so hydrating a pre-rendered project page never hits a loading state (React error #418) */
function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
      <Router>
        <a href="#main-content" className="skip-link">Aller au contenu principal</a>
        <main className="main" id="main-content">
          <SeoManager />
          <BackHome />
          <GlobeHost />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/index.html" element={<HomePage />} />
          
          <Route path="/cartography" element={<Cartography />} />
          <Route path="/gmail-ai-sort" element={<GmailAiSort />} />
          <Route path="/sync-crd-crm" element={<SyncCRD2CRM />} />
          <Route path="/phantom" element={<Phantom />} />
          <Route path='/easyworkenv' element={<EasyWorkEnv/>}/>
          <Route path="/numera" element={<Numera />} />
          <Route path="/clean-feed" element={<CleanFeed />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </main>
    </Router>
    </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
