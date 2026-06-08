import { OperationalPage } from '@/components/marketplace/operational-page';

export default function AdminVendorsPage() {
  return <OperationalPage title="Vendors" description="Approve, reject, suspend vendors, and audit seller documents." actions={['Approve Vendor', 'Reject Vendor', 'Suspend Vendor']} rows={['Urban Thread Co. · Pending', 'Gadget Hub · Approved', 'Crafted Home · Review documents']} />;
}
