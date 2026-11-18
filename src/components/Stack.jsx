import { useEffect, useRef, useState } from 'react';
import py from '../assets/Pages/Python-logo-notext.svg.webp';
import cs from '../assets/Card/cs.webp';
import rct from '../assets/Pages/react.webp';
import web from '../assets/Card/HTML-CSS-JS-Logo.webp';
import sql from '../assets/Card/sql.webp';
import linux from '../assets/Card/linux.png';
import git from '../assets/Card/git.png';
import azure from '../assets/Card/azure.webp';
import docker from '../assets/Card/docker-icon-seeklogo.png';

const ROW_A = [
  { src: cs, name: 'C# / .NET' },
  { src: py, name: 'Python' },
  { src: rct, name: 'React' },
  { src: web, name: 'HTML · CSS · JS' },
  { src: sql, name: 'SQL' }
];
const ROW_B = [
  { src: docker, name: 'Docker' },
  { src: azure, name: 'Azure DevOps' },
  { src: git, name: 'Git' },
  { src: linux, name: 'Linux' },
];

function Row({ items, reverse }) {
  const list = [...items, ...items, ...items];
  return (
    <div className={`stack-row${reverse ? ' stack-row--reverse' : ''}`}>
      <ul className="stack-track">
        {list.map((s, i) => (
          <li key={`${s.name}-${i}`} className="stack-chip" aria-hidden={i >= items.length}>
            <img src={s.src} alt="" width="40" height="40" loading="lazy" decoding="async" className={s.name === 'Linux' ? 'is-linux' : ''} />
            {s.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Two marquee rows of tool chips, moving in opposite directions */
export default function Stack() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div id="MySkills" ref={ref} className={`stack${visible ? '' : ' is-paused'}`} aria-label="Stack technique">
      <Row items={ROW_A} />
      <Row items={ROW_B} reverse />
    </div>
  );
}
