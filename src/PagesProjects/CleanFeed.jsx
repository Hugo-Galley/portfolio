import cleanFeedImg from '../assets/Projects/clean-feed.webp';
import js from '../assets/Pages/JavaScript-logo.webp';
import webTech from '../assets/Card/HTML-CSS-JS-Logo.webp';
import GithubButton from '../components/GithubButton';
import '../Styles/PagesProjects.css';
import '../Styles/GithubButton.css';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../hooks/useUmami';

const FIREFOX_URL = 'https://addons.mozilla.org/fr/firefox/addon/clean-feed-hide-shorts-reels/';
const CHROME_URL = 'https://chromewebstore.google.com/detail/inhjhkkbaiodhbecdkempfnjkhnpdllf';
const REPO_URL = 'https://github.com/Hugo-Galley/clean-feed';

// Met en avant le bouton du navigateur du visiteur.
function isFirefox() {
    return typeof navigator !== 'undefined' && /firefox/i.test(navigator.userAgent);
}

// Logos monochromes (Simple Icons, CC0) : même rendu que l'icône GitHub du bouton voisin.
const FIREFOX_PATH = "M20.452 3.445a11.002 11.002 0 00-2.482-1.908C16.944.997 15.098.093 12.477.032c-.734-.017-1.457.03-2.174.144-.72.114-1.398.292-2.118.56-1.017.377-1.996.975-2.574 1.554.583-.349 1.476-.733 2.55-.992a10.083 10.083 0 013.729-.167c2.341.34 4.178 1.381 5.48 2.625a8.066 8.066 0 011.298 1.587c1.468 2.382 1.33 5.376.184 7.142-.85 1.312-2.67 2.544-4.37 2.53-.583-.023-1.438-.152-2.25-.566-2.629-1.343-3.021-4.688-1.118-6.306-.632-.136-1.82.13-2.646 1.363-.742 1.107-.7 2.816-.242 4.028a6.473 6.473 0 01-.59-1.895 7.695 7.695 0 01.416-3.845A8.212 8.212 0 019.45 5.399c.896-1.069 1.908-1.72 2.75-2.005-.54-.471-1.411-.738-2.421-.767C8.31 2.583 6.327 3.061 4.7 4.41a8.148 8.148 0 00-1.976 2.414c-.455.836-.691 1.659-.697 1.678.122-1.445.704-2.994 1.248-4.055-.79.413-1.827 1.668-2.41 3.042C.095 9.37-.2 11.608.14 13.989c.966 5.668 5.9 9.982 11.843 9.982C18.62 23.971 24 18.591 24 11.956a11.93 11.93 0 00-3.548-8.511z";
const CHROME_PATH = "M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-5.344 9.257c.206.01.413.016.621.016 6.627 0 12-5.373 12-12 0-1.54-.29-3.011-.818-4.364zM12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728Z";

function BrowserIcon({ path }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
            <path d={path} />
        </svg>
    );
}

export default function CleanFeed() {
    const { t } = useLanguage();
    const firefoxFirst = isFirefox();

    const firefoxButton = (
        <a
            key="firefox"
            href={`${FIREFOX_URL}?utm_source=galleyhugo.com&utm_medium=portfolio`}
            target="_blank"
            rel="noreferrer"
            className='github-link'
            onClick={() => trackEvent('store-click', { project: 'clean-feed', store: 'firefox' })}
        >
            <span className="github-button"><BrowserIcon path={FIREFOX_PATH} />{t('projectPages.cleanFeed.firefox')}</span>
        </a>
    );

    const chromeButton = CHROME_URL ? (
        <a
            key="chrome"
            href={CHROME_URL}
            target="_blank"
            rel="noreferrer"
            className='github-link'
            onClick={() => trackEvent('store-click', { project: 'clean-feed', store: 'chrome' })}
        >
            <span className="github-button"><BrowserIcon path={CHROME_PATH} />{t('projectPages.cleanFeed.chrome')}</span>
        </a>
    ) : (
        <span key="chrome" className='github-link' aria-disabled="true">
            <span className="github-button" style={{ opacity: 0.55, cursor: 'default' }}>
                <BrowserIcon path={CHROME_PATH} />{t('projectPages.cleanFeed.chromeSoon')}
            </span>
        </span>
    );

    return (
        <div className='project-container'>
            <div className='project-card'>
                <img src={cleanFeedImg} alt={t('projectPages.cleanFeed.imageAlt')} className='project-image' />
                <div className='project-info'>
                    <h1 className='project-title'>{t('projectPages.cleanFeed.title')}</h1>
                    <p className='project-description'>
                        {t('projectPages.cleanFeed.description')}
                    </p>
                    <div className='tech-stack'>
                        <div className='tech-item'>
                            <img src={js} alt="JavaScript" />
                            <p>JavaScript</p>
                        </div>
                        <div className='tech-item'>
                            <img src={webTech} alt="HTML / CSS" />
                            <p>WebExtensions</p>
                        </div>
                    </div>
                    <div className='project-actions'>
                        {firefoxFirst ? [firefoxButton, chromeButton] : [chromeButton, firefoxButton]}
                        <a href={REPO_URL} target="_blank" rel="noreferrer" className='github-link' onClick={() => trackEvent('github-repo-click', { repo: 'Hugo-Galley/clean-feed' })}>
                            <GithubButton />
                        </a>
                    </div>
                    <p className='project-note'>{t('projectPages.cleanFeed.note')}</p>
                </div>
            </div>
        </div>
    );
}
