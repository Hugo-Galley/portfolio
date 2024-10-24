import '../Styles/Bento.css'
import me from '../assets/Bento/me.png'
import epsi from '../assets/Bento/epsi.png'
import cs from '../assets/Bento/cs.png'
import react from '../assets/Bento/logo-react.svg'
import france from '../assets/Bento/france.png'
import wallet from '../assets/Bento/Wallet.png'


export default function Bento(){
    return(
        <div className="container-main">
            <div className="container-horizontale">
                <div className="container-verticale-long">
                    <p className="verticale-titre">Me</p>
                    <img src={me} alt="" />
                    <p className="verticale-desc">Passionate about computers from a young age and eager to improve.</p>
                </div>
                <div className="container-verticale-large">
                    <div className='text'>
                    <p className="verticale-titre">Study</p>
                    <p className="verticale-desc">Currently studying computer science at EPSI Paris.</p>
                    </div>
                    <img src={epsi} alt="" />
                </div>
            </div>
            <div className="container-horizontale-2">
            <div className="container-verticale-small-1">
            <img src={cs}alt="" />
                <p className="verticale-titre">Language</p>
                <p className="verticale-desc">My favorite language is C#</p>

            </div>
            <div className="container-verticale-small-3">
                <p className="verticale-titre">FrameWork</p>
                <p className="verticale-desc">My Favorite FrameWork is React</p>
                <img src={react} alt="" />
            </div>
            </div>
            <div className="container-horizontale">
                <div className="container-verticale-horizontale-large">
                    <div className='text'>
                        <p className="verticale-titre">Passion</p>
                        <p className="verticale-desc">I’m passionate about sports, music, and travel.</p>
                    </div>
                    <img src={wallet} alt="" />
                </div>
                <div className="container-verticale-small-2">
                    <p className="verticale-titre">Location</p>
                    <p className="verticale-desc">I live and Work in Paris in France</p>
                    <img src={france} alt="" />
                </div>
            </div>

        </div>
    )
}