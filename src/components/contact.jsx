import { useState } from 'react';
import { trackEvent } from '../hooks/useUmami';
import git from '../assets/Contact/github.webp';
import linkedin from '../assets/Contact/img.icons8.com.webp';
import { useLanguage } from '../context/LanguageContext';
import '../Styles/Contact.css';

export default function Contact() {
    const { t } = useLanguage();
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText('contact@galleyhugo.com');
        }
        setCopied(true);
        trackEvent('contact-email-copy');
        setTimeout(() => setCopied(false), 2500);
    };

    return (
        <div className='contact-container'>
            <a 
                href="https://github.com/Hugo-Galley" 
                target="_blank" 
                rel="noreferrer" 
                onClick={() => trackEvent('contact-github-profile')}
            >
                <div className="Github">
                    <img src={git} alt="Logo Github" width="42" height="42" loading="lazy" decoding="async" />
                    <p>Hugo-Galley</p>
                </div>
            </a>

            <div 
                className={`email ${copied ? 'copied' : ''}`}
                onClick={handleCopyEmail}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCopyEmail(); }}
                title={t('contact.copyHint')}
                style={{ cursor: 'pointer' }}
            >
                <p>Email</p>
                <p>contact@galleyhugo.com</p>
                <span className="copy-badge">
                    {copied ? t('contact.copied') : t('contact.copyHint')}
                </span>
                <a 
                    href="mailto:contact@galleyhugo.com" 
                    className="mail-direct-link"
                    onClick={(e) => {
                        e.stopPropagation();
                        trackEvent('contact-email');
                    }}
                    title={t('contact.openMail')}
                >
                    {t('contact.openMail')}
                </a>
            </div>

            <a 
                href="https://www.linkedin.com/in/hugo-galley/" 
                target="_blank" 
                rel="noreferrer" 
                onClick={() => trackEvent('contact-linkedin')}
            >
                <div className="Linkedin">
                    <img src={linkedin} alt="logo Linkedin" width="42" height="42" loading="lazy" decoding="async" />
                    <p>Hugo Galley</p>
                </div>
            </a>
        </div>
    );
}
