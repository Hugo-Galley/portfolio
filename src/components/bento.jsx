import '../Styles/Bento.css'
import React, {useRef} from 'react'
import me from '../assets/Bento/me.webp'
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
        { id: 'modal1', title: 'Me : Hugo', text: 'I am Galley Hugo, a computer science student with a strong desire to learn. I enjoy developing IT projects and acquiring new skills.' },
        { id: 'modal2', title: 'My Study', text: "I obtained my Baccalaureate with a specialization in Math/NSI in 2023 with the mention 'quite good.' Currently, I am studying computer science at EPSI Paris, and I aspire to obtain a master's degree and become a software engineer." },
        { id: 'modal3', title: 'Language', text: 'My favorite language is C# because, when combined with .NET, it allows for a wide variety of projects ranging from batch to API, including web applications.' },
        { id: 'modal4', title: 'Framework', text: 'My favorite framework is React because I really like JavaScript, and it allows for the creation of extremely powerful web applications. Additionally, it is open-source and now enables the development of mobile applications as well.' },
        { id: 'modal5', title: 'Passion', text: 'My passions in life are travel, as I love moving around and discovering the world. Music, I have played the violin for over 13 years, which has developed my taste for music. And sports, I practice running and have completed several triathlons, as it truly fascinates me.' },
        { id: 'modal6', title: 'Location', text: 'I live in France, more specifically in Paris, and I study in La Défense, one of the largest business districts in the world, which provides a great learning environment.' },
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
                <p className='textABouteMe'>I am a young, passionate developer studying at EPSI, based in Paris. My passions include sports, travel, music, and many other things.</p>
            </div>
        <div className="container-main">
            <div className="container-horizontale">
                <div className="container-verticale-long" onClick={() => showModal('modal1')}>
                    <p className="verticale-titre">Me</p>
                    <img src={me} alt="Me" />
                    <p className="verticale-desc">Passionate about computers from a young age and eager to improve.</p>
                </div>
                <div className="container-verticale-large" onClick={() => showModal('modal2')}>
                    <div className='text'>
                    <p className="verticale-titre">Study</p>
                    <p className="verticale-desc">Currently studying computer science at EPSI Paris.</p>
                    </div>
                    <img src={epsi} alt="Epsi Logo" />
                </div>
            </div>
            <div className="container-horizontale-2">
            <div className="container-verticale-small-1" onClick={() => showModal('modal3')}>
            <img src={cs}alt="C# logo" />
                <p className="verticale-titre">Language</p>
                <p className="verticale-desc">My favorite language is C#</p>

            </div>
            <div className="container-verticale-small-3" onClick={() => showModal('modal4')}>
                <p className="verticale-titre">FrameWork</p>
                <p className="verticale-desc">My Favorite FrameWork is React</p>
                <img src={react} alt="React Logo" />
            </div>
            </div>
            <div className="container-horizontale">
                <div className="container-verticale-horizontale-large" onClick={() => showModal('modal5')}>
                    <div className='text'>
                        <p className="verticale-titre">Passion</p>
                        <p className="verticale-desc">I’m passionate about sports, music, and travel.</p>
                    </div>
                    <img src={wallet} alt="Wallet" />
                </div>
                <div className="container-verticale-small-2" onClick={() => showModal('modal6')}>
                    <p className="verticale-titre">Location</p>
                    <p className="verticale-desc">I live and Work in Paris in France</p>
                    <img src={france} alt="France Flag" />
                </div>
            </div>

        </div>
        </div>

    )
}