import '../Styles/Footer.css'
import git from '../assets/Contact/github.png'
import lin from '../assets/Contact/img.icons8.com.png'

export default function Footer(){
    return(
        <div className="footer-main">
            <div className="footer-left">
                <h1>Informations</h1>
                <p>©Copyright Galley Hugo 2024</p>
                <p>galleyhugo@icloud.com</p>
            </div>
            <div className="footer-right">

                <div className='div-media'>
                    <img src={git} alt="" />
                <a href='https://www.linkedin.com/in/hugo-galley-a88198304/'>Linkedin</a>
                </div>
                <div className='div-media'>
                    <img src={lin} alt="" />
                <a href="https://github.com/Hugo-Galley">Github</a>
                </div>
            </div>
        </div>
    )
}
