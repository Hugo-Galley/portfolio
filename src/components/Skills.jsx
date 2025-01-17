import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from 'swiper/modules';
import py from '../assets/Pages/Python-logo-notext.svg.webp'
import cs from '../assets/Card/cs.webp'
import rct from '../assets/Pages/react.webp'
import web from '../assets/Card/HTML-CSS-JS-Logo.png'
import sql from '../assets/Card/sql.png'
import linux from '../assets/Card/linux.png'
import git from '../assets/Card/git.png'
import c from '../assets/Card/C_Logo.png'
import figma from '../assets/Card/Figma-logo.svg.png'
import 'swiper/css'
import '../Styles/Skills.css'

export default function Skills(){

    const skillsList = [
        py,
        cs,
        rct,
        web,
        sql,
        linux,
        git,
        c,
        figma

    ]
    const skillsListName = [
      "Python",
      "C#",
      "React",
      "HTML/CSS/JS",
      "SQL",
      "Linux",
      "Git",
      "C",
      "Figma"
    ]

    return (
        <div style={{ overflow: "hidden", width: "100%", whiteSpace: "nowrap", textAlign: 'center' }}>
          <Swiper
            spaceBetween={0} 
            slidesPerView={4} 
            loop={true} 
            speed={5000} 
            autoplay={{
              delay: 0, 
              disableOnInteraction: true, 
            }}
            freeMode={true} 
            modules={[Autoplay]} 
            className="linear-swiper"
          >
            {skillsList.map((skill, index) => (
              <SwiperSlide
                key={index}
              >
                <div className="language-box">
                <img src={skill} alt="Language" className="language-box-img" />
                <p>{skillsListName[index]}</p>
                </div>
                
                
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      );
}