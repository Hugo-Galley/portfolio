import '../Styles/Bento.css'
import React, {useRef} from 'react'
import me from '../assets/Bento/me.png'
import epsi from '../assets/Bento/epsi.webp'
import cs from '../assets/Bento/cs.webp'
import react from '../assets/Pages/react.webp'
import france from '../assets/Bento/france.webp'
import wallet from '../assets/Bento/Wallet.webp'

import ModalBento from './ModalBento'


export default function Bento(){
    const overlayRef = useRef(null);
    const modalRefs = useRef({});
    const blocks = [
        { id: 'modal1', title: 'Moi : Hugo', text: "Je suis Galley Hugo, un étudiant en informatique avec une forte envie d'apprendre. J'aime développer des projets informatiques et acquérir de nouvelles compétences." },
        { id: 'modal2', title: 'Mes études', text: "J'ai obtenu mon baccalauréat avec une spécialisation en Math/NSI en 2023 avec la mention 'assez bien.' Actuellement, j'étudie l'informatique à l'EPSI Paris et j'aspire à obtenir un master pour devenir ingénieur logiciel." },
        { id: 'modal3', title: 'Langage', text: 'Mon langage préféré est le C#, car, lorsqu’il est combiné avec .NET, il permet de réaliser une grande variété de projets allant des batchs aux API, en passant par les applications web.' },
        { id: 'modal4', title: 'Framework', text: "Mon framework préféré est React, car j'aime beaucoup JavaScript, et il permet de créer des applications web extrêmement puissantes. De plus, il est open source et permet désormais le développement d'applications mobiles également." },
        { id: 'modal5', title: 'Passion', text: "Mes passions dans la vie sont les voyages, car j'adore bouger et découvrir le monde. La musique, j'ai joué du violon pendant plus de 13 ans, ce qui a développé mon goût pour la musique. Et le sport, je pratique la course à pied et j'ai réalisé plusieurs triathlons, ce qui me passionne vraiment." },
        { id: 'modal6', title: 'Localisation', text: "Je vis en France, plus précisément à Paris, et j'étudie à La Défense, l'un des plus grands quartiers d'affaires du monde, ce qui offre un excellent environnement d'apprentissage." },
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
                        <h2>Qui suis-je ?</h2>
                        <p>Je suis un jeune développeur passionné étudiant à l'EPSI, basé à Paris.</p>
                    </div>
                    <div className='About-Passions'>
                        <h2>Mes Passions</h2>
                        <div>
                            <div>
                                <h4>Sport</h4>
                                <p>Je pratique la course à pied et j'ai réalisé plusieurs triathlons, ce qui me passionne vraiment.</p>
                            </div>
                            <div>
                                <h4>Voyages</h4>
                                <p>J'aime les voyages, car j'adore bouger et découvrir le monde.</p>
                            </div>
                            <div>
                                <h4>Musiques</h4>
                                <p>J'ai joué du violon pendant plus de 13 ans, ce qui a développé mon goût pour la musique.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <div className="container-main">
            <div className="container-horizontale">
                <div className="container-verticale-long" onClick={() => showModal('modal1')}>
                    <p className="verticale-titre">Moi</p>
                    <img src={me} alt="Me" />
                    <p className="verticale-desc">Passionné par l'informatique depuis mon plus jeune âge et désireux de m'améliorer</p>
                </div>
                <div className="container-verticale-large" onClick={() => showModal('modal2')}>
                    <div className='text'>
                    <p className="verticale-titre">Etudes</p>
                    <p className="verticale-desc">Actuellement étudiant en informatique à l'EPSI Paris</p>
                    </div>
                    <img src={epsi} alt="Epsi Logo" />
                </div>
            </div>
            <div className="container-horizontale-2">
            <div className="container-verticale-small-1" onClick={() => showModal('modal3')}>
            <img src={cs}alt="C# logo" />
                <p className="verticale-titre">Langage</p>
                <p className="verticale-desc">Mon langage favoris est le C#</p>

            </div>
            <div className="container-verticale-small-3" onClick={() => showModal('modal4')}>
                <p className="verticale-titre">FrameWork</p>
                <p className="verticale-desc">Mon Framework favoris est React</p>
                <img src={react} alt="React Logo" id="reactLogo"/>
            </div>
            </div>
            <div className="container-horizontale">
                <div className="container-verticale-horizontale-large" onClick={() => showModal('modal5')}>
                    <div className='text'>
                        <p className="verticale-titre">Passions</p>
                        <p className="verticale-desc">Je suis passioné de sport, de musique et de voyages</p>
                    </div>
                    <img src={wallet} alt="Wallet" />
                </div>
                <div className="container-verticale-small-2" onClick={() => showModal('modal6')}>
                    <p className="verticale-titre">Localisation</p>
                    <p className="verticale-desc">Je vis à Paris et travail en France</p>
                    <img src={france} alt="France Flag" />
                </div>
            </div>

        </div>
        </div>

    )
}