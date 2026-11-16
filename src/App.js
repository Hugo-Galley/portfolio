import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import SeoManager from './components/SeoManager';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import HomePage from './components/HomePage';
import NotFound from './components/NotFound';
import BackHome from './components/BackHome';

import './Styles/App.css';

const Cartography = lazy(() => import('./PagesProjects/Cartography'));
const GmailAiSort = lazy(() => import('./PagesProjects/GmailAISort'));
const SyncCRD2CRM = lazy(() => import('./PagesProjects/SyncCRD2CRM'));
const Phantom = lazy(() => import('./PagesProjects/Phantom'));
const Numera = lazy(() => import('./PagesProjects/Numera'));
const EasyWorkEnv = lazy(() => import('./PagesProjects/EasyWorkEnv'));
const CleanFeed = lazy(() => import('./PagesProjects/CleanFeed'));

function PageSkeleton() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 0.4,
    }}>
      <div style={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        border: '3px solid currentColor',
        borderTopColor: 'transparent',
        animation: 'spin 0.8s linear infinite',
      }} />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
      <Router>
        <a href="#main-content" className="skip-link">Aller au contenu principal</a>
        <main className="main" id="main-content">
          <SeoManager />
          <BackHome />
          <Suspense fallback={<PageSkeleton />}>
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
        </Suspense>
      </main>
    </Router>
    </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
