import { OperationalPage } from '@/components/marketplace/operational-page';

export default function VendorOrdersPage() {
  return <OperationalPage title="Vendor Orders" description="Accept, reject, update status, and add shipment tracking for seller order packages." actions={['Accept', 'Reject', 'Update Status', 'Add Tracking']} rows={['#BP-2081 · Pending acceptance', '#BP-2074 · Packed', '#BP-2060 · Payment review']} />;
}
