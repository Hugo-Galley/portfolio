import '../Styles/Footer.css'
import git from '../assets/Contact/github.webp'
import lin from '../assets/Contact/img.icons8.com.webp'
import { useLanguage } from '../context/LanguageContext'

export default function Footer(){
    const { t, language, toggleLanguage } = useLanguage();
    const date = new Date();
    const year = date.getFullYear();

    return(
        <div className="footer-main">
            <button 
                className="language-selector" 
                onClick={toggleLanguage}
                aria-label={`Switch to ${language === 'fr' ? 'English' : 'French'}`}
            >
                <span className={`flag-option ${language === 'fr' ? 'active' : ''}`}>
                    🇫🇷
                </span>
                <span className={`flag-option ${language === 'en' ? 'active' : ''}`}>
                    🇬🇧
                </span>
            </button>
            <div className="footer-left">
                <h2>{t('footer.info')}</h2>
                <p>{t('footer.copyright')} {year} </p>
                <p>contact@galleyhugo.com</p>
            </div>
            <div className="footer-right">
                <div className='div-media'>
                    <img src={git} alt="logo Github" width="30" height="30" loading="lazy" decoding="async" />
                    <a href='https://github.com/Hugo-Galley'>Github</a>
                </div>
                <div className='div-media'>
                    <img src={lin} alt="logo Linkedin" width="30" height="30" loading="lazy" decoding="async" />
                    <a href="https://www.linkedin.com/in/hugo-galley-a88198304/">Linkedin</a>
                </div>
            </div>
        </div>
    )
}
