import imgtest from '../assets/Card/SyncCRD2CRM.png';
import net from '../assets/Pages/NET_Core_Logo.svg.webp';
import blazor from '../assets/Pages/Blazor.webp';
import ssms from '../assets/Card/sql.png';
import '../Styles/PagesProjects.css';
import { useLanguage } from '../context/LanguageContext';

export default function SyncCRD2CRM() {
    const { t } = useLanguage();
    
    return (
        <div className='project-container'>
            <div className='project-card'>
                <img src={imgtest} alt="Aperçu de l'application" className='project-image' />
                <div className='project-info'>
                    <h2 className='project-title'>{t('projectPages.syncCrd2Crm.title')}</h2>
                    <p className='project-description'>
                        {t('projectPages.syncCrd2Crm.description')}
                    </p>
                    <div className='tech-stack'>
                        <div className='tech-item'>
                            <img src={net} alt="NET" />
                            <p>.NET</p>
                        </div>
                        <div className='tech-item'>
                            <img src={blazor} alt="Blazor" />
                            <p>Blazor</p>
                        </div>
                        <div className='tech-item'>
                            <img src={ssms} alt="SQL Server" />
                            <p>SQL Server</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
