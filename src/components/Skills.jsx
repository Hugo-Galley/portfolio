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

    return (
        <div className="skills-track-wrapper" aria-label="Competences techniques">
          <div className="skills-track">
            {repeatedList.map((skill, index) => (
              <div className="language-box" key={`${skill.name}-${index}`}>
                <img src={skill.src} alt={skill.name} className="language-box-img" width="144" height="144" loading="lazy" decoding="async" />
                <p>{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      );
}
