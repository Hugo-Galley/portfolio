import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://galleyhugo.com';
const DEFAULT_IMAGE = `${SITE_URL}/preview.png`;

const SEO_BY_PATH = {
  '/': {
    title: 'Portfolio | Hugo Galley - Developpeur',
    description: 'Portfolio de Hugo Galley, developpeur logiciel et web. Decouvrez mes projets, mes competences et mon parcours.',
  },
  '/cartography': {
    title: 'Cartography | Projet .NET Blazor - Hugo Galley',
    description: 'Projet Cartography: application .NET et Blazor pour cartographier et rechercher les serveurs d entreprise.',
  },
  '/instagram-clone': {
    title: 'Instagram Clone | Projet React - Hugo Galley',
    description: 'Clone Instagram en React pour travailler le front-end moderne et les composants reutilisables.',
  },
  '/sport-app': {
    title: 'ActiFit | Projet React Native - Hugo Galley',
    description: 'Application de sport en React Native avec seances personnalisees et suivi de progression.',
  },
  '/admin-interface': {
    title: 'Admin Interface | Projet Python - Hugo Galley',
    description: 'Interface admin en Python avec CustomTkinter pour la gestion et la simulation de connexion.',
  },
  '/platformer-game': {
    title: 'Mario Briss | Jeu Python Pygame - Hugo Galley',
    description: 'Jeu de plateforme en Python et Pygame, inspire de Mario, realise pour progresser en game dev.',
  },
  '/ransomware': {
    title: 'Ransomware Educatif | Projet Python - Hugo Galley',
    description: 'Projet educatif en cybersecurite pour comprendre les risques ransomware et la protection des donnees.',
  },
  '/gmail-ai-sort': {
    title: 'Gmail AI Sort | Projet IA Python - Hugo Galley',
    description: 'Projet IA en Python pour trier automatiquement les emails Gmail avec un modele de langage.',
  },
  '/sync-crd-crm': {
    title: 'SyncCRD2CRM | Projet .NET Dynamics 365 - Hugo Galley',
    description: 'Service de synchronisation entre CRD interne et CRM Dynamics 365 avec interface de mapping.',
  },
  '/phantom': {
    title: 'Phantom | Messagerie securisee - Hugo Galley',
    description: 'Projet de messagerie securisee avec chiffrement de bout en bout, inspire de Signal et WhatsApp.',
  },
  '/easyworkenv': {
    title: 'EasyWorkEnv | Package Python - Hugo Galley',
    description: 'Package Python pour gerer facilement les variables d environnement avec une API simple.',
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

  useEffect(() => {
    const seo = SEO_BY_PATH[location.pathname] || {
      title: 'Page introuvable | Hugo Galley',
      description: 'La page demandee est introuvable.',
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
  }, [location.pathname]);

  return null;
}
