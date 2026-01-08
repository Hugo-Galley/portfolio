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
import azure from '../assets/Card/azure.webp'
import docker from '../assets/Card/docker-icon-seeklogo.png'
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
        figma,
        azure,
        docker

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
      "Figma",
      "Azure DevOps",
      "Docker"
    ]

    return (
        <div style={{ overflow: "hidden", width: "100%", whiteSpace: "nowrap", textAlign: 'center' }}>
          <Swiper
            spaceBetween={0} 
            loop={true} 
            slidesPerView={2}
            speed={5000} 
            autoplay={{
              delay: 0, 
              disableOnInteraction: false, 
            }}
            freeMode={true} 
            modules={[Autoplay]} 
            className="linear-swiper"
            breakpoints={{
              800: {
                  slidesPerView: 3,
              },
              1200: {
                  slidesPerView: 4,
              },
          }}
          >
            {skillsList.map((skill, index) => (
              <SwiperSlide
                key={index}
              >
                <div className="language-box">
                <img src={skill} alt={skillsListName[index]} className="language-box-img" />
                <p>{skillsListName[index]}</p>
                </div>
                
                
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      );
}