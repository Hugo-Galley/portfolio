import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

const rootElement = document.getElementById('root');

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(() => {});
  });
}

const appContent = (
  <StrictMode>
    <HelmetProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </HelmetProvider>
  </StrictMode>
);

// If the root already has children (pre-rendered by react-snap),
// use hydrateRoot for seamless hydration. Otherwise, use createRoot.
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, appContent);
} else {
  createRoot(rootElement).render(appContent);
}
