import '../Styles/Herro.css'
import { motion, useScroll, useTransform } from 'framer-motion';
import DownLoadButton from './DownloadButton';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Herro() {
      const navigate = useNavigate();
  
      const handleNavigation = (section) => {
          navigate('/');
          
          setTimeout(() => {
              const element = document.getElementById(section);
              if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
              }
          }, 100);
      };
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const threshold = isMobile ? 200 : 300; 
  
  const opacity = useTransform(
    scrollY, 
    [0, threshold], 
    [1, 0]
  );
  
  const y = useTransform(
    scrollY, 
    [0, threshold], 
    [0, 50]  
  );

  const scale = useTransform(
    scrollY,
    [0, threshold],
    [1, 0.85]
  )
  
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        delay: custom * 0.2 
      }
    })
  };

  return (
    <div className='herroBanner'>
      <div className='herro'>
        <motion.div 
          className='herro-description'
          style={{ 
            opacity, 
            y,
            scale,
            transformOrigin: 'center top',
            pointerEvents: scrollY.get() > threshold ? 'none' : 'auto'
          }}
        >
          <motion.h1 
            className="hero-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0} 
            variants={textVariants}
          >
            Hello,<br/>
            <motion.span 
              className="gradient-text"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1} 
              variants={textVariants}
            >
              Je suis Hugo Galley
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2} 
            variants={textVariants}
          >
            Je suis un jeune développeur actuellement en recherche d'une alternance. 
          </motion.p>

          <motion.div 
            className='button-div'
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3} 
            variants={textVariants}
          >
            <a id='herro-button1' onClick={() => handleNavigation('AboutMe')} style={{ cursor: 'pointer' }}>A Propos</a>
            <a id='herro-button2' onClick={() => handleNavigation('Projects')} style={{ cursor: 'pointer' }}>Mon Travail</a>
          </motion.div>
          
          <motion.a 
             id='DownloadButton' 
             href="https://cvdesignr.com/p/635c197aeaa16?hl=fr_FR" 
             target='_blank'
             initial="hidden"
             
             whileInView="visible"
             viewport={{ once: true }}
             custom={4} 
             variants={textVariants}
           >
            <DownLoadButton/>
          </motion.a>
        </motion.div>
        <div class="radial-glow"/>

      </div>
    </div>
  );
}
