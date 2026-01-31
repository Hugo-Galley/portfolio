import '../Styles/Footer.css'
import git from '../assets/Contact/github.webp'
import lin from '../assets/Contact/img.icons8.com.webp'
import { useLanguage } from '../context/LanguageContext'

export default function Footer(){
    const { t } = useLanguage();
    const date = new Date();
    const year = date.getFullYear();
    return(
        <div className="footer-main">
            <div className="footer-left">
                <h1>{t('footer.info')}</h1>
                <p>{t('footer.copyright')} {year} </p>
                <p>contact@galleyhugo.com</p>
            </div>
            <div className="footer-right">

                <div className='div-media'>
                    <img src={git} alt="logo Github" />
                <a href='https://github.com/Hugo-Galley'>Github</a>
                </div>
                <div className='div-media'>
                    <img src={lin} alt="logo Linkedin" />
                <a href="https://www.linkedin.com/in/hugo-galley-a88198304/">Linkedin</a>
                
                </div>
            </div>
        </div>
    )
}
