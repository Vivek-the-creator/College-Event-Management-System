import { OperationalPage } from '@/components/marketplace/operational-page';

export default function AdminCmsPage() {
  return <OperationalPage title="CMS" description="Manage footer, about, FAQ, terms, privacy, and home content sections." actions={['Edit About', 'Edit FAQ', 'Publish CMS']} rows={['About · Published', 'FAQ · Draft changes', 'Terms · Published', 'Privacy · Published']} />;
}
