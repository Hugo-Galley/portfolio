import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const SITE_URL = 'https://galleyhugo.com';
const DEFAULT_IMAGE = `${SITE_URL}/preview.png?v=2`;

const PROJECT_SCHEMAS = {
  '/cartography': { name: 'Cartography', langs: ['.NET', 'Blazor', 'C#'], repo: null },
  '/instagram-clone': { name: 'Instagram Clone', langs: ['React', 'JavaScript'], repo: null },
  '/sport-app': { name: 'ActiFit', langs: ['React Native', 'Expo', 'JavaScript'], repo: null },
  '/admin-interface': { name: 'Admin Interface', langs: ['Python'], repo: null },
  '/platformer-game': { name: 'Mario Briss', langs: ['Python', 'Pygame'], repo: null },
  '/ransomware': { name: 'Educational Ransomware', langs: ['Python'], repo: null },
  '/gmail-ai-sort': { name: 'Gmail AI Sort', langs: ['Python'], repo: null },
  '/sync-crd-crm': { name: 'SyncCRD2CRM', langs: ['.NET', 'Blazor', 'C#'], repo: null },
  '/phantom': { name: 'Phantom', langs: ['Python', 'JavaScript'], repo: 'https://github.com/Hugo-Galley' },
  '/easyworkenv': { name: 'EasyWorkEnv', langs: ['Python'], repo: 'https://github.com/Hugo-Galley/EasyWorkEnv' },
};

