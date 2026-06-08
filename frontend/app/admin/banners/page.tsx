import { OperationalPage } from '@/components/marketplace/operational-page';

export default function AdminBannersPage() {
  return <OperationalPage title="Banners" description="Manage home hero, campaign placements, category banners, and scheduled promotional media." actions={['Add Banner', 'Schedule Banner']} rows={['Home hero · Active', 'Flash deals banner · Scheduled', 'Vendor spotlight · Draft']} />;
}
