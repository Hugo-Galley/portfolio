import '../Styles/Herro.css'
import DownLoadButton from './DownloadButton';
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
      <div className='herro'>
        <div className='herro-description'>
          <h1 className="hero-title">
            {t('hero.hello')}<br/>
            <span 
              className="gradient-text">
              {t('hero.iAm')}
            </span>
          </h1>
          
          <p 
            className="hero-subtitle">
            {t('hero.subtitle')}
          </p>

          <div 
            className='button-div'>
            <button type='button' id='herro-button1' onClick={() => handleNavigation('AboutMe')}>{t('hero.aboutButton')}</button>
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