const SEO_TRANSLATIONS = {
  fr: {
    '/': {
      title: 'Hugo Galley — Développeur Logiciel | Portfolio',
      description: 'Hugo Galley — Développeur logiciel & DevOps chez AXA, diplômé EPSI Paris. C#, .NET, DevOps. Découvrez mes projets open-source et mes expériences professionnelles.',
    },
    '/cartography': {
      title: 'Cartography | Projet .NET Blazor - Hugo Galley',
      description: 'Projet Cartography : application .NET et Blazor pour cartographier et rechercher les serveurs d\'entreprise.',
    },
    '/instagram-clone': {
      title: 'Instagram Clone | Application Web - Hugo Galley',
      description: 'Application web clone d\'Instagram pour explorer l\'architecture front-end et les composants réutilisables.',
    },
    '/sport-app': {
      title: 'ActiFit | Application Mobile - Hugo Galley',
      description: 'Application mobile de sport avec séances personnalisées et suivi de progression.',
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
      title: 'Hugo Galley — Software Developer | Portfolio',
      description: 'Hugo Galley — Software developer & DevOps at AXA, EPSI Paris graduate. C#, .NET, DevOps. Explore my open-source projects and professional experience.',
    },
    '/cartography': {
      title: 'Cartography | .NET Blazor Project - Hugo Galley',
      description: 'Cartography project: .NET and Blazor application to map and search company servers.',
    },
    '/instagram-clone': {
      title: 'Instagram Clone | Web Application - Hugo Galley',
      description: 'Instagram web clone built to explore modern front-end architecture and reusable UI components.',
    },
    '/sport-app': {
      title: 'ActiFit | Mobile Application - Hugo Galley',
      description: 'Mobile workout tracking application with personalized routines and progress analytics.',
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

export default function SeoManager() {
  const location = useLocation();
  const { language } = useLanguage();

  // Normalize path: strip trailing slash for translations lookup (except root '/')
  const rawPath = location.pathname;
  const normalizedPath = rawPath === '/' ? '/' : rawPath.replace(/\/+$/, '');
  const lookupPath = normalizedPath === '/index.html' ? '/' : normalizedPath;

  // Canonical URLs on GitHub Pages should have a trailing slash for directories to avoid 301 redirects
  const canonicalPath = lookupPath === '/' ? '/' : `${lookupPath}/`;

  const translations = SEO_TRANSLATIONS[language] || SEO_TRANSLATIONS['en'];
  const seo = translations[lookupPath] || {
    title: language === 'fr' ? 'Page introuvable | Hugo Galley' : 'Page Not Found | Hugo Galley',
    description: language === 'fr' ? 'La page demandée est introuvable.' : 'The requested page could not be found.',
    noIndex: true,
  };

  const absoluteUrl = `${SITE_URL}${canonicalPath}`;
  const frUrl = `${SITE_URL}${canonicalPath}?lang=fr`;
  const enUrl = `${SITE_URL}${canonicalPath}?lang=en`;

  const projectSchema = PROJECT_SCHEMAS[lookupPath];

  const structuredData = lookupPath === '/'
    ? {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            url: `${SITE_URL}/`,
            name: 'Hugo Galley',
            alternateName: 'Hugo Galley Portfolio',
            description: seo.description,
            inLanguage: language === 'fr' ? 'fr-FR' : 'en-US',
          },
          {
            '@type': 'ProfilePage',
            '@id': `${SITE_URL}/#profilepage`,
            name: seo.title,
            description: seo.description,
            url: absoluteUrl,
            mainEntity: {
              '@type': 'Person',
              '@id': `${SITE_URL}/#person`,
              name: 'Hugo Galley',
              jobTitle: language === 'fr' ? 'Développeur logiciel & DevOps' : 'Software Developer & DevOps Engineer',
              description: language === 'fr'
                ? 'Développeur logiciel & DevOps chez AXA, diplômé EPSI Paris, spécialisé en .NET, C# et DevOps.'
                : 'Software developer & DevOps engineer at AXA, EPSI Paris graduate, specializing in .NET, C# and DevOps.',
              url: SITE_URL,
              image: DEFAULT_IMAGE,
              email: 'contact@galleyhugo.com',
              worksFor: {
                '@type': 'Organization',
                name: 'AXA',
              },
              alumniOf: {
                '@type': 'EducationalOrganization',
                name: 'EPSI Paris',
              },
              knowsAbout: ['.NET', 'C#', 'DevOps', 'Docker', 'CI/CD', 'Azure DevOps', 'Python'],
              sameAs: [
                'https://www.linkedin.com/in/hugo-galley/',
                'https://github.com/Hugo-Galley',
                'https://wiki.galleyhugo.com',
              ],
            },
            hasPart: Object.entries(PROJECT_SCHEMAS).map(([path, p]) => ({
              '@type': 'WebPage',
              name: p.name,
              url: `${SITE_URL}${path}/`,
            })),
          },
          {
            '@type': 'ItemList',
            name: language === 'fr' ? 'Navigation Projets' : 'Projects Navigation',
            itemListElement: Object.entries(PROJECT_SCHEMAS).map(([path, p], index) => ({
              '@type': 'SiteNavigationElement',
              position: index + 1,
              name: p.name,
              url: `${SITE_URL}${path}/`,
            })),
          },
        ],
      }
    : projectSchema
    ? {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: language === 'fr' ? 'Accueil' : 'Home',
                item: `${SITE_URL}/`,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: language === 'fr' ? 'Projets' : 'Projects',
                item: `${SITE_URL}/#Projects`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: projectSchema.name,
                item: absoluteUrl,
              },
            ],
          },
          {
            '@type': 'SoftwareSourceCode',
            name: projectSchema.name,
            description: seo.description,
            url: absoluteUrl,
            programmingLanguage: projectSchema.langs,
            ...(projectSchema.repo ? { codeRepository: projectSchema.repo } : {}),
            author: {
              '@type': 'Person',
              name: 'Hugo Galley',
              url: SITE_URL,
            },
          },
        ],
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: seo.title,
        description: seo.description,
        url: absoluteUrl,
        author: {
          '@type': 'Person',
          name: 'Hugo Galley',
          url: SITE_URL,
        },
      };

  return (
    <Helmet>
      <html lang={language} />
      <title>{seo.title}</title>
      <link rel="canonical" href={absoluteUrl} />

      {/* hreflang : chaque langue pointe vers son URL dédiée */}
      <link rel="alternate" hreflang="fr" href={frUrl} />
      <link rel="alternate" hreflang="en" href={enUrl} />
      <link rel="alternate" hreflang="x-default" href={absoluteUrl} />

      <meta name="description" content={seo.description} />
      <meta name="robots" content={seo.noIndex ? 'noindex, nofollow' : 'index, follow'} />

      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={absoluteUrl} />
      <meta property="og:image" content={DEFAULT_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:locale" content={language === 'fr' ? 'fr_FR' : 'en_US'} />
      <meta property="og:locale:alternate" content={language === 'fr' ? 'en_US' : 'fr_FR'} />
      <meta property="og:site_name" content="Hugo Galley - Portfolio" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={DEFAULT_IMAGE} />
      <meta name="twitter:image:alt" content={seo.title} />

      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
