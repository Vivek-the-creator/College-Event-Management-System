import { OperationalPage } from '@/components/marketplace/operational-page';

export default function VendorStoreSettingsPage() {
  return <OperationalPage title="Store Settings" description="Manage logo, banner, description, policies, social links, and seller profile." actions={['Upload Logo', 'Upload Banner', 'Save Store']} rows={['Store description complete', 'Instagram link configured', 'Return policy pending']} />;
}
