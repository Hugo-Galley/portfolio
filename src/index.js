import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker enregistré avec succès :', registration);
      })
      .catch((error) => {
        console.error('Erreur d\'enregistrement du Service Worker :', error);
      });
  });
}
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
