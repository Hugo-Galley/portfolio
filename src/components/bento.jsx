import '../Styles/Bento.css'
import React, {useRef} from 'react'
import me from '../assets/Bento/me.png'
import epsi from '../assets/Bento/epsi.webp'
import cs from '../assets/Bento/cs.webp'
import react from '../assets/Pages/react.webp'
import france from '../assets/Bento/france.webp'
import wallet from '../assets/Bento/Wallet.webp'
import { useLanguage } from '../context/LanguageContext'

import ModalBento from './ModalBento'


export default function Bento(){
    const { t } = useLanguage();
    const overlayRef = useRef(null);
    const modalRefs = useRef({});
    const blocks = [
        { id: 'modal1', title: t('bento.me.title'), text: t('bento.me.text') },
        { id: 'modal2', title: t('bento.studies.title'), text: t('bento.studies.text') },
        { id: 'modal3', title: t('bento.language.title'), text: t('bento.language.text') },
        { id: 'modal4', title: t('bento.framework.title'), text: t('bento.framework.text') },
        { id: 'modal5', title: t('bento.passion.title'), text: t('bento.passion.text') },
        { id: 'modal6', title: t('bento.location.title'), text: t('bento.location.text') },
    ];
    
    function showModal(idModal) {
        overlayRef.current.style.display = 'block';
        modalRefs.current[idModal].style.display = 'flex';
    }
    function hideModal() {
        overlayRef.current.style.display = 'none';
        Object.values(modalRefs.current).forEach(modal => {
            modal.style.display = 'none';
        });
    }

    return(
        <div>
            <div>
            <div id='overlay' ref={overlayRef} className='overlay' onClick={hideModal}></div>
                {blocks.map(block => (
                    <div
                        key={block.id}
                        id={block.id}
                        ref={el => (modalRefs.current[block.id] = el)}
                        className='ModalBox'
                        style={{ display: 'none' }}
                    >
                         <ModalBento Title={block.title} text={block.text} hideModal={hideModal} />
                    </div>
                ))}
            </div>

            <div className='About-Responsive'>
                <img src={me} alt="Me" />
                <div className='About-text'>
                    <div className='About-WhoAmi'>
                        <h2>{t('about.whoAmI')}</h2>
                        <p>{t('about.whoAmIText')}</p>
                    </div>
                    <div className='About-Passions'>
                        <h2>{t('about.passions')}</h2>
                        <div>
                            <div>
                                <h4>{t('about.sport')}</h4>
                                <p>{t('about.sportText')}</p>
                            </div>
                            <div>
                                <h4>{t('about.travel')}</h4>
                                <p>{t('about.travelText')}</p>
                            </div>
                            <div>
                                <h4>{t('about.music')}</h4>
                                <p>{t('about.musicText')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <div className="container-main">
            <div className="container-horizontale">
                <div className="container-verticale-long" onClick={() => showModal('modal1')}>
                    <p className="verticale-titre">{t('bentoCards.me')}</p>
                    <img src={me} alt="Me" />
                    <p className="verticale-desc">{t('bentoCards.meDesc')}</p>
                </div>
                <div className="container-verticale-large" onClick={() => showModal('modal2')}>
                    <div className='text'>
                    <p className="verticale-titre">{t('bentoCards.studies')}</p>
                    <p className="verticale-desc">{t('bentoCards.studiesDesc')}</p>
                    </div>
                    <img src={epsi} alt="Epsi Logo" />
                </div>
            </div>
            <div className="container-horizontale-2">
            <div className="container-verticale-small-1" onClick={() => showModal('modal3')}>
            <img src={cs}alt="C# logo" />
                <p className="verticale-titre">{t('bentoCards.language')}</p>
                <p className="verticale-desc">{t('bentoCards.languageDesc')}</p>

            </div>
            <div className="container-verticale-small-3" onClick={() => showModal('modal4')}>
                <p className="verticale-titre">{t('bentoCards.framework')}</p>
                <p className="verticale-desc">{t('bentoCards.frameworkDesc')}</p>
                <img src={react} alt="React Logo" id="reactLogo"/>
            </div>
            </div>
            <div className="container-horizontale">
                <div className="container-verticale-horizontale-large" onClick={() => showModal('modal5')}>
                    <div className='text'>
                        <p className="verticale-titre">{t('bentoCards.passions')}</p>
                        <p className="verticale-desc">{t('bentoCards.passionsDesc')}</p>
                    </div>
                    <img src={wallet} alt="Wallet" />
                </div>
                <div className="container-verticale-small-2" onClick={() => showModal('modal6')}>
                    <p className="verticale-titre">{t('bentoCards.location')}</p>
                    <p className="verticale-desc">{t('bentoCards.locationDesc')}</p>
                    <img src={france} alt="France Flag" />
                </div>
            </div>

        </div>
        </div>

    )
}
