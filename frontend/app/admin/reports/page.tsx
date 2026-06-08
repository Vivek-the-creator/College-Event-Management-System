import { OperationalPage } from '@/components/marketplace/operational-page';

export default function AdminReportsPage() {
  return <OperationalPage title="Reports" description="Generate sales, revenue, vendor, product, and operational reports." actions={['Sales Report', 'Revenue Report', 'Vendor Report']} rows={['Monthly sales · Ready', 'Vendor payout report · Processing', 'Revenue report · Ready']} />;
}
