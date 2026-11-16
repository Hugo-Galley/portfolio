import { trackEvent } from '../hooks/useUmami';
import '../Styles/Hero.css'
import FluidText from './FluidText';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
      const { t } = useLanguage();
  
  return (
    <div className='herroBanner'>
      <div className='herro'>
        <div className='herro-description'>
          <FluidText as="h1" className="hero-title">
            <span className="hero-greeting">{t('hero.hello')}</span><br/>
            <span className="gradient-text">
              {t('hero.iAm')}
            </span>
          </FluidText>
          
          <FluidText as="p" className="hero-subtitle">
            {t('hero.subtitle')}
          </FluidText>

          <div className='hero-actions'>
            <a className='btn btn--primary btn--lg hero-cv' href="https://cvdesignr.com/p/635c197aeaa16?hl=fr_FR" target='_blank' rel='noreferrer' onClick={() => trackEvent('cv-download')}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>
              {t('sections.cvLong')}
            </a>
          </div>
        </div>
      </div>
      <div className="hero-scroll-hint" aria-hidden="true"><span /></div>
    </div>
  );
}
