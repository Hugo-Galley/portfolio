import '../Styles/Bento.css'
import { useState } from 'react'
import me from '../assets/Bento/me.webp'
import epsi from '../assets/Bento/epsi.webp'
import cs from '../assets/Bento/cs.webp'
import react from '../assets/Pages/react.webp'
import france from '../assets/Bento/france.webp'
import wallet from '../assets/Bento/Wallet.webp'
import { useLanguage } from '../context/LanguageContext'

import ModalBento from './ModalBento'

export default function Bento() {
    const { t } = useLanguage();
    const [activeModalId, setActiveModalId] = useState(null);
    const blocks = [
        { id: 'modal1', title: t('bento.me.title'), text: t('bento.me.text') },
        { id: 'modal2', title: t('bento.studies.title'), text: t('bento.studies.text') },
        { id: 'modal3', title: t('bento.language.title'), text: t('bento.language.text') },
        { id: 'modal4', title: t('bento.framework.title'), text: t('bento.framework.text') },
        { id: 'modal5', title: t('bento.passion.title'), text: t('bento.passion.text') },
        { id: 'modal6', title: t('bento.location.title'), text: t('bento.location.text') },
    ];

    const showModal = (id) => setActiveModalId(id);
    const hideModal = () => setActiveModalId(null);

    const handleTileKeyDown = (e, id) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            showModal(id);
        }
    };

    return (
        <div>
            {activeModalId && (
                <div>
                    <div className='overlay' onClick={hideModal}></div>
                    {blocks.map((block) => (
                        activeModalId === block.id && (
                            <div key={block.id} id={block.id} className='modal-shell' style={{ display: 'flex' }}>
                                <ModalBento Title={block.title} text={block.text} hideModal={hideModal} />
                            </div>
                        )
                    ))}
                </div>
            )}

            <div className='About-Responsive'>
                <img src={me} alt="Hugo Galley - Développeur" loading="eager" decoding="async" fetchPriority="high" />
                <div className='About-text'>
                    <div className='About-WhoAmi'>
                        <h2>{t('about.whoAmI')}</h2>
                        <p>{t('about.whoAmIText')}</p>
                    </div>
                    <div className='About-Passions'>
                        <h2>{t('about.passions')}</h2>
                        <div>
                            <div>
                                <h3>{t('about.sport')}</h3>
                                <p>{t('about.sportText')}</p>
                            </div>
                            <div>
                                <h3>{t('about.travel')}</h3>
                                <p>{t('about.travelText')}</p>
                            </div>
                            <div>
                                <h3>{t('about.music')}</h3>
                                <p>{t('about.musicText')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-main">
                <div className="container-horizontale">
                    <div className="container-verticale-long" role="button" tabIndex="0" onClick={() => showModal('modal1')} onKeyDown={(e) => handleTileKeyDown(e, 'modal1')}>
                        <p className="verticale-titre">{t('bentoCards.me')}</p>
                        <img src={me} alt="Hugo Galley - Portrait" loading="lazy" decoding="async" />
                        <p className="verticale-desc">{t('bentoCards.meDesc')}</p>
                    </div>
                    <div className="container-verticale-large" role="button" tabIndex="0" onClick={() => showModal('modal2')} onKeyDown={(e) => handleTileKeyDown(e, 'modal2')}>
                        <div className='text'>
                            <p className="verticale-titre">{t('bentoCards.studies')}</p>
                            <p className="verticale-desc">{t('bentoCards.studiesDesc')}</p>
                        </div>
                        <img src={epsi} alt="EPSI Paris - École d'informatique" loading="lazy" decoding="async" />
                    </div>
                </div>
                <div className="container-horizontale-2">
                    <div className="container-verticale-small-1" role="button" tabIndex="0" onClick={() => showModal('modal3')} onKeyDown={(e) => handleTileKeyDown(e, 'modal3')}>
                        <img src={cs} alt="C# - Langage de programmation" loading="lazy" decoding="async" />
                        <p className="verticale-titre">{t('bentoCards.language')}</p>
                        <p className="verticale-desc">{t('bentoCards.languageDesc')}</p>

                    </div>
                    <div className="container-verticale-small-3" role="button" tabIndex="0" onClick={() => showModal('modal4')} onKeyDown={(e) => handleTileKeyDown(e, 'modal4')}>
                        <p className="verticale-titre">{t('bentoCards.framework')}</p>
                        <p className="verticale-desc">{t('bentoCards.frameworkDesc')}</p>
                        <img src={react} alt="React - Framework JavaScript" id="reactLogo" loading="lazy" decoding="async" />
                    </div>
                </div>
                <div className="container-horizontale">
                    <div className="container-verticale-horizontale-large" role="button" tabIndex="0" onClick={() => showModal('modal5')} onKeyDown={(e) => handleTileKeyDown(e, 'modal5')}>
                        <div className='text'>
                            <p className="verticale-titre">{t('bentoCards.passions')}</p>
                            <p className="verticale-desc">{t('bentoCards.passionsDesc')}</p>
                        </div>
                        <img src={wallet} alt="Passions - Sport, Musique, Voyages" loading="lazy" decoding="async" />
                    </div>
                    <div className="container-verticale-small-2" role="button" tabIndex="0" onClick={() => showModal('modal6')} onKeyDown={(e) => handleTileKeyDown(e, 'modal6')}>
                        <p className="verticale-titre">{t('bentoCards.location')}</p>
                        <p className="verticale-desc">{t('bentoCards.locationDesc')}</p>
                        <img src={france} alt="France - Paris, La Défense" loading="lazy" decoding="async" />
                    </div>
                </div>

            </div>
        </div>

    )
}
