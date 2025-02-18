import imgtest from '../assets/Card/SyncCRD2CRM.png';
import net from '../assets/Pages/NET_Core_Logo.svg.webp';
import blazor from '../assets/Pages/Blazor.webp';
import ssms from '../assets/Card/sql.png';
import '../Styles/PagesProjects.css';

export default function SyncCRD2CRM() {
    return (
        <div className='project-container'>
            <div className='project-card'>
                <img src={imgtest} alt="Aperçu de l'application" className='project-image' />
                <div className='project-info'>
                    <h2 className='project-title'>SyncCRD2CRM</h2>
                    <p className='project-description'>
                        Il s'agit d'un service de synchronisation entre les outils internes de l'entreprise (CRD) et le CRM Dynamics 365 de Microsoft. Le service est accompagné d'une IHM pour faire le mapping entre les deux, ainsi que d'un batch de rattrapage pour remettre d'équerre les données entre CRD et CRM.
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
                            <img src={ssms} alt="SSMS" />
                            <p>SSMS</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
