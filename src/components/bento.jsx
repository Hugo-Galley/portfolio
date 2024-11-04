import '../Styles/Bento.css'
import me from '../assets/Bento/me.webp'
import epsi from '../assets/Bento/epsi.webp'
import cs from '../assets/Bento/cs.webp'
import react from '../assets/Bento/logo-react.webp'
import france from '../assets/Bento/france.webp'
import wallet from '../assets/Bento/Wallet.webp'


export default function Bento(){
    return(
        <div className="container-main">
            <div className="container-horizontale">
                <div className="container-verticale-long">
                    <p className="verticale-titre">Me</p>
                    <img src={me} alt="Me" />
                    <p className="verticale-desc">Passionate about computers from a young age and eager to improve.</p>
                </div>
                <div className="container-verticale-large">
                    <div className='text'>
                    <p className="verticale-titre">Study</p>
                    <p className="verticale-desc">Currently studying computer science at EPSI Paris.</p>
                    </div>
                    <img src={epsi} alt="Epsi Logo" />
                </div>
            </div>
            <div className="container-horizontale-2">
            <div className="container-verticale-small-1">
            <img src={cs}alt="C# logo" />
                <p className="verticale-titre">Language</p>
                <p className="verticale-desc">My favorite language is C#</p>

            </div>
            <div className="container-verticale-small-3">
                <p className="verticale-titre">FrameWork</p>
                <p className="verticale-desc">My Favorite FrameWork is React</p>
                <img src={react} alt="React Logo" />
            </div>
            </div>
            <div className="container-horizontale">
                <div className="container-verticale-horizontale-large">
                    <div className='text'>
                        <p className="verticale-titre">Passion</p>
                        <p className="verticale-desc">I’m passionate about sports, music, and travel.</p>
                    </div>
                    <img src={wallet} alt="Wallet Picture" />
                </div>
                <div className="container-verticale-small-2">
                    <p className="verticale-titre">Location</p>
                    <p className="verticale-desc">I live and Work in Paris in France</p>
                    <img src={france} alt="France Flag" />
                </div>
            </div>

        </div>
    )
}