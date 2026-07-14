import { useState, useRef, useEffect } from 'react';
import py from '../assets/Pages/Python-logo-notext.svg.webp'
import cs from '../assets/Card/cs.webp'
import rct from '../assets/Pages/react.webp'
import web from '../assets/Card/HTML-CSS-JS-Logo.webp'
import sql from '../assets/Card/sql.webp'
import linux from '../assets/Card/linux.png'
import git from '../assets/Card/git.png'
import c from '../assets/Card/C_Logo.webp'
import figma from '../assets/Card/Figma-logo.svg.png'
import azure from '../assets/Card/azure.webp'
import docker from '../assets/Card/docker-icon-seeklogo.png'
import '../Styles/Skills.css'

function SkillCard({ skill }) {
    const [isHovered, setIsHovered] = useState(false);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateXValue = ((y - centerY) / centerY) * -15;
        const rotateYValue = ((x - centerX) / centerX) * 15;
        
        setRotateX(rotateXValue);
        setRotateY(rotateYValue);
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
        setIsHovered(false);
        setRotateX(0);
        setRotateY(0);
    };

    return (
        <div 
            ref={cardRef}
            className="language-box"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: isHovered 
                    ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.1, 1.1, 1.1) translateY(-10px)` 
                    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateY(0)',
                transition: isHovered ? 'transform 0.1s ease-out' : 'all 0.5s ease',
                zIndex: isHovered ? 10 : 1
            }}
        >
            <img src={skill.src} alt={skill.name} className="language-box-img" width="144" height="144" loading="lazy" decoding="async" />
            <p>{skill.name}</p>
            {isHovered && (
                <div 
                    className="glare" 
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: `radial-gradient(circle at ${50 + rotateY * 2}% ${50 - rotateX * 2}%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
                        pointerEvents: 'none',
                        borderRadius: 'inherit',
                        transform: 'translateZ(1px)'
                    }}
                />
            )}
        </div>
    );
}

export default function Skills(){
    const skillsList = [
      { src: py, name: 'Python' },
      { src: cs, name: 'C#' },
      { src: rct, name: 'React' },
      { src: web, name: 'HTML/CSS/JS' },
      { src: sql, name: 'SQL' },
      { src: linux, name: 'Linux' },
      { src: git, name: 'Git' },
      { src: c, name: 'C' },
      { src: figma, name: 'Figma' },
      { src: azure, name: 'Azure DevOps' },
      { src: docker, name: 'Docker' }
    ];

    const repeatedList = [...skillsList, ...skillsList];

    const [isHovered, setIsHovered] = useState(false);
    const progressRef = useRef(0);
    const speedRef = useRef(0.04);
    const trackRef = useRef(null);
    const rafRef = useRef(null);

    useEffect(() => {
        const updateAnimation = () => {
            // Target speed: 0 if hovered, otherwise 0.04 (approx 30s for 50%)
            const targetSpeed = isHovered ? 0 : 0.04;
            
            // Lerp the speed towards target speed for smooth deceleration/acceleration
            speedRef.current = speedRef.current + (targetSpeed - speedRef.current) * 0.05;
            
            progressRef.current += speedRef.current;
            
            if (progressRef.current >= 50) {
                progressRef.current -= 50;
            }
            
            if (trackRef.current) {
                trackRef.current.style.transform = `translateX(-${progressRef.current}%)`;
            }
            
            rafRef.current = requestAnimationFrame(updateAnimation);
        };
        
        rafRef.current = requestAnimationFrame(updateAnimation);
        return () => cancelAnimationFrame(rafRef.current);
    }, [isHovered]);

    return (
        <div 
            className="skills-track-wrapper" 
            aria-label="Competences techniques"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
          <div className="skills-track" ref={trackRef}>
            {repeatedList.map((skill, index) => (
              <SkillCard skill={skill} key={`${skill.name}-${index}`} />
            ))}
          </div>
        </div>
      );
}
