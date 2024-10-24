import git from '../assets/Contact/github.png'
import linkedin from '../assets/Contact/img.icons8.com.png'
import '../Styles/Contact.css'
export default function Contact(){
    return(
        <div className='contact-container'>
            <a href="https://github.com/Hugo-Galley">
            <div className="Github">
                <img src={git} alt="" />
                <p>Hugo-Galley</p>
            </div>   
            </a>         
            <a href="mailto:galleyhugo@icloud.com">
            <div className='email'>
                <p>Email</p>
                <p>galleyhugo@icloud.com</p>
            </div>
            </a>
            <a href="https://www.linkedin.com/in/hugo-galley-a88198304/">
            <div className="Linkedin">
                <img src={linkedin} alt="" />
                <p>Hugo Galley</p>
            </div>
            </a>

        </div>
    )
}