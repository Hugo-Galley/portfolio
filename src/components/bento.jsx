import '../Styles/Bento.css';
import { useState, useEffect } from 'react';
import portrait from '../assets/Bento/portrait.webp';
import epsi from '../assets/Bento/epsi.webp';
import cs from '../assets/Bento/cs.webp';
import pythonLogo from '../assets/Pages/Python-logo-notext.svg.webp';
import wallet from '../assets/Bento/Wallet.webp';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../hooks/useUmami';
import ModalBento from './ModalBento';

export default function Bento() {
    const { t, language } = useLanguage();
    const [activeModalId, setActiveModalId] = useState(null);

    const blocks = [
        { id: 'modal1', title: t('bento.me.title'), text: t('bento.me.text') },
        { id: 'modal2', title: t('bento.studies.title'), text: t('bento.studies.text') },
        { id: 'modal3', title: t('bento.language.title'), text: t('bento.language.text') },
        { id: 'modal4', title: t('bento.python.title'), text: t('bento.python.text') },
        { id: 'modal5', title: t('bento.passion.title'), text: t('bento.passion.text') },
        { id: 'modal6', title: t('bento.location.title'), text: t('bento.location.text') },
    ];

    const showModal = (id) => {
        if (typeof window !== 'undefined' && window.innerWidth <= 768) return;
        trackEvent('bento-modal-open', { section: id });
        setActiveModalId(id);
    };
    const hideModal = () => setActiveModalId(null);

    const handleTileKeyDown = (e, id) => {
        if (typeof window !== 'undefined' && window.innerWidth <= 768) return;
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            showModal(id);
        }
    };

    useEffect(() => {
        if (!activeModalId) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') hideModal();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeModalId]);

    return (
        <section className="bento-section" aria-label={t('about.title')}>
            {activeModalId && (
                <div className="bento-modal-portal">
                    <div className='overlay' onClick={hideModal} aria-hidden="true"></div>
                    {blocks.map((block) => (
                        activeModalId === block.id && (
                            <div 
                                key={block.id} 
                                id={block.id} 
                                className='modal-shell' 
                                style={{ display: 'flex' }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ModalBento Title={block.title} text={block.text} hideModal={hideModal} />
                            </div>
                        )
                    ))}
                </div>
            )}

            <div className="bento-grid">
                {/* 1. Carte Profil / Portrait éditorial */}
                <div 
                    className="bento-card bento-card-me" 
                    role="button" 
                    tabIndex="0" 
                    onClick={() => showModal('modal1')} 
                    onKeyDown={(e) => handleTileKeyDown(e, 'modal1')}
                    aria-label={t('bentoCards.me')}
                >
                    <div className="bento-me-image-container">
                        <img 
                            src={portrait} 
                            alt="Hugo Galley - Portrait" 
                            className="bento-portrait-img" 
                            loading="eager" 
                            decoding="async" 
                        />
                        <div className="bento-portrait-gradient"></div>
                    </div>
                    <div className="bento-me-content">
                        <span className="bento-eyebrow">{language === 'fr' ? 'À propos' : 'About me'}</span>
                        <h3 className="bento-me-name">Hugo Galley</h3>
                        <p className="bento-desc">{t('bentoCards.meDesc')}</p>
                    </div>
                </div>

                {/* 2. Carte Formation / EPSI Paris (Grand format) */}
                <div 
                    className="bento-card bento-card-studies" 
                    role="button" 
                    tabIndex="0" 
                    onClick={() => showModal('modal2')} 
                    onKeyDown={(e) => handleTileKeyDown(e, 'modal2')}
                    aria-label={t('bentoCards.studies')}
                >
                    <div className="bento-studies-layout">
                        <div className="bento-epsi-frame">
                            <img src={epsi} alt="EPSI Paris" className="bento-epsi-img" loading="lazy" decoding="async" />
                        </div>
                        <div className="bento-studies-info">
                            <span className="bento-eyebrow">{t('bentoCards.studies')}</span>
                            <h3 className="bento-title">EPSI Paris</h3>
                            <p className="bento-desc">{t('bentoCards.studiesDesc')}</p>
                        </div>
                    </div>
                </div>

                {/* 3. Carte Langage (C# & .NET) */}
                <div 
                    className="bento-card bento-card-tech bento-card-cs" 
                    role="button" 
                    tabIndex="0" 
                    onClick={() => showModal('modal3')} 
                    onKeyDown={(e) => handleTileKeyDown(e, 'modal3')}
                    aria-label={t('bentoCards.language')}
                >
                    <div>
                        <div className="bento-tech-icon-wrap">
                            <img src={cs} alt="C#" className="bento-tech-icon" loading="lazy" decoding="async" />
                        </div>
                        <span className="bento-eyebrow">{t('bentoCards.language')}</span>
                        <h3 className="bento-title">C# & .NET</h3>
                    </div>
                    <p className="bento-desc">{t('bentoCards.languageDesc')}</p>
                </div>

                {/* 4. Carte Python (Remplace React) */}
                <div 
                    className="bento-card bento-card-tech bento-card-python" 
                    role="button" 
                    tabIndex="0" 
                    onClick={() => showModal('modal4')} 
                    onKeyDown={(e) => handleTileKeyDown(e, 'modal4')}
                    aria-label={t('bentoCards.python')}
                >
                    <div>
                        <div className="bento-tech-icon-wrap">
                            <img src={pythonLogo} alt="Python" className="bento-tech-icon" loading="lazy" decoding="async" />
                        </div>
                        <span className="bento-eyebrow">{t('bentoCards.python')}</span>
                        <h3 className="bento-title">Python</h3>
                    </div>
                    <p className="bento-desc">{t('bentoCards.pythonDesc')}</p>
                </div>

                {/* 5. Carte Passions (Design personnel avec Wallet.webp en vedette) */}
                <div 
                    className="bento-card bento-card-passions" 
                    role="button" 
                    tabIndex="0" 
                    onClick={() => showModal('modal5')} 
                    onKeyDown={(e) => handleTileKeyDown(e, 'modal5')}
                    aria-label={t('bentoCards.passions')}
                >
                    <div className="bento-passions-left">
                        <span className="bento-eyebrow">{t('bentoCards.passions')}</span>
                        <h3 className="bento-title">
                            {language === 'fr' ? 'En dehors du code' : 'Outside of code'}
                        </h3>
                        <p className="bento-desc">{t('bentoCards.passionsDesc')}</p>
                    </div>
                    <div className="bento-passions-right">
                        <img 
                            src={wallet} 
                            alt="Passions - Wallet of Passion" 
                            className="bento-wallet-artwork" 
                            loading="lazy" 
                            decoding="async" 
                        />
                    </div>
                </div>

                {/* 6. Carte Localisation (Paris & La Défense) */}
                <div 
                    className="bento-card bento-card-location" 
                    role="button" 
                    tabIndex="0" 
                    onClick={() => showModal('modal6')} 
                    onKeyDown={(e) => handleTileKeyDown(e, 'modal6')}
                    aria-label={t('bentoCards.location')}
                >
                    <div className="bento-location-top">
                        <span className="bento-eyebrow">{t('bentoCards.location')}</span>
                        <span className="bento-location-pin">📍</span>
                    </div>
                    <div className="bento-location-main">
                        <h3 className="bento-title">Paris & La Défense</h3>
                        <p className="bento-desc">{t('bentoCards.locationDesc')}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
