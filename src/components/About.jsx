import portrait from '../assets/Bento/portrait.webp';
import epsi from '../assets/Bento/epsi.webp';
import cs from '../assets/Bento/cs.webp';
import dockerLogo from '../assets/Card/docker-icon-seeklogo.png';
import { useLanguage } from '../context/LanguageContext';

/* About: portrait, a short intro, three facts and what I do outside of code. Airy, no boxes. */
export default function About() {
  const { t } = useLanguage();

  const facts = [
    { label: t('bentoCards.studies'), title: 'EPSI Paris', text: t('bentoCards.studiesDesc'), logo: epsi, wide: true },
    { label: t('bentoCards.language'), title: 'C# & .NET', text: t('bentoCards.languageDesc'), logo: cs },
    { label: t('bentoCards.docker'), title: 'Docker', text: t('bentoCards.dockerDesc'), logo: dockerLogo },
  ];

  return (
    <div className="about container">
      <figure className="about-photo">
        <img src={portrait} alt="Hugo Galley" width="1000" height="1454" loading="lazy" decoding="async" />
      </figure>
      <div className="about-body">
        <p className="about-lead">{t('bentoCards.meDesc')}</p>
        <dl className="about-facts">
          {facts.map((f) => (
            <div key={f.title} className="about-fact">
              <dt>
                <span className={`about-logo${f.wide ? ' about-logo--wide' : ''}`} aria-hidden="true">
                  <img src={f.logo} alt="" loading="lazy" decoding="async" />
                </span>
                {f.label}
              </dt>
              <dd>
                <strong>{f.title}</strong>
                <span>{f.text}</span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="about-passions">
          <span>{t('bentoCards.passions')}</span>
          {t('bentoCards.passionsDesc')}
        </p>
      </div>
    </div>
  );
}
