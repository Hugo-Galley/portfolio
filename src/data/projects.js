import cart from '../assets/Projects/cartography-card.webp';
import gmailAi from '../assets/Projects/gmail-ai-sort-card.webp';
import sync from '../assets/Projects/sync-crd-crm-card.webp';
import phantom from '../assets/Projects/phantom-card.webp';
import numera from '../assets/Projects/numera-card.webp';
import easyWorkEnv from '../assets/Projects/easyworkenv-card.webp';
import cleanFeed from '../assets/Projects/clean-feed-card.webp';

/* Shared by the Projects list and the globe (each project is a named point on it) */
const PROJECTS = [
  { titre: 'Clean Feed', categorie: 'Extension Firefox | Chrome', image: cleanFeed, lien: '/clean-feed/' },
  { titre: 'Numera', categorie: 'FastAPI | React', image: numera, lien: '/numera/' },
  { titre: 'Phantom', categorie: 'Python | JS', image: phantom, lien: '/phantom/' },
  { titre: 'EasyWorkEnv', categorie: 'Package Python', image: easyWorkEnv, lien: '/easyworkenv/' },
  { titre: 'Cartography', categorie: '.NET | Blazor', image: cart, lien: '/cartography/' },
  { titre: 'GmailAiSort', categorie: 'Python | AI', image: gmailAi, lien: '/gmail-ai-sort/' },
  { titre: 'SyncCRD2CRM', categorie: '.NET | Blazor', image: sync, lien: '/sync-crd-crm/' },
];

export const PROJECT_EVENT = 'globe:project';
export const PAGE_EVENT = 'globe:page';
// a project point (or its name) was clicked on the globe
export const PICK_EVENT = 'globe:pick';

export const projectIndex = (pathname) => {
  const path = pathname.replace(/\/$/, '');
  return PROJECTS.findIndex((p) => p.lien.replace(/\/$/, '') === path);
};

export default PROJECTS;
