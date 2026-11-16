import axa from '../assets/Card/AXA_Logo.webp';
import unif from '../assets/Card/unif.webp';
import { useLanguage } from '../context/LanguageContext';

/* Experience: a plain editorial list, like a printed CV */
export default function Experience() {
  const { t } = useLanguage();

  const items = [
    {
      logo: axa,
      company: 'AXA France',
      role: t('work.softwareEngineerIntern'),
      period: t('work.currently'),
      desc: t('work.axaDesc'),
    },
    {
      logo: unif,
      company: 'Uniformation',
      role: t('work.devEngineerIntern'),
      period: `2 ${t('work.stages')}`,
      desc: t('work.unifDesc'),
    },
  ];

  return (
    <div className="xp container">
      {items.map((it) => (
        <article key={it.company} className="xp-row">
          <div className="xp-side">
            <img src={it.logo} alt="" className="xp-logo" width="40" height="40" loading="lazy" decoding="async" />
            <div>
              <p className="xp-company">{it.company}</p>
              <p className="xp-period">{it.period}</p>
            </div>
          </div>
          <div>
            <h3 className="xp-role">{it.role}</h3>
            <p className="xp-desc">{it.desc}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
