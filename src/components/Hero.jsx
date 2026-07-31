import '../Styles/Hero.css'
import DownLoadButton from './DownloadButton';
import OrganicMesh from './OrganicMesh';
import FluidText from './FluidText';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
      const navigate = useNavigate();
      const { t } = useLanguage();
  
      const handleNavigation = (section) => {
          navigate('/', { state: { scrollTo: section } });
      };
  

  return (
    <div className='herroBanner'>
      <OrganicMesh />
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

          <div className='button-div'>
            <button type='button' id='herro-button1' onClick={() => handleNavigation('AboutMe')}>
              <span>{t('hero.aboutButton')}</span>
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
            <button type='button' id='herro-button2' onClick={() => handleNavigation('Projects')}>{t('hero.workButton')}</button>
          </div>
          
          <a id='DownloadButton' href="https://cvdesignr.com/p/635c197aeaa16?hl=fr_FR" target='_blank' rel='noreferrer'>
            <DownLoadButton/>
          </a>
        </div>
        <div className="radial-glow" />
      </div>
    </div>
  );
}
