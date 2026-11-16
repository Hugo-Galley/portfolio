import shot from '../assets/Projects/sync-crd-crm.webp';
import net from '../assets/Pages/NET_Core_Logo.svg.webp';
import blazor from '../assets/Pages/Blazor.webp';
import ssms from '../assets/Card/sql.png';
import ProjectLayout from '../components/ProjectLayout';
import { useLanguage } from '../context/LanguageContext';

const TECHS = [
  { src: net, name: '.NET' },
  { src: blazor, name: 'Blazor' },
  { src: ssms, name: 'SQL Server' },
];

export default function SyncCRD2CRM() {
  const { t } = useLanguage();
  return (
    <ProjectLayout
      slug="sync-crd-crm"
      title={t('projectPages.syncCrd2Crm.title')}
      description={t('projectPages.syncCrd2Crm.description')}
      image={shot}
      imageAlt="Aperçu de SyncCRD2CRM"
      techs={TECHS}
    />
  );
}
