import { trackEvent } from '../hooks/useUmami';
import git from '../assets/Contact/github.webp'
import linkedin from '../assets/Contact/img.icons8.com.webp'
import '../Styles/Contact.css'

export default function Contact() {
    return (
        <div className='contact-container'>
            <a href="https://github.com/Hugo-Galley" onClick={() => trackEvent('contact-github-profile')}>
                <div className="Github">
                    <img src={git} alt="Logo Github" width="42" height="42" loading="lazy" decoding="async" />
                    <p>Hugo-Galley</p>
                </div>
            </a>
            <a href="mailto:contact@galleyhugo.com" onClick={() => trackEvent('contact-email')}>
                <div className='email'>
                    <p>Email</p>
                    <p>contact@galleyhugo.com</p>
                </div>
            </a>
            <a href="https://www.linkedin.com/in/hugo-galley-a88198304/" onClick={() => trackEvent('contact-linkedin')}>
                <div className="Linkedin">
                    <img src={linkedin} alt="logo Linkedin" width="42" height="42" loading="lazy" decoding="async" />
                    <p>Hugo Galley</p>
                </div>
            </a>

        </div>
    )
}
