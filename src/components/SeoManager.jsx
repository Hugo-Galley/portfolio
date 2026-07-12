import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const SITE_URL = 'https://galleyhugo.com';
const DEFAULT_IMAGE = `${SITE_URL}/preview.png`;

const SEO_TRANSLATIONS = {
  fr: {
    '/': {
      title: 'Portfolio | Hugo Galley - Développeur',
      description: 'Portfolio de Hugo Galley, développeur logiciel et web. Découvrez mes projets, mes compétences et mon parcours.',
    },
    '/cartography': {
      title: 'Cartography | Projet .NET Blazor - Hugo Galley',
      description: 'Projet Cartography : application .NET et Blazor pour cartographier et rechercher les serveurs d\'entreprise.',
    },
    '/instagram-clone': {
      title: 'Instagram Clone | Projet React - Hugo Galley',
      description: 'Clone Instagram en React pour travailler le front-end moderne et les composants réutilisables.',
    },
    '/sport-app': {
      title: 'ActiFit | Projet React Native - Hugo Galley',
      description: 'Application de sport en React Native avec séances personnalisées et suivi de progression.',
    },
    '/admin-interface': {
      title: 'Admin Interface | Projet Python - Hugo Galley',
      description: 'Interface admin en Python avec CustomTkinter pour la gestion et la simulation de connexion.',
    },
    '/platformer-game': {
      title: 'Mario Briss | Jeu Python Pygame - Hugo Galley',
      description: 'Jeu de plateforme en Python et Pygame, inspiré de Mario, réalisé pour progresser en game dev.',
    },
    '/ransomware': {
      title: 'Ransomware Éducatif | Projet Python - Hugo Galley',
      description: 'Projet éducatif en cybersécurité pour comprendre les risques ransomware et la protection des données.',
    },
    '/gmail-ai-sort': {
      title: 'Gmail AI Sort | Projet IA Python - Hugo Galley',
      description: 'Projet IA en Python pour trier automatiquement les emails Gmail avec un modèle de langage.',
    },
    '/sync-crd-crm': {
      title: 'SyncCRD2CRM | Projet .NET Dynamics 365 - Hugo Galley',
      description: 'Service de synchronisation entre CRD interne et CRM Dynamics 365 avec interface de mapping.',
    },
    '/phantom': {
      title: 'Phantom | Messagerie sécurisée - Hugo Galley',
      description: 'Projet de messagerie sécurisée avec chiffrement de bout en bout, inspiré de Signal et WhatsApp.',
    },
    '/easyworkenv': {
      title: 'EasyWorkEnv | Package Python - Hugo Galley',
      description: 'Package Python pour gérer facilement les variables d\'environnement avec une API simple.',
    },
  },
  en: {
    '/': {
      title: 'Portfolio | Hugo Galley - Developer',
      description: 'Portfolio of Hugo Galley, software and web developer. Discover my projects, skills, and background.',
    },
    '/cartography': {
      title: 'Cartography | .NET Blazor Project - Hugo Galley',
      description: 'Cartography project: .NET and Blazor application to map and search company servers.',
    },
    '/instagram-clone': {
      title: 'Instagram Clone | React Project - Hugo Galley',
      description: 'Instagram clone in React to practice modern front-end and reusable components.',
    },
    '/sport-app': {
      title: 'ActiFit | React Native Project - Hugo Galley',
      description: 'Sports application in React Native with personalized sessions and progress tracking.',
    },
    '/admin-interface': {
      title: 'Admin Interface | Python Project - Hugo Galley',
      description: 'Admin interface in Python with CustomTkinter for management and login simulation.',
    },
    '/platformer-game': {
      title: 'Mario Briss | Python Pygame Game - Hugo Galley',
      description: 'Platformer game in Python with Pygame, inspired by Mario, built to improve game dev skills.',
    },
    '/ransomware': {
      title: 'Educational Ransomware | Python Project - Hugo Galley',
      description: 'Educational cybersecurity project to understand ransomware risks and data protection.',
    },
    '/gmail-ai-sort': {
      title: 'Gmail AI Sort | AI Python Project - Hugo Galley',
      description: 'AI project in Python to automatically sort Gmail emails using a language model.',
    },
    '/sync-crd-crm': {
      title: 'SyncCRD2CRM | .NET Dynamics 365 Project - Hugo Galley',
      description: 'Synchronization service between internal CRD and Dynamics 365 CRM with mapping interface.',
    },
    '/phantom': {
      title: 'Phantom | Secure Messaging - Hugo Galley',
      description: 'Secure messaging project with end-to-end encryption, inspired by Signal and WhatsApp.',
    },
    '/easyworkenv': {
      title: 'EasyWorkEnv | Python Package - Hugo Galley',
      description: 'Python package to easily manage environment variables with a simple API.',
    },
  },
};

function setMeta(name, content, attribute = 'name') {
  const selector = `meta[${attribute}="${name}"]`;
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function setCanonical(href) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

export default function SeoManager() {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    const translations = SEO_TRANSLATIONS[language] || SEO_TRANSLATIONS['en'];
    const seo = translations[location.pathname] || {
      title: language === 'fr' ? 'Page introuvable | Hugo Galley' : 'Page Not Found | Hugo Galley',
      description: language === 'fr' ? 'La page demandée est introuvable.' : 'The requested page could not be found.',
      noIndex: true,
    };

    const absoluteUrl = `${SITE_URL}${location.pathname}`;

    document.title = seo.title;
    setCanonical(absoluteUrl);
    setMeta('description', seo.description);
    setMeta('og:title', seo.title, 'property');
    setMeta('og:description', seo.description, 'property');
    setMeta('og:type', 'website', 'property');
    setMeta('og:url', absoluteUrl, 'property');
    setMeta('og:image', DEFAULT_IMAGE, 'property');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', seo.title);
    setMeta('twitter:description', seo.description);
    setMeta('twitter:image', DEFAULT_IMAGE);
    setMeta('robots', seo.noIndex ? 'noindex, nofollow' : 'index, follow');
  }, [location.pathname, language]);

  return null;
}
